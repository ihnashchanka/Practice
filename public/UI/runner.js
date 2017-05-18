/*global serverModule */
let user = {
    name: 'Пользователь',
};
let USER_OK = 'ок';

let currentArticles;
let currentAuthors;
let GLOBAL_TAGS;

let filterState = 0;
const logIn = function () {
    if (user) {
        user = null;
        displayModule.userCheck();
    }
    else {
        displayModule.showLog();
        let toMain = document.querySelectorAll('.to_main');
        toMain[0].addEventListener('click', function () {
            displayModule.showMainPage(currentArticles, currentAuthors);
            displayModule.userCheck();
        });
        toMain[1].addEventListener('click', function () {
            let name = document.querySelector('#user_name').value;
            let password = document.querySelector('#password').value;
            serverModule.checkUser(name, password)
                .then((result) => {
                    if (result === USER_OK) {
                        user = {
                            name: name
                        };
                        displayModule.userCheck();
                        displayModule.showMainPage(currentArticles, currentAuthors);
                    }
                    else {
                        let h2 = document.querySelector('h2');
                        h2.style.color = 'red';
                        h2.innerText = result;
                    }
                })
                .catch((reject) => {
                    displayModule.showError(reject.statusText);
                });
        });
    }
};
const showTagsList = function () {
    displayModule.showTags(GLOBAL_TAGS);
    let hide = document.querySelector('.hide_tags');
    hide.addEventListener('click', hideTagsList);
};
const hideTagsList = function () {
    let place = document.querySelector('.border');
    while (place.firstChild) {
        place.removeChild(place.firstChild);
    }
    place.style.backgroundColor = 'rgba(255,255,255,0)';
};
const filter = function () {
    let button = document.querySelector('.use');
    if (filterState) {
        button.innerText = 'Применить';
        filterState = false;
        serverModule.changeFilter('', '', [])
            .then((result) => {
                currentArticles = result;
                displayModule.showArticles(currentArticles);
            })
            .catch((reject) => {
                displayModule.showError(reject.statusText);
            });
    }
    else {
        button.innerText = 'Сбросить фильтр';
        filterState = true;
        let temp;
        temp = document.querySelector('.author');
        let author = temp.options[temp.selectedIndex].value;
        temp = document.querySelector('.date');
        let createdAt;
        if (temp.value) {
            createdAt = new Date(temp.value);
        }
        else {
            createdAt = '';
        }
        let tags = [];
        temp = document.querySelectorAll('.checkbox');
        temp.forEach(function (item) {
            if (item.checked) {
                tags.push(item.value);
            }
        });
        serverModule.changeFilter(author, createdAt, tags)
            .then((result) => {
                currentArticles = result;
                displayModule.showArticles(currentArticles);
            })
            .catch((reject) => {
                displayModule.showError(reject.statusText);
            });
    }

};
const nextPage = function () {
    serverModule.newPage(4)
        .then((result) => {
            currentArticles = result;
            displayModule.showArticles(currentArticles);
        })
        .catch((reject) => {
            displayModule.showError(reject.statusText);
        });
};
const previousPage = function () {
    serverModule.newPage(-4)
        .then((result) => {
            currentArticles = result;
            displayModule.showArticles(currentArticles);
        })
        .catch((reject) => {
            displayModule.showError(reject.statusText);
        });
};
const del = function (id) {
    serverModule.removeArticle(id)
        .then((result) => {
            currentArticles = result;
            displayModule.showMainPage(currentArticles, currentAuthors);
        })
        .catch((reject) => {
            displayModule.showError(reject.statusText);
        });
};
const read = function (id) {
    serverModule.readArticle(id)
        .then((result) => {
            displayModule.showFullArticle(result);
            let add = document.querySelector('.to_main');
            add.addEventListener('click', function () {
                displayModule.showMainPage(currentArticles, currentAuthors);
            })
        })
        .catch((reject) => {
            displayModule.showError(reject.statusText);
        });
};
const saveArticle = function (id, isAdd) {
    let article = {};
    article.title = document.querySelector('#title').value;
    article.summary = document.querySelector('#summary').value;
    article.content = document.querySelector('#content').value;
    article.id = id;
    article.tag = [];
    let tags = document.querySelectorAll('input');
    tags.forEach(function (item) {
        if (item.checked) {
            article.tag.push(item.value);
        }
    });
    if (isAdd) {
        article.author = user.name;
        article.createdAt = new Date;

        serverModule.addArticle(article)
            .then(() => {
                serverModule.getArticles()
                    .then((result) => {
                        currentArticles = result;
                        displayModule.showMainPage(currentArticles, currentAuthors);
                    })
                    .catch((reject) => {
                        displayModule.showError(reject.statusText);
                    });
            })
            .catch((reject) => {
                displayModule.showError(reject.statusText);
            });
    }
    else {
        if (validateArticleEdit(article)) {
            serverModule.editArticle(article)
                .then(() => {
                    serverModule.getArticles()
                        .then((result) => {
                            currentArticles = result;
                            displayModule.showMainPage(currentArticles, currentAuthors);
                        })
                        .catch((reject) => {
                            displayModule.showError(reject.statusText);
                        });
                })
                .catch((reject) => {
                    displayModule.showError(reject.statusText);
                });

        }
    }
};

function validateArticleEdit(article) {
    if (article.title.length >= 100 || !article.title) {
        return false;
    }
    if (!article.tag.every(item => {
            let pos = GLOBAL_TAGS.indexOf(item);
            return pos != -1;
        })) {
        return false;
    }
    if (article.summary.length >= 200 || !article.summary) {
        return false;
    }
    if (!article.content) {
        return false;
    }
    return true;
}

const change = function (id) {
    serverModule.readArticle(id)
        .then((result) => {
            displayModule.showAdd(result, GLOBAL_TAGS, true);
            let add = document.querySelector('.to_main');
            add.addEventListener('click', function () {
                saveArticle(id, false);
            });
        })
        .catch((reject) => {
            displayModule.showError(reject.statusText);
        });
};
const actions = {
    read: read,
    delete: del,
    change: change,
    nextPage: nextPage,
    previousPage: previousPage,
    filter: filter
};


function workWithArticles(event) {
    let action = event.target.getAttribute('data-action');
    let id = event.target.id;
    if (action) {
        actions[action](id);
    }
}


let displayModule = (function () {
    function formSelection(authors) {
        let sel = document.querySelector('select');
        let op = document.createElement('option');
        op.text = 'Выберите автора';
        op.value = '';
        sel.appendChild(op);
        authors.forEach(function (item) {
            let sel = document.querySelector('select');
            let op = document.createElement('option');
            op.value = item;
            op.text = item;
            sel.appendChild(op);
        });
    }

    function createDate(article) {
        let month = article.createdAt.getMonth() + 1;
        return article.createdAt.getDate() + '.' + month + '.' + article.createdAt.getFullYear();
    }

    function cleanNode(node) {
        if (node) {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        }
    }

    function showArticles(articles) {
        let news = document.querySelector('.news');
        cleanNode(news);
        articles.forEach(function (item) {
            let holder = document.getElementById('holder').content.cloneNode(true);
            let buttons = holder.querySelectorAll('button>img');
            buttons.forEach(function (buttonItem) {
                buttonItem.id = item.id;
            });
            let hide = holder.querySelector('.hide');
            let title = hide.querySelector('h2');
            let summary = hide.querySelector('div');
            let author = holder.querySelector('.author-date-info');
            let tags = holder.querySelector('.tegs');

            title.innerText = item.title;
            summary.innerText = item.summary;
            author.innerText = item.author + '\n' + createDate(item);
            tags.innerHTML = '<p class="full_article">' + item.tag.join(' ') + '</p>';
            news.appendChild(holder);
        });
    }

    function showMainPage(articles, authors) {
        let mainPart = document.querySelector('.main-part');
        cleanNode(mainPart);
        mainPart.style.backgroundColor = 'rgba(255,255,255,0)';
        mainPart.appendChild(document.querySelector('.main-page').content.cloneNode(true));
        formSelection(authors);
        showArticles(articles);
    }

    function showAdd(article, tags, flag) {
        let mainPart = document.querySelector('.main-part');
        cleanNode(mainPart);
        mainPart.appendChild(document.querySelector('.add').content.cloneNode(true));
        let edit = document.querySelector('.edit');
        let title = document.createElement('div');
        let date = document.createElement('div');
        date.className = 'user_information';
        title.className = 'user_information';

        let tagsHolder = document.querySelector('.add_tags');
        tags.forEach(function (item) {
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'checkbox';
            checkBox.id = item;
            checkBox.value = item;

            let label = document.createElement('label');
            label.htmlFor = item;
            label.innerText = item;

            let div = document.createElement('div');
            div.style.display = 'inline-block';
            div.appendChild(checkBox);

            div.appendChild(label);
            tagsHolder.appendChild(div);
        });
        if (!flag) {
            article.tag = [];
            title.innerText = user.name;
            let curDate = new Date();
            date.innerText = curDate.getDate() + '.' + ( curDate.getMonth() + 1 ) + '.' + curDate.getFullYear();
        }
        else {
            document.querySelector('#title').value = article.title;
            document.querySelector('#summary').value = article.summary;
            document.querySelector('#content').value = article.content;
            title.innerText = article.author;
            date.innerText = article.createdAt.getDate() + '.' + ( article.createdAt.getMonth() + 1 ) + '.' + article.createdAt.getFullYear();
            tags = document.querySelectorAll('input');
            tags.forEach(function (item) {
                if (article.tag.join(' ').includes(item.value)) {
                    item.checked = true;
                }
            });
        }

        let id = document.createElement('div');

        id.innerText = 'ID: ' + article.id;
        id.className = 'user_information';
        edit.insertBefore(id, edit.firstChild);
        edit.insertBefore(date, edit.firstChild);
        edit.insertBefore(title, edit.firstChild);
    }

    function showTags(tags) {
        let place = document.querySelector('.border');
        cleanNode(place);
        place.style.backgroundColor = 'rgba(255,255,255,0)';

        place.style.backgroundColor = 'rgba(255,255,255,0.7)';
        let but = document.createElement('button');
        but.innerText = 'Скрыть';
        but.className = 'hide_tags';
        place.appendChild(but);
        tags.forEach(function (item) {
            let checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.className = 'checkbox';
            checkBox.id = item;
            checkBox.value = item;
            let label = document.createElement('label');
            label.htmlFor = item;
            label.innerHTML = item;
            let div = document.createElement('div');
            div.appendChild(checkBox);
            div.appendChild(label);
            place.appendChild(div);
        });
    }

    function showFullArticle(article) {
        let mainPart = document.querySelector('.main-part');
        cleanNode(mainPart);
        mainPart.appendChild(document.querySelector('#read_more').content.cloneNode(true));
        mainPart.style.backgroundColor = 'rgba(255,255,255,0.7)';

        let title = document.querySelector('h2');
        title.innerText = article.title;

        let author = document.querySelectorAll('.small');
        author[0].innerText = article.author;
        author[1].innerText = article.createdAt.getDate() + '.' + ( article.createdAt.getMonth() + 1 ) + '.' + article.createdAt.getFullYear();
        let p = document.querySelector('p.summary');
        p.appendChild(document.createTextNode(article.content));

        let buttons = mainPart.querySelectorAll('button>img');
        buttons.forEach(function (item) {
            item.id = article.id;
        });
        let div = mainPart.querySelector('div');
        article.tag.forEach(function (item) {
            let t = document.createElement('p');
            t.className = 'small';
            t.innerHTML = item;
            div.appendChild(t);
        });
    }

    function userCheck() {
        let header = document.querySelector('header');
        let log;
        let logButton;
        if (user) {
            log = document.querySelector('#log-in').content.cloneNode(true);
            cleanNode(header);
            let newArticle = log.querySelector('.icon');
            newArticle.addEventListener('click', function () {
                displayModule.showAdd({}, GLOBAL_TAGS, false);
                let add = document.querySelector('.to_main');
                add.addEventListener('click', function () {
                    saveArticle(-1, true);
                });
            });
            let right = log.querySelector('.right_header');
            logButton = log.querySelector('#log');
            right.innerText = user.name;
            logButton.innerText = 'Выход';
            right.appendChild(logButton);
        }
        else {
            log = document.querySelector('#log-out').content.cloneNode(true);
            cleanNode(header);
            let right = log.querySelector('.right_header');
            logButton = log.querySelector('#log');
            right.innerText = '';
            logButton.innerText = 'Вход';
            right.appendChild(logButton);
            let options = document.querySelectorAll('.tools>.icon');
            for (let i = 0; i < options.length; i++) {
                options[i].style.display = 'none';
            }
        }
        header.appendChild(log);
        logButton.addEventListener('click', logIn);
    }

    function showLog() {
        if (user) {
            user = null;
            userCheck();
        }
        else {
            let mainPart = document.querySelector('.main-part');
            cleanNode(mainPart);
            mainPart.style.backgroundColor = 'rgba(255,255,255,0)';
            mainPart.appendChild(document.querySelector('.log').content.cloneNode(true));
        }
    }

    function showError(message) {
        let mainPart = document.querySelector('.main-part');
        cleanNode(mainPart);
        mainPart.style.backgroundColor = 'rgba(255,255,255,0)';
        mainPart.appendChild(document.querySelector('.error').content.cloneNode(true));
        let errorMessage = mainPart.querySelector('.error_message');
        errorMessage.innerText = message;
        let to_main = document.querySelector('.to_main');
        to_main.addEventListener('click', function () {
            showMainPage(currentArticles, currentAuthors);
        });
    }

    return {
        showArticles: showArticles,
        showMainPage: showMainPage,
        showAdd: showAdd,
        showFullArticle: showFullArticle,
        showTags: showTags,
        showLog: showLog,
        userCheck: userCheck,
        showError: showError
    };
}());

function init() {
    let prom = serverModule.getStartData();
    prom.then(function (data) {
        user = data.user;
        currentArticles = data.articles;
        currentAuthors = data.authors;
        GLOBAL_TAGS = data.tags;
        displayModule.showMainPage(currentArticles, currentAuthors);
        displayModule.userCheck();
        let tags = document.querySelector('.tags');
        tags.addEventListener('click', showTagsList);
        let articleList = document.querySelector('.main-part');
        articleList.addEventListener('click', workWithArticles);
    }).catch(error => {
        displayModule.showError(error.statusText);
    });
}

init();
