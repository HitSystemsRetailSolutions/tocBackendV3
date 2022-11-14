import {MongoClient} from 'mongodb';

const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const client = new MongoClient(uri);
const conexion = client.connect();
export {conexion};
