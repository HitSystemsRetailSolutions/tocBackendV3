import {ticketsInstance} from './tickets/tickets.clase';
import {sincronizarTickets, sincronizarCajas, sincronizarMovimientos, sincronizarFichajes, sincronizarDevoluciones} from './sincro';
import {cajaInstance} from './caja/caja.clase';
import {movimientosInstance} from './movimientos/movimientos.clase';
import {trabajadoresInstance} from './trabajadores/trabajadores.clase';
import {devolucionesInstance} from './devoluciones/devoluciones.clase';
import {Mqtt} from './mqtt';
const mqtt = new Mqtt();
const io = require('socket.io-client');
//const socket = io('https://sanpedro.cloud'); // NORMAL //io('http://34.78.247.153:3001'); // NORMAL
const socket = io('http://santaana.nubehit.com:3001'); // NORMAL //io('http://34.78.247.153:3001'); // NORMAL
//const socket = io('http://localhost:3001'); // DEV SANPEDRO EN LOCAL


function emitSocket(canal: string, datos: any = null) {
  if (socket.connected) {
    socket.emit(canal, datos);
  }
}

socket.on('resSincroTickets', async (data) => {
  if (data.error == false) {
    if (data.ticket) {
      if (await ticketsInstance.actualizarEstadoTicket(data.ticket)) {
        sincronizarTickets(true);
      } else {
        mqtt.loggerMQTT("Error al actualizar el ticket");
      }
    }
  } else {
    if (typeof data.ticket.comentario == "string") {
      if (data.mensaje == "SanPedro: Error, parámetros incorrectos") {
        data.ticket.comentario = "SanPedro: Error, parámetros incorrectos";
      }

      ticketsInstance.actualizarComentario(data.ticket);
    }
  }
});

socket.on('resCajas', (data) => {
  if (data.error == false) {
    if (data.repetir == false) {
      cajaInstance.confirmarCajaEnviada(data.infoCaja).then((res) => {
        if (res) {
          sincronizarCajas();
        } else {
          mqtt.loggerMQTT('Error al actualizar el estado de la caja');
        }
      }).catch((err) => {
        mqtt.loggerMQTT(err);
      });
    } else {
      cajaInstance.confirmarCajaHabiaLlegado(data.infoCaja).then((res) => {
        if (res) {
          sincronizarCajas();
        } else {
          mqtt.loggerMQTT('Error al actualizar el estado de la caja 2');
        }
      }).catch((err) => {
        mqtt.loggerMQTT(err);
      });
      // cambiar estado infoCaja en mongo (enviado + comentario)
    }
  } else {
    mqtt.loggerMQTT(data.mensaje);
  }
});

socket.on('resMovimientos', (data) => {
  if (data.error == false) {
    movimientosInstance.actualizarEstadoMovimiento(data.movimiento).then((res) => {
      if (res) {
        sincronizarMovimientos(true);
      } else {
        mqtt.loggerMQTT('Error al actualizar el estado del movimiento');
      }
    }).catch((err) => {
      mqtt.loggerMQTT(err);
    });
  } else {
    mqtt.loggerMQTT(data.mensaje);
  }
});

socket.on('resFichajes', (data) => {
  if (data.error == false) {
    trabajadoresInstance.actualizarEstadoFichaje(data.fichaje).then((res) => {
      if (res) {
        sincronizarFichajes();
      } else {
        mqtt.loggerMQTT('Error al actualizar el estado del fichaje');
      }
    }).catch((err) => {
      mqtt.loggerMQTT(err);
    });
  } else {
    mqtt.loggerMQTT(data.mensaje);
  }
});

socket.on('resSincroDevoluciones', (data) => {
  if (!data.error) {
    devolucionesInstance.actualizarEstadoDevolucion(data.devolucion).then((res) => {
      if (res) {
        sincronizarDevoluciones();
      } else {
        mqtt.loggerMQTT('Error al actualizar el estadio de la devolución.');
      }
    }).catch((err) => {
      mqtt.loggerMQTT(err);
    });
  } else {
    mqtt.loggerMQTT(data.mensaje);
  }
});

export {socket, emitSocket};
