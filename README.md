# sdc-RatingReview
Server and databases of products' review for a mock e-commerce website. 

# installation
To install the dependencies
```npm install```
To run the server
```npm run server-dev```

# Dependencies
Express, Axios, PG

# Usage
PostgreSQL is selected to be the database of the app. Followings are commmon command line to interact with PostgreSQL.
To install postgres
```brew install postgresql```
To start Postgres
```brew services start postgresql```
To stop Postgres
```brew services stop postgresql```
To run the file in Postgres
```psql postgres < schema.sql```
To navigate into the Postgres shell
```psql postgres```

Once in Postgres shell
To display all tables in Postgres
```# \l```
To display all users in the Postgres
```# \du```
To create a database
```# create database <databaseName>```
To use one of the database
```# \c <dataBaseName>```
To create table in the database
```# create table <tableName> (id serial primary key, name text);```
To create a role that has is superuser that has login, create database previlege
```# create role <userName> with superuser login createdb password '<password>';`
To change the role with different permission
```# alter user <userName> with nosuperuser;```
To import data from .csv file
```# copy <tableName> from 'absolute/path/to/file.csv' delimiter ',' csv header;```
To update a table
```# update <tableName> set <colName>=<value> wehre <colName>=<someValue>;```
To update a table with the info from another table
```# update <tableName> set <colName>=<AnotherTable>.<anotherColName> from <AnotherTable> where <tableName>.<someColName>=<AnotherTable>.<someOtherCol>```
To drop database
```# drop database <databaseName>```
To drop tables
```# drop table <tableName>```
To see the port number of the database
```# \conninfo```
sync the primary key
```SELECT setval(pg_get_serial_sequence('<tableName>', '<colName>'), (SELECT MAX(<colName>) FROM <tableName>)+1);```

# Interact with Postgres in node.js
The default port for postgres is 5432
```
const {Pool}=require('pg');

const pool=new Pool({
	host:<databaseIP>,
	user:<databaseUserName>,
	port:5432,
	database:<databaseName>
});

pool.connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))
```
