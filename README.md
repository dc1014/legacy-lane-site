# legacy-lane-site
Legacy Lane Server and Client

## To Run

Install Node 10.11.0 from NodeJS site and make sure it is in your path.

Git clone this repo. Run npm install.

Create a .env file in root repository directory and include the following (please fill out values yourself)

```
DB_HOST=host:port/dbname
DB_USER=youruser
DB_PASS=yourpassword
DB_NAME=dbname
```

Then, run `npm start` and use POSTMAN or your browser.

## Supporting Docs

Hapi Coding Convetions - https://hapijs.com/styleguide#coding-conventions

Mongo DB Driver - http://mongodb.github.io/node-mongodb-native/3.1/