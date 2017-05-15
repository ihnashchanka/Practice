var start = 0;
var user = {
    name: 'Пользователь',
};
var MAX_ON_PAGE = 4;
var USER_OK = "ок";
//var USER_NO_USER = "Пользователь с таким именем не зарегистрирован";
//var USER_INCORRECT_PASSWORD = "Неверный пароль";

var currentArticles;
var currentAuthors;
var GLOBAL_TAGS;

var filterState = 0;
const logIn = function () {
    if (user) {
        user = null;
        displayModule.userCheck();
    }
    else {
        displayModule.showLog();
        toMain = document.querySelectorAll(".to_main");
        toMain[0].addEventListener('click', function () {
            displayModule.showMainPage(currentArticles, currentAuthors);
            displayModule.userCheck();
        });
        toMain[1].addEventListener('click', function (event) {
            var name = document.querySelector("#user_name").value;
            var password = document.querySelector("#password").value;
            var result = serverModule.checkUser(name, password);
            if (result === USER_OK) {
                user = {
                    name: name
                }
                displayModule.userCheck();
                displayModule.showMainPage(currentArticles, currentAuthors);
            }
            else {
                var h2 = document.querySelector('h2');
                h2.style.color = "red";
                h2.innerText = result;
            }
        })
    }
};
const showTagsList = function () {
    displayModule.showTags(GLOBAL_TAGS);
    var hide = document.querySelector(".hide_tags");
    hide.addEventListener('click', hideTagsList);
}
const hideTagsList = function () {
    var place = document.querySelector(".border");
    while (place.firstChild) {
        place.removeChild(place.firstChild);
    }
    place.style.backgroundColor = "rgba(255,255,255,0)";
}
const filter = function (id) {
    var button = document.querySelector(".use");
    if (filterState) {
        button.innerText = "Применить";
        filterState = false;
        currentArticles = serverModule.changeFilter("", "", []);
    }
    else {
        button.innerText = "Сбросить фильтр";
        filterState = true;
        //  articlesModule.cleanFilterConfig();
        var temp;
        temp = document.querySelector(".author");
        var author = temp.options[temp.selectedIndex].value;
        temp = document.querySelector(".date");
        var createdAt;
        if (temp.value) {
            createdAt = new Date(temp.value);
        }
        else {
            createdAt = "";
        }
        start = 0;
        var tags = [];
        temp = document.querySelectorAll(".checkbox");
        temp.forEach(function (item) {
            if (item.checked) {
                tags.push(item.value);
            }
        });
        currentArticles = serverModule.changeFilter(author, createdAt, tags);
    }
    displayModule.showArticles(currentArticles);
}
const nextPage = function (id) {
    currentArticles = serverModule.newPage(4);
    displayModule.showArticles(currentArticles);
}
const previousPage = function (id) {
    currentArticles = serverModule.newPage(-4);
    displayModule.showArticles(currentArticles);
}
const del = function (id) {
    currentArticles = serverModule.removeArticle(id);
    displayModule.showMainPage(currentArticles, currentAuthors);
}
const read = function (id) {
    var article = serverModule.readArticle(id);
    displayModule.showFullArticle(article);

    var add = document.querySelector(".to_main");
    add.addEventListener('click', function (event) {
        displayModule.showMainPage(currentArticles, currentAuthors);
    });
}
const saveArticle = function (id, isAdd) {
    var article = {};
    article.title = document.querySelector("#title").value;
    article.summary = document.querySelector("#summary").value;
    article.content = document.querySelector("#content").value;
    article.id = id;
    article.tag = [];
    var tags = document.querySelectorAll("input");
    tags.forEach(function (item) {
        if (item.checked) {
            article.tag.push(item.value);
        }
    })
    if (isAdd) {
        article.author = user.name;
        article.createdAt = new Date;
        serverModule.addArticle(article);
    }
    else {
        if (validateArticleEdit(article)) {
            serverModule.editArticle(id, article);
        }
    }
    currentArticles = serverModule.getArticles();
    displayModule.showMainPage(currentArticles, currentAuthors);

}
function validateArticleEdit(article) {
    if (article.title.length >= 100 || !article.title) {
        return false;
    }
    if (!article.tag.every(function (item) {
            var pos = GLOBAL_TAGS.indexOf(item);
            return pos != -1;
        })) {
        return false;
    }
    if (article.summary.length >= 200 || !article.summary) {
        return false
    }
    if (!article.content) {
        return false;
    }
    return true;
}

const change = function (id) {
    var article = serverModule.readArticle(id);
    displayModule.showAdd(article, GLOBAL_TAGS, true);

    var add = document.querySelector(".to_main");
    add.addEventListener('click', function (event) {
        saveArticle(id, false);
    });
}
const actions = {
    read: read,
    delete: del,
    change: change,
    nextPage: nextPage,
    previousPage: previousPage,
    filter: filter
}


function workWithArticles(event) {
    var action = event.target.getAttribute('data-action');
    var id = event.target.id;
    if (action) {
        actions[action](id);
    }
}


var displayModule = (function () {

        function formSelection(authors) {
            var sel = document.querySelector('select');
            var op = document.createElement('option');
            op.text = "Выберите автора";
            op.value = "";
            sel.appendChild(op);
            authors.forEach(function (item) {
                var sel = document.querySelector('select');
                var op = document.createElement('option');
                op.value = item;
                op.text = item;
                sel.appendChild(op);
            });
        }

        function createDate(article) {
            var month = article.createdAt.getMonth() + 1;
            return article.createdAt.getDate() + "." + month + "." + article.createdAt.getFullYear();
        }

        function cleanNode(node) {
            if (node) {
                while (node.firstChild) {
                    node.removeChild(node.firstChild);
                }
            }
        }


        function showArticles(articles) {
            var news = document.querySelector(".news");
            cleanNode(news);
            articles.forEach(function (item) {
                holder = document.getElementById("holder").content.cloneNode(true);
                var buttons = holder.querySelectorAll("button>img");
                buttons.forEach(function (buttonItem) {
                    buttonItem.id = item.id;
                });
                var hide = holder.querySelector('.hide');
                var title = hide.querySelector('h2');
                var summary = hide.querySelector('div');
                var author = holder.querySelector('.author-date-info');
                var tags = holder.querySelector('.tegs');

                title.innerText = item.title;
                summary.innerText = item.summary;
                author.innerText = item.author + "\n" + createDate(item);
                tags.innerHTML = '<p class="full_article">' + item.tag.join(' ') + '</p>';
                news.appendChild(holder);
            });
        }

        function showMainPage(articles, authors) {
            var mainPart = document.querySelector('.main-part');
            cleanNode(mainPart);
            mainPart.style.backgroundColor = 'rgba(255,255,255,0)';
            mainPart.appendChild(document.querySelector('.main-page').content.cloneNode(true));
            formSelection(authors);
            showArticles(articles);
        }

        function showAdd(article, tags, flag) {
            var mainPart = document.querySelector('.main-part');
            cleanNode(mainPart);
            mainPart.appendChild(document.querySelector('.add').content.cloneNode(true));
            var edit = document.querySelector('.edit');
            var title = document.createElement('div');
            var date = document.createElement('div');
            date.className = 'user_information';
            title.className = 'user_information';

            var tagsHolder = document.querySelector('.add_tags');
            tags.forEach(function (item) {
                var checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.className = "checkbox";
                checkBox.id = item;
                checkBox.value = item;

                var label = document.createElement("label");
                label.htmlFor = item;
                label.innerText = item;

                var div = document.createElement("div");
                div.style.display = "inline-block";
                div.appendChild(checkBox);

                div.appendChild(label);
                tagsHolder.appendChild(div);
            });
            if (!flag) {
                article.tag = [];
                title.innerText = user.name
                var curDate = new Date();
                date.innerText = curDate.getDate() + "." + ( curDate.getMonth() + 1 ) + "." + curDate.getFullYear();

            }
            else {
                document.querySelector('#title').value = article.title;
                document.querySelector('#summary').value = article.summary;
                document.querySelector('#content').value = article.content;
                title.innerText = article.author;
                date.innerText = article.createdAt.getDate() + "." + ( article.createdAt.getMonth() + 1 ) + "." + article.createdAt.getFullYear();
                tags = document.querySelectorAll('input');
                tags.forEach(function (item) {
                    if (article.tag.join(' ').includes(item.value)) {
                        item.checked = true;
                    }
                });
            }

            var id = document.createElement('div');

            id.innerText = "ID: " + article.id;
            id.className = "user_information";
            edit.insertBefore(id, edit.firstChild);
            edit.insertBefore(date, edit.firstChild);
            edit.insertBefore(title, edit.firstChild);
        }

        function showTags(tags) {
            var place = document.querySelector('.border');
            cleanNode(place);
            place.style.backgroundColor = 'rgba(255,255,255,0)';

            place.style.backgroundColor = 'rgba(255,255,255,0.7)';
            var but = document.createElement('button');
            but.innerText = 'Скрыть';
            but.className = 'hide_tags';
            place.appendChild(but);
            tags.forEach(function (item) {
                var checkBox = document.createElement('input');
                checkBox.type = 'checkbox';
                checkBox.className = 'checkbox';
                checkBox.id = item;
                checkBox.value = item;
                var label = document.createElement('label');
                label.htmlFor = item;
                label.innerHTML = item;
                var div = document.createElement('div');
                div.appendChild(checkBox);
                div.appendChild(label);
                place.appendChild(div);
            });
        }

        function showFullArticle(article) {
            var mainPart = document.querySelector('.main-part');
            cleanNode(mainPart);
            mainPart.appendChild(document.querySelector('#read_more').content.cloneNode(true));
            mainPart.style.backgroundColor = 'rgba(255,255,255,0.7)';

            var title = document.querySelector('h2');
            title.innerText = article.title;

            var author = document.querySelectorAll('.small');
            author[0].innerText = article.author;
            author[1].innerText = article.createdAt.getDate() + "." + ( article.createdAt.getMonth() + 1 ) + "." + article.createdAt.getFullYear();

            var p = document.querySelector('p.summary');
            p.appendChild(document.createTextNode(article.content));

            var buttons = mainPart.querySelectorAll("button>img");
            buttons.forEach(function (item) {
                item.id = article.id;
            });
            var div = mainPart.querySelector('div');
            article.tag.forEach(function (item) {
                var t = document.createElement('p');
                t.className = "small";
                t.innerHTML = item;
                div.appendChild(t);
            });

        };

        function userCheck() {
            var header = document.querySelector("header");
            var log;
            var logButton;
            if (user) {
                log = document.querySelector("#log-in").content.cloneNode(true);
                cleanNode(header);
                var newArticle = log.querySelector(".icon");
                newArticle.addEventListener('click', function () {
                    displayModule.showAdd({}, GLOBAL_TAGS, false);
                    var add = document.querySelector(".to_main");
                    add.addEventListener('click', function (event) {
                        saveArticle(-1, true);
                    });
                });
                right = log.querySelector(".right_header");
                logButton = log.querySelector("#log");
                //  cleanNode(right);
                right.innerText = user.name;
                logButton.innerText = "Выход";
                right.appendChild(logButton);

            }
            else {
                log = document.querySelector("#log-out").content.cloneNode(true);
                cleanNode(header);
                right = log.querySelector(".right_header");
                logButton = log.querySelector("#log");
                right.innerText = "";
                logButton.innerText = "Вход";
                right.appendChild(logButton);
                var options = document.querySelectorAll('.tools>.icon');
                for (var i = 0; i < options.length; i++) {
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
                var mainPart = document.querySelector(".main-part");
                cleanNode(mainPart);
                mainPart.style.backgroundColor = "rgba(255,255,255,0)"
                mainPart.appendChild(document.querySelector(".log").content.cloneNode(true));
            }
        }

        return {
            showArticles: showArticles,
            showMainPage: showMainPage,
            showAdd: showAdd,
            showFullArticle: showFullArticle,
            showTags: showTags,
            showLog: showLog,
            userCheck: userCheck
        };
    }()
);
function init() {
    var data = serverModule.getStartData();
    user = data.user;
    currentArticles = data.articles;
    currentAuthors = data.authors;
    GLOBAL_TAGS = data.tags;
    displayModule.showMainPage(currentArticles, currentAuthors);
    displayModule.userCheck();
    var tags = document.querySelector(".tags");
    tags.addEventListener('click', showTagsList);
    var articleList = document.querySelector(".main-part");
    articleList.addEventListener('click', workWithArticles);
}

init();
