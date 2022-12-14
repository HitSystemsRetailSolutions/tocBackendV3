import {MongoClient} from 'mongodb';

//const uri = 'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const uri = 'mongodb://mongodb:27017'; //?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
console.log(uri);
const client = new MongoClient(uri);
console.log(client);
const conexion = client.connect();
console.log(conexion);
export {conexion};
