MongoDB: mongodb://localhost:27017/admin

На диске, где установлено mongo, создаем папку data/db
в ..\MongoDB\Server\3.4\bin запускаем mongod
Из той же папки(открыв новую консоль) пишем по очереди:
mongoimport --db admin --collection articles --file "Путь до базы репозитория\private\articles.json)"
mongoimport --db admin --collection sessions --file ..\private\sessions.json
mongoimport --db admin --collection sessions --file ..\private\authors.json
mongoimport --db admin --collection users --file ..\private\userbases.json
mongoimport --db admin --collection tags --file ..\private\tags.json

npm install

Существующие пользователи:
Татьяна: 2609
Влаислав Нестеp: 0001
Амброжевич Татьяна: 0002
Больше пользователей в файле private/users.json