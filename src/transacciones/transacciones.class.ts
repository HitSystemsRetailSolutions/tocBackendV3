import {cestas} from 'src/cestas/cestas.clase';
import {CestasInterface} from 'src/cestas/cestas.interface';
import * as schTransacciones from './transacciones.mongodb';
import {Mqtt} from '../mqtt';
const mqtt = new Mqtt();
class TransaccionesClass {
  crearTransaccion(cesta: CestasInterface, total: number, idCliente: string): Promise <any> {
    return schTransacciones.crearTransaccion(cesta, total, idCliente).then((res) => {
      if (res.acknowledged) {
        return {error: false, insertedId: res.insertedId.toString()};
      } else {
        return {error: true, mensaje: 'Error, no se ha podido insertar la transacción'};
      }
    }).catch((err) => {
      return {error: true, mensaje: 'Error en CATCH transacciones.class/crearTransaccion'};
    });
  }

  getTransaccionById(idTransaccion: string) {
    return schTransacciones.getTransaccionById(idTransaccion).then((res) => {
      return res;
    }).catch((err) => {
      mqtt.loggerMQTT(err);
      return null;
    });
  }

  setPagada(idTransaccion: string) {
    return schTransacciones.setPagada(idTransaccion).catch((err) => {
      mqtt.loggerMQTT(err);
      return false;
    });
  }

  getUltimaTransaccion() {
    return schTransacciones.getUltimaTransaccion().then((res) => {
      if (res.length == 1) {
        return res[0];
      }
      return null;
    }).catch((err) => {
      mqtt.loggerMQTT(err);
      return null;
    });
  }
}

export const transaccionesInstance = new TransaccionesClass();
