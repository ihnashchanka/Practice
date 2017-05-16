var serverModule = (function () {
    hreq = new XMLHttpRequest();
    function parseDate(array) {
        array.forEach(function (item) {
            item.createdAt = new Date(item.createdAt);
        })
    }


    function getStartData() {
        hreq.open('GET', '/start', false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        parseDate(info.articles);
        return info;
    }

    function checkUser(name, password) {
        hreq.open('GET', '/checkUser?name=' + name + "&password=" + password, false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        return info;
    }

    function convert(filter) {
        const result = [];
        if (!filter) {
            return result;
        }
        Object.keys(filter).forEach(function (key) {
            result.push(encodeURIComponent(key)+'='+encodeURIComponent(filter[key]));
        });
        return result.join('&');
    }

    function changeFilter(author, createdAt, tags) {
        var filterConfig = {
            author: author,
            createdAt: createdAt,
            tags: tags
        }
        hreq.open('GET', '/filterChange?'+ convert(filterConfig), false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        parseDate(info);
        return info;
    }

    function newPage(skip) {
        hreq.open('GET', '/newPage?skip=' + skip, false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        parseDate(info);
        return info;
    }

    function removeArticle(id) {
        hreq.open('GET', '/removeArticle?id=' + id, false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        parseDate(info);
        return info;
    }

    function readArticle(id) {
        hreq.open('GET', '/readArticle?id=' + id, false);
        hreq.send();
        var info = JSON.parse(hreq.responseText);
        info.createdAt = new Date(info.createdAt);
        return info;
    }

    function editArticle(id, article) {
        hreq.open('PUT', '/editArticle', false);
        hreq.setRequestHeader('content-type', 'application/json');
        hreq.send(JSON.stringify(article));
    }

    function getArticles() {
        hreq.open('GET', '/getArticles', false);
        hreq.send();
        info = JSON.parse(hreq.responseText);
        parseDate(info);
        return info;
    }


    function addArticle(article) {
        hreq.open('POST', '/addArticle', false);
        hreq.setRequestHeader('content-type', 'application/json');
        hreq.send(JSON.stringify(article));
    }

    return {
        getStartData: getStartData,
        checkUser: checkUser,
        changeFilter: changeFilter,
        newPage: newPage,
        removeArticle: removeArticle,
        readArticle: readArticle,
        editArticle: editArticle,
        getArticles: getArticles,
        addArticle: addArticle
    }
}());
