/* global require, global*/

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local').Strategy;
const MongoDBStore = require('connect-mongodb-session')(session);

mongoose.Promise = global.Promise;
const app = express();

app.use(express.static('public/UI'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const store = new MongoDBStore(
    {
        uri: 'mongodb://localhost:27017/admin',
        collection: 'sessions',
    });
store.on('error', (error) => {
    console.log(error);
});
app.use(session({
    secret: 'secret cat',
    saveUninitialized: true,
    resave: false,
    rolling: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
    store,
}));

const url = 'mongodb://localhost:27017/admin';
mongoose.connect(url);


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});
const articleSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 100,
        required: true,
    },
    summary: {
        type: String,
        minlength: 1,
        maxlength: 200,
        required: true,
    },
    author: {
        type: String,
        required: true,
        index: true,
    },
    content: {
        type: String,
        minlength: 1,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    tag: {
        type: Array,
        required: true,
    }
});
const tagsSchema = mongoose.Schema({
    tag: {
        type: String,
    }
});


const Userbase = mongoose.model('users', userSchema);
const Articlesbase = mongoose.model('articles', articleSchema);
const Tagsbase = mongoose.model('tags', tagsSchema);

passport.use(new LocalStrategy(
    (username, password, done) => {
        Userbase.findOne({username}).then((user) => {
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));
passport.serializeUser((username, done) => done(null, username.id));
passport.deserializeUser((id, done) => {
    Userbase.findById(id, (err, user) => {
        done(err, user);
    });
});

let filterConfig = {
    author: '',
    tags: [],
    createdAt: ''
};
const MAX_ON_PAGE = 4;
let currentUser = null;
let start;
start = 0;

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(300)
                .send('Not found');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json(user.username);
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.get('/start', function (req, res) {
    const result = {
        authors: [],
        user: currentUser,
        tags: []
    };
    getArticles(start, MAX_ON_PAGE, {})
        .then(articles => {
            result.articles = articles;
            Userbase.find({})
                .then(users => {
                    users.forEach(function (item) {
                        result.authors.push(item.username);
                    });
                    Tagsbase.find({})
                        .then(tags => {
                            tags.forEach(function (item) {
                                result.tags.push(item.tag);
                            });
                            res.json(result);
                            res.status(200);
                        });
                });
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});

app.get('/filterChange', function (req, res) {
    let author = req.query.author;
    let createdAt = req.query.createdAt ? new Date(req.query.createdAt) : '';
    let tags = req.query.tags;
    if (!author && !createdAt && !tags) {
        filterConfig = {
            author: '',
            tags: [],
            createdAt: ''
        };
    }
    else {
        tags = tags.split(' ');
        filterConfig = {
            author: author,
            createdAt: createdAt,
            tags: tags
        };
    }
    res.status(200);
    res.json(true);
});
app.get('/newPage', function (req, res) {
    let tmp = Number(req.query.skip);
    Articlesbase.count()
        .then(count => {
            if (start + tmp <= count && start + tmp >= 0) {
                start += tmp;
            }
            getArticles(start, MAX_ON_PAGE, filterConfig)
                .then(result => {
                    res.status(200);
                    res.json(result);
                });
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});

app.delete('/removeArticle', function (req, res) {
    let id = req.query.id;
    Articlesbase.findOneAndRemove({_id: id})
        .then(() => {
            res.status(200);
            res.json(true);
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});

app.get('/readArticle', function (req, res) {
    let id = req.query.id;
    Articlesbase.findOne({_id: id})
        .then(article => {
            res.status(200);
            res.json(article);
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});

app.get('/getArticles', function (req, res) {
    getArticles(start, MAX_ON_PAGE, filterConfig)
        .then(result => {
            res.status(200);
            res.json(result);
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});

app.put('/editArticle', function (req, res) {
    let article = req.body;
    Articlesbase.findByIdAndUpdate(article.id, {$set: article}, {new: true})
        .then(() => {
            res.status(200);
            res.json(true);
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });


});

app.post('/addArticle', function (req, res) {
    let article = req.body;
    let newArticle = new Articlesbase(article);
    newArticle.save()
        .then(() => {
            res.status(200);
            res.json(true);
        })
        .catch(reject => {
            res.status(300);
            res.statusText = reject.statusText;
        });
});





function getArticles(skip, top, filterConfig) {
    return Articlesbase.find(filterArticles(filterConfig))
        .sort({createdAt: -1})
        .skip(skip)
        .limit(top);
}

function filterArticles(filterConfig) {
    const query = {};
    if (filterConfig) {
        if (filterConfig.author) {
            query.author = {$in: filterConfig.author};
        }
        if (filterConfig.createdAt) {
            if (!query.hasOwnProperty('createdAt')) {
                query.createdAt = {};
            }
            query.createdAt.$gte = new Date(filterConfig.createdAt);
        }
        if (filterConfig.tags && filterConfig.tags.length > 0) {
            query.tag = {$all: filterConfig.tags};
        }
    }
    return query;
}

app.listen(3000);
console.log('Server starts on port 3000!');