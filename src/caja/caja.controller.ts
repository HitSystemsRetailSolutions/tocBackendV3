import {Controller, Post, Body} from '@nestjs/common';
import {cajaInstance} from './caja.clase';
import {Mqtt} from '../mqtt';
const mqtt = new Mqtt();
@Controller('caja')
export class CajaController {
    @Post('cerrarCaja')
  async cerrarCaja(@Body() params) {
    const cajaAbierta = await cajaInstance.cajaAbierta();
    if (params.total != undefined, params.detalle != undefined, params.infoDinero != undefined, params.cantidad3G != undefined) {
      if (cajaAbierta) {
        return cajaInstance.cerrarCaja(
            params.total,
            params.detalle,
            params.infoDinero,
            params.cantidad3G,
        ).then((res) => {
          if (res) {
            return cajaInstance.guardarMonedas(params.infoDinero, 'CLAUSURA').then((res2) => {
              if (res2) {
                return {error: false};
              }
              return {error: true, mensaje: 'Backend: Error en caja/cerrarCaja > Comprobar log'};
            }).catch((err) => {
              mqtt.loggerMQTT(err);
              return {error: true, mensaje: 'Error en catch caja/cerrarCaja > guardaMonedas'};
            });
          } else {
            return {error: true, mensaje: 'Backend: No se ha podido cerrar caja'};
          }
        }).catch((err) => {
          mqtt.loggerMQTT(err);
          return {error: true, mensaje: 'Backend: Error CATCH caja/cerrarCaja'};
        });
      } else {
        return {error: true, mensaje: 'Backend: No hay ninguna caja abierta'};
      }
    } else {
      return {error: true, mensaje: 'Backend: Faltan datos en caja/cerrarCaja'};
    }
  }

    @Post('abrirCaja')
    abrirCaja(@Body() params) { // No probado! Se le pasa solo el array de monedas
      if (params.total != undefined && params.detalle != undefined) {
        return cajaInstance.abrirCaja(params).then((res) => {
          if (res) {
            return {error: false};
          } else {
            return {error: true};
          }
        }).catch((err) => {
          mqtt.loggerMQTT(err);
          return {error: true};
        });
      } else {
        return {error: true, mensaje: 'Backend: Faltan datos en caja/abrirCaja'};
      }
    }

    @Post('estadoCaja')
    estadoCaja() { // No probado! Se le pasa solo el array de monedas
      return cajaInstance.cajaAbierta().then((res) => {
        if (res) {
          return {abierta: true, error: false};
        } else {
          return {abierta: false, error: false};
        }
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/estadoCaja CATCH'};
      });
    }

    @Post('getMonedasUltimoCierre')
    getMonedasUltimoCierre() { // No probado! Se le pasa solo el array de monedas
      return cajaInstance.getMonedas('CLAUSURA').then((res) => {
        return {error: false, info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getMonedasUltimoCierre > CATCH'};
      });
    }
    @Post('cambioTurno')
    cambioTurno() { // No probado! Se le pasa solo el array de monedas
      console.log("holahola");
      // if (params.estado==true) {
      //   return {msg:'cambioTurno recibido',estado:false};
      // } else {
      //   return {msg:'cambioTurno recibido',estado:true};
      // }
      return cajaInstance.getCambioDeTurno().then((res) => {
        return { info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getCambioTurno > CATCH'};
      });
      
    }
    @Post('anularTurno')
    anularTurno() { // No probado! Se le pasa solo el array de monedas
      console.log("adiosadios");
      // if (params.estado==true) {
      //   return {msg:'cambioTurno recibido',estado:false};
      // } else {
      //   return {msg:'cambioTurno recibido',estado:true};
      // }
      return cajaInstance.getAnularTurno().then((res) => {
        return { info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getAnularTurno > CATCH'};
      });
      
    }
    @Post('comprovarTurno')
    comprovarTurno() { // No probado! Se le pasa solo el array de monedas
      console.log("adiosadios");
      // if (params.estado==true) {
      //   return {msg:'cambioTurno recibido',estado:false};
      // } else {
      //   return {msg:'cambioTurno recibido',estado:true};
      // }
      return cajaInstance.getComprovarTurno().then((res) => {
        return { info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getAnularTurno > CATCH'};
      });
      
    }
    
    @Post('getDatosUltimoCierre')
    getDatosUltimoCierre() { // No probado! Se le pasa solo el array de monedas
      return cajaInstance.getDatosUltimoCierre().then((res) => {
        return {error: false, info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getDatosUltimoCierre > CATCH'};
      });
    }

    @Post('getDatosMoviments')
    getDatosMoviments(@Body() params) { // No probado! Se le pasa solo el array de monedas
      return cajaInstance.getDatosMoviments(params.fechaInicio, params.fechaFinal).then((res) => {
        return {error: false, info: res};
      }).catch((err) => {
        mqtt.loggerMQTT(err);
        return {error: true, mensaje: 'Backend: Error en caja/getDatosMoviments > CATCH'};
      });
    }

}
