require('dotenv').config();
const Bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const password = process.env.LOCAL_ADMIN;

// const saltRounds = 10;

// const user = {
//     username: 'root',
//     password,
// };

(async function() {
  // Connection URL
  const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
  // Database Name
  const dbName = process.env.DB_NAME;
  const client = new MongoClient(url);

  try {
    // Use connect method to connect to the Server
    await client.connect();

    const db = client.db(dbName);

    let r = await db.collection('users').findOne({user: 'root'});

    let y = await Bcrypt.compare(password, r.password);

    console.log(y)

    client.close();

  } catch (err) {
    console.log(err.stack);
  }

})();




