import {parametrosInstance} from './parametros/parametros.clase';
import {Mqtt} from './mqtt';
const mqtt = new Mqtt();
const escpos = require('escpos');
const exec = require('child_process').exec;
const os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
escpos.Screen = require('escpos-screen');

export class Dispositivos {
  async getDevice() {
    // const device = new escpos.Screen(); --Mirarse screen
    const device = new escpos.Network('localhost');
   
    return device;



    const parametros = await parametrosInstance.getEspecialParametros();
    if (os.platform() === 'linux') {
      try {
        if (parametros.tipoImpresora == 'USB') {
          const device: number = new escpos.USB(parametros.impresoraUsbInfo.vid.toUpperCase(), parametros.impresoraUsbInfo.pid.toUpperCase());
          return device;
        } else if (parametros.tipoImpresora == 'SERIE') {
          const device = new escpos.Serial('/dev/ttyS0', {
            baudRate: 115200,
            stopBit: 2,
          });
          return device;
        } else {
          mqtt.loggerMQTT('Parametros de impresora no configurados')
          return null;
        }
      } catch (err) {
        mqtt.loggerMQTT(err)
        return null;
      }
    } else if (os.platform() === 'win32') {
 
      try {
        if (parametros.tipoImpresora == 'USB') {
        
          // const device: number = new escpos.USB();
          mqtt.loggerMQTT(`OBSERVÁ:  ${parametros.impresoraUsbInfo.vid.toUpperCase()}, ${parametros.impresoraUsbInfo.pid.toUpperCase()}`)
          const device: number = new escpos.USB(parametros.impresoraUsbInfo.vid.toUpperCase(), parametros.impresoraUsbInfo.pid.toUpperCase());
          mqtt.loggerMQTT(device)
          return device;
        } else if (parametros.tipoImpresora == 'SERIE') {
          const device = new escpos.Serial('COM1', {
            baudRate: 115200,
            stopBit: 2,
          });
          return device;
        } else {
          
          mqtt.loggerMQTT('Parametros de impresora no configurados');
          return null;
        }
      } catch (err) {
        mqtt.loggerMQTT(err.message);
        return null;
      }
    }
  }

  async getDeviceVisor() {
    const parametros = await parametrosInstance.getEspecialParametros();
    if (parametros.visor != undefined) {
      if(parametros.visor == 'MQTT'){
        return 'MQTT'
      }
      if (parametros.visor.includes('COM') || parametros.visor == 'SI') {
        if (os.platform() === 'win32') {
          const device = new escpos.Serial(parametros.visor);
          return device;
        } else if (os.platform() === 'linux') {
          return new escpos.Serial('/dev/ttyUSB0');
        }
      }
      return null;
    }
  }
}

