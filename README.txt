MongoDB: mongodb://localhost:27017/admin
�� �����, ��� ����������� mongo, ������� ����� data/db
� ..\MongoDB\Server\3.4\bin ��������� mongod
�� ��� �� �����(������ ����� �������) ����� �� �������:
mongoimport --db admin --collection articles --file "���� �� ���� �����������\private\articles.json)"
mongoimport --db admin --collection sessions --file ..\private\sessions.json
mongoimport --db admin --collection sessions --file ..\private\authors.json
mongoimport --db admin --collection users --file ..\private\userbases.json
mongoimport --db admin --collection tags --file ..\private\tags.json

npm install

������������ ������������:
�������: 2609
�������� �����p: 0001
���������� �������: 0002
������ ������������� � ����� private/users.json