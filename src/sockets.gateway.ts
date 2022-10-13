import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {trabajadoresInstance} from './trabajadores/trabajadores.clase';
import {cestas} from './cestas/cestas.clase';
import {TicketsInterface} from './tickets/tickets.interface';
import {ticketsInstance} from './tickets/tickets.clase';
import {movimientosInstance} from './movimientos/movimientos.clase';
import {parametrosInstance} from './parametros/parametros.clase';
import {Body} from '@nestjs/common';
import axios from 'axios';
import {UtilesModule} from './utiles/utiles.module';
import {TransaccionesInterface} from './transacciones/transacciones.interface';
import {transaccionesInstance} from './transacciones/transacciones.class';
import {paytefInstance} from './paytef/paytef.class';
import {LogsClass} from './logs/logs.class';
import {Socket} from 'dgram';
const net = require('net');
const fs = require('fs');

@WebSocketGateway(5051, {
  cors: {
    origin: true,
    credentials: true,
    transports: ['websocket'],
  },
  allowEIO3: true,
})

export class SocketGateway {
  @WebSocketServer()
    server: Socket;

  public enviar(canal: string, data: any) {
    this.server.emit(canal, data);
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Nuevo cliente conectado por socket');
  }
  handleDisconnect() {
    console.log('Se ha desconectado un cliente del socket');
  }

  @SubscribeMessage('test')
  test(@MessageBody() params) {
    this.server.emit('test', 'O Rei Ezeee');
  }

  @SubscribeMessage('consultarPuntos')
  consultarPuntos(@MessageBody() params) {
    if (params != undefined) {
      if (params.idClienteFinal != undefined) {
        this.server.emit('resConsultaPuntos', {error: false, info: 69});
      } else {
        this.server.emit('resConsultaPuntos', {error: true, mensaje: 'Backend: Faltan datos en socket > consultarPuntos'});
      }
    } else {
      this.server.emit('resConsultaPuntos', {error: true, mensaje: 'Backend: Faltan datos en socket > consultarPuntos'});
    }
  }

  /* PAYTEF */
  @SubscribeMessage('iniciarTransaccion')
  iniciarPaytef(@MessageBody() params, @ConnectedSocket() client: Socket) {
    if (UtilesModule.checkVariable(params)) {
      if (UtilesModule.checkVariable(params.idClienteFinal, params.idCesta)) {
        paytefInstance.iniciarTransaccion(client, params.idClienteFinal, params.idCesta);
      } else {
        client.emit('consultaPaytef', {error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan datos idClienteFinal'});
      }
    } else {
      client.emit('consultaPaytef', {error: true, mensaje: 'Backend: paytef/iniciarTransaccion faltan todos los datos'});
    }
  }
}
