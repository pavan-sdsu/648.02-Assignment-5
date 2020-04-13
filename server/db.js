const { MongoClient } = require('mongodb');


const client = new MongoClient(`mongodb+srv://pavan:${process.env.MONGO_PASS}@pavan-sdsu-7v19x.mongodb.net/648-assn-4`, {
  useUnifiedTopology: true,
});

let inventory; let
  counter;
client.connect((err, cl) => {
  const db = cl.db();
  inventory = db.collection('inventory');
  counter = db.collection('counter');
});

function getInventory() { return inventory; }
function getCounter() { return counter; }

module.exports = { getCounter, getInventory };
