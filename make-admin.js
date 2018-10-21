require('dotenv').config();
const Bcrypt = require('bcrypt');
const saltRounds = 10;
const password = process.env.LOCAL_ADMIN;
const MongoClient = require('mongodb').MongoClient;

const user = {
    username: 'root',
    password,
};

(async function() {
  // Connection URL
  const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
  // Database Name
  const dbName = 'heroku_4mhwk498';
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);
    Bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) throw err
        Bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) throw err
            db.collection('users').updateOne({user: 'root'}, {$set: {user: user.username, password: hash}}, {upsert: true}, (err, r) => {
                if (err) throw err
                console.log('inserted the admin');

                client.close();
            })
        });
    });
  } catch (err) {
    console.log(err.stack);
  }

})();




