import {UtilesModule} from '../utiles/utiles.module';
import {conexion} from '../conexion/mongodb';
import {CajaForSincroInterface, CajaInterface} from './caja.interface';

export async function getInfoCaja(): Promise<any> {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('cajas');
  const resultado = await caja.findOne({_id: 'CAJA'});
  return resultado;
}

export async function limpiezaCajas() {
  const database = (await conexion).db('tocgame');
  const sincroCajas = database.collection('sincro-cajas');
  sincroCajas.deleteMany({enviado: true, _id: {$lte: UtilesModule.restarDiasTimestamp(Date.now())}});
}

export async function guardarMonedas(arrayMonedas: any, tipo: 'APERTURA' | 'CLAUSURA') {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('infoMonedas');
  const resultado = await caja.updateOne({_id: tipo}, {$set: {'array': arrayMonedas}}, {upsert: true});
  return resultado;
}

export async function getMonedas(tipo: 'APERTURA' | 'CLAUSURA') {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('infoMonedas');
  const resultado = await caja.findOne({_id: tipo});
  return resultado;
}
export async function getCambioDeTurno() {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('cambioDeTurno');

  const resultado = await  caja.drop();
  console.log(resultado);
  return resultado;

  
}

export async function getAnularTurno() {

  const database = (await conexion).db('tocgame');
  const caja = database.collection('cambioDeTurno');
 

  const tiempoTranscurrido = new Date();
  const fecha = tiempoTranscurrido.toLocaleDateString('es-ES');
  const hora =tiempoTranscurrido.toLocaleTimeString('es-ES');
  const resultado = await  caja.insertOne({"fecha":fecha,"hora":hora,"time":Date.now()});
  console.log(resultado);
  // la linea de codigo de abajo iria en otra funcion para
  // comprobar si el cambio de turno es de hoy o no:

  // const fecha = tiempoTranscurrido.toLocaleDateString('es-ES');
  // const buscar= await caja.findOne({fecha:fecha});
  // console.log(buscar);
 
  // if (buscar!=null) {
  //   return true;
  // } else {
  //   return false;
  // }
 
  return resultado;

}

export async function getComprovarTurno() {

  const database = (await conexion).db('tocgame');
  const caja = database.collection('cambioDeTurno');
 

  const tiempoTranscurrido = new Date();
 
  // la linea de codigo de abajo iria en otra funcion para
  // comprobar si el cambio de turno es de hoy o no:

  const fecha = tiempoTranscurrido.toLocaleDateString('es-ES');
  const buscar= await caja.findOne({fecha:fecha});
  console.log(buscar);
  // console.log( caja.find({time:1}));
  if (buscar!=null) {
    const res=await caja.find().sort({ _id: -1 }).limit(1).toArray();
    console.log( res[0].time);
    return {estado:true,time:res[0].time};
  } else {
    return {estado:false,time:null};
  }

}

export async function getDatosUltimoCierre() {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('sincro-cajas');
  const resultado = await caja.find().sort({ _id: -1 }).limit(1).toArray();
  console.log(resultado)
  return resultado;
}

export async function getDatosMoviments(inicioTime, finalTime) {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('movimientos');
  const resultado = await caja.find({ $and: [ {_id: {$gte:inicioTime}}, {_id:{$lte:finalTime} }, {concepto:"Entrega Diària"} ] }).toArray();
  return resultado;
}

export async function setInfoCaja(data: CajaInterface) {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('cajas');
  const resultado = await caja.replaceOne({
    _id: 'CAJA',
  },
  data,
  {upsert: true});

  return resultado;
}

export async function borrarCaja() {
  const database = (await conexion).db('tocgame');
  const caja = database.collection('cajas');
  const resultado = await caja.drop();
  return resultado;
}

export async function nuevoItemSincroCajas(unaCaja) {
  const database = (await conexion).db('tocgame');
  const sincroCajas = database.collection('sincro-cajas');
  const resultado = await sincroCajas.insertOne(unaCaja);
  return resultado;
}

export async function confirmarCajaEnviada(unaCaja: CajaInterface) {
  const database = (await conexion).db('tocgame');
  const sincroCajas = database.collection('sincro-cajas');
  const resultado = await sincroCajas.updateOne({_id: unaCaja._id}, {$set: {
    'enviado': unaCaja.enviado,
  }});

  return resultado;
}

export async function confirmarCajaHabiaLlegado(unaCaja: CajaInterface) {
  const database = (await conexion).db('tocgame');
  const sincroCajas = database.collection('sincro-cajas');
  const resultado = await sincroCajas.updateOne({_id: unaCaja._id}, {$set: {
    'enviado': unaCaja.enviado,
    'comentario': unaCaja.comentario,
  }});

  return resultado;
}

/*  Devuelve la caja más antigua con estado enviado = false
    para enviarla al servidor
*/
export async function getCajaMasAntigua() {
  const database = (await conexion).db('tocgame');
  const sincroCajas = database.collection('sincro-cajas');
  const resultado = await (await sincroCajas.find({enviado: false}, {sort: {_id: 1}, limit: 1})).toArray();
  return resultado;
}

// export async function contarClearOne(unaCaja) {

//     const database = (await conexion).db('tocgame');
//     const caja = database.collection('cajas');
//     const resultado = await caja.insertOne(unaCaja);

//     return resultado;
// }
