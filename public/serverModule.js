/* exported serverModule */
/*global Promise*/
const serverModule = (function () {
    function parseDate(array) {
        array.forEach(function (item) {
            item.createdAt = new Date(item.createdAt);
        });
    }
    function getStartData() {
        return new Promise(function (resolve, reject) {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/start');
            hreq.send();
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let info = JSON.parse(hreq.responseText);
                    parseDate(info.articles);
                    resolve(info);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }
    function checkUser(username, password) {
        if (!password) {
            password = 'no_password';
        }
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('POST', '/login');
            hreq.setRequestHeader('content-type', 'application/json');
            hreq.send(JSON.stringify({username, password}));
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(hreq.responseText));
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function logOut(){
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/logout');
            hreq.send();
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(true);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function convert(filter) {
        const result = [];
        if (!filter) {
            return result;
        }
        Object.keys(filter).forEach(function (key) {
            result.push(`${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`);
        });
        return result.join('&');
    }

    function changeFilter(author, createdAt, tags) {
        let filterConfig = {
            author: author,
            createdAt: createdAt,
            tags: tags
        };
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/filterChange?' + convert(filterConfig));
            hreq.send();
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(hreq.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function newPage(skip) {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/newPage?skip=' + skip);
            hreq.send();
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let info = JSON.parse(hreq.responseText);
                    parseDate(info);
                    resolve(info);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function removeArticle(id) {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('DELETE', '/removeArticle?id=' + id);
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(hreq.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
            hreq.send();
        });
    }

    function readArticle(id) {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/readArticle?id=' + id);
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let info = JSON.parse(hreq.responseText);
                    info.createdAt = new Date(info.createdAt);
                    resolve(info);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
            hreq.send();
        });
    }

    function editArticle(article) {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('PUT', '/editArticle');
            hreq.setRequestHeader('content-type', 'application/json');
            hreq.send(JSON.stringify(article));
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(true);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function getArticles() {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('GET', '/getArticles');
            hreq.send();
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let info = JSON.parse(hreq.responseText);
                    parseDate(info);
                    resolve(info);
                } else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    function addArticle(article) {
        return new Promise((resolve, reject) => {
            let hreq = new XMLHttpRequest();
            hreq.open('POST', '/addArticle');
            hreq.setRequestHeader('content-type', 'application/json');
            hreq.send(JSON.stringify(article));
            hreq.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(true);
                }
                else {
                    reject({
                        status: this.status,
                        statusText: hreq.statusText
                    });
                }
            };
        });
    }

    return {
        getStartData: getStartData,
        checkUser: checkUser,
        logOut: logOut,
        changeFilter: changeFilter,
        newPage: newPage,
        removeArticle: removeArticle,
        readArticle: readArticle,
        editArticle: editArticle,
        getArticles: getArticles,
        addArticle: addArticle
    };
}());
