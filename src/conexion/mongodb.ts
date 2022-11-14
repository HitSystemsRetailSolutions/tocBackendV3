import {MongoClient} from 'mongodb';

const uri = 'mongodb://192.168.1.57:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

const client = new MongoClient(uri);
const conexion = client.connect();
export {conexion};
