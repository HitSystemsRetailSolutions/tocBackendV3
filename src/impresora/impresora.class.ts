import {articulosInstance} from '../articulos/articulos.clase';
import {paramsTicketInstance} from '../params-ticket/params-ticket.class';
import {ticketsInstance} from '../tickets/tickets.clase';
import {TicketsInterface} from '../tickets/tickets.interface';
import {trabajadoresInstance} from '../trabajadores/trabajadores.clase';
import {TrabajadoresInterface} from '../trabajadores/trabajadores.interface';
import {clienteInstance} from '../clientes/clientes.clase';
import {parametrosInstance} from '../parametros/parametros.clase';
import {Dispositivos} from '../dispositivos';
import {devolucionesInstance} from 'src/devoluciones/devoluciones.clase';
import axios from 'axios';
import {Mqtt} from '../mqtt';
const mqttlog = new Mqtt();

const dispositivos = new Dispositivos();
const escpos = require('escpos');
const exec = require('child_process').exec;
const os = require('os');
escpos.USB = require('escpos-usb');
escpos.Serial = require('escpos-serialport');
escpos.Screen = require('escpos-screen');
const TIPO_ENTRADA_DINERO = 'ENTRADA';
const TIPO_SALIDA_DINERO = 'SALIDA';
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://localhost')
function permisosImpresora() {
  try {
    exec(`  echo sa | sudo -S chmod 777 -R /dev/bus/usb/
        echo sa | sudo -S chmod 777 -R /dev/ttyS0
        echo sa | sudo -S chmod 777 -R /dev/ttyS1
        echo sa | sudo -S chmod 777 -R /dev/    
    `);
  } catch (err) {
      mqttlog.loggerMQTT(err);
  }
}
function random() {
  const numero = Math.floor(10000000 + Math.random() * 999999999);
  return numero.toString(16).slice(0, 8);
}

/* Función auxiliar */
function dateToString2(fecha) {
  let fechaFinal = null;
  if (typeof fecha === 'string' || typeof fecha === 'number') {
    fechaFinal = new Date(fecha);
  }

  const finalYear = `${fechaFinal.getFullYear()}`;
  let finalMonth = `${fechaFinal.getMonth() + 1}`;
  let finalDay = `${fechaFinal.getDate()}`;
  let finalHours = `${fechaFinal.getHours()}`;
  let finalMinutes = `${fechaFinal.getMinutes()}`;
  let finalSeconds = `${fechaFinal.getSeconds()}`;


  if (finalMonth.length === 1) {
    finalMonth = '0' + finalMonth;
  }
  if (finalDay.length === 1) {
    finalDay = '0' + finalDay;
  }
  if (finalHours.length === 1) {
    finalHours = '0' + finalHours;
  }
  if (finalMinutes.length === 1) {
    finalMinutes = '0' + finalMinutes;
  }
  if (finalSeconds.length === 1) {
    finalSeconds = '0' + finalSeconds;
  }
  return `${finalYear}-${finalMonth}-${finalDay} ${finalHours}:${finalMinutes}:${finalSeconds}`;
}

export class Impresora {
  async binvenidacliente() {
    try {
      permisosImpresora();
      //   var device = new escpos.USB('0x67b','0x2303');
      const device = await dispositivos.getDeviceVisor();
      if (device != null) {
        if(device === 'MQTT'){
          client.publish('hit.hardware/visor','Bon Dia!!                               ')
          return
        }
        const options = {encoding: 'iso88591'};
        const printer = new escpos.Screen(device, options);

        try {
          device.open(function() {
            printer
            // Espacios en blanco para limpiar el visor y volver a mostrar los datos en el sitio correcto
            // .text("")
                .clear()
            // .moveUp()
            // Información del artículo (artículo + precio)
                .text('Bon Dia!!')
            // .text(datosExtra)

                .close();
          });
        } catch (error) {

        }
      } else {
          mqttlog.loggerMQTT('Controlado: dispositivo es null');
      }
    } catch (err) {
        mqttlog.loggerMQTT('Error1: '+err);
      // errorImpresora(err, event);
    }
  }
  async despedircliente(data:number) {
    console.log(data);
    try {
      permisosImpresora();
      //   var device = new escpos.USB('0x67b','0x2303');
      const device = await dispositivos.getDeviceVisor();
      if (device != null) {

        if(device === 'MQTT'){
          let dataString:string=data.toString();
        let linea1Visor="Moltes gracies!!    "+"Total: "+dataString.replace(",",".")+"E";
        let restar=linea1Visor;
        linea1Visor+="                                        ";
        
        let lineasVisor:string=linea1Visor.substring(0,linea1Visor.length-restar.length);
        console.log(lineasVisor.length,lineasVisor);
        client.publish('hit.hardware/visor',lineasVisor);
          return
        }
        const options = {encoding: 'iso88591'};
        const printer = new escpos.Screen(device, options);
        try {
          device.open(function() {
            printer
            // Espacios en blanco para limpiar el visor y volver a mostrar los datos en el sitio correcto
            // .text("")
                .clear()
            // .moveUp()
            // Información del artículo (artículo + precio)
                .text(' Moltes Gracies !!')
            // .text(datosExtra)
                .close();
          });
        } catch (error) {

        }
      } else {
          mqttlog.loggerMQTT('Controlado: dispositivo es null');
      }
    } catch (err) {
        mqttlog.loggerMQTT('Error1: '+ err);
      // errorImpresora(err, event);
    }
  }
  async imprimirTicket(idTicket: number, esDevolucion = false) {
    const paramsTicket = await paramsTicketInstance.getParamsTicket();
    // const infoTicket: TicketsInterface = await ticketsInstance.getTicketByID(idTicket);
    let infoTicket;
    if (!esDevolucion) {
      infoTicket = await ticketsInstance.getTicketByID(idTicket);
    } else {
      infoTicket = await devolucionesInstance.getDevolucionByID(idTicket);
    }
    //   mqttlog.loggerMQTT(infoTicket)
    const infoTrabajador: TrabajadoresInterface = await trabajadoresInstance.getTrabajador(infoTicket.idTrabajador);
    const parametros = parametrosInstance.getParametros();
    let sendObject;

    if (infoTicket != null) {
      if (infoTicket.cliente != null && infoTicket.tipoPago != 'DEUDA' && infoTicket.cliente != undefined) {
        const infoClienteAux = await clienteInstance.getClienteByID(infoTicket.cliente);
        const infoCliente = infoClienteAux;
        let auxNombre = '';
        let puntosCliente = 0;
        if (infoCliente != null) {
          auxNombre = infoCliente.nombre;
          puntosCliente = await clienteInstance.getPuntosCliente(infoTicket.cliente);
        } else {
          auxNombre = '';
        }

        sendObject = {
          numFactura: infoTicket._id,
          arrayCompra: infoTicket.lista,
          total: infoTicket.total,
          visa: infoTicket.tipoPago,
          tiposIva: infoTicket.tiposIva,
          cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
          pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
          nombreTrabajador: (infoTrabajador.nombreCorto != null) ? (infoTrabajador.nombreCorto): (''),
          impresora: parametros.tipoImpresora,
          infoClienteVip: infoTicket.infoClienteVip,
          infoCliente: {
            nombre: auxNombre,
            puntos: puntosCliente,
          },
        };
        this._venta(sendObject, infoTicket.recibo);
      } else {
        sendObject = {
          numFactura: infoTicket._id,
          arrayCompra: infoTicket.lista,
          total: infoTicket.total,
          visa: infoTicket.tipoPago,
          tiposIva: infoTicket.tiposIva,
          cabecera: paramsTicket[0] !== undefined ? paramsTicket[0].valorDato: '',
          pie: paramsTicket[1] !== undefined ? paramsTicket[1].valorDato: '',
          nombreTrabajador: (infoTrabajador.nombreCorto != null) ? (infoTrabajador.nombreCorto): (''),
          impresora: parametros.tipoImpresora,
          infoClienteVip: infoTicket.infoClienteVip,
          infoCliente: null,
        };

        this._venta(sendObject);
      }
    }
  }

  private async imprimirRecibo(recibo: string) {
      mqttlog.loggerMQTT('imprimir recibo');
    try {
      permisosImpresora();
      const device = await dispositivos.getDevice();
      if (device == null) {
        throw 'Error controlado: El dispositivo es null';
      }
      const printer = new escpos.Printer(device);

      device.open(function() {
        printer
            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .size(0, 0)
            .text(recibo)
            .cut('PAPER_FULL_CUT')
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT('Error impresora: ' +err);
    }
  }

  private async _venta(info, recibo = null) {
    const numFactura = info.numFactura;
    const arrayCompra = info.arrayCompra;
    const total = info.total;
    const tipoPago = info.visa;
    //   mqttlog.loggerMQTT(tipoPago)
    const tiposIva = info.tiposIva;
    const cabecera = info.cabecera;
    const pie = info.pie;
    const nombreDependienta = info.nombreTrabajador;
    const tipoImpresora = info.impresora;
    const infoClienteVip = info.infoClienteVip;
    const infoCliente = info.infoCliente;
    let strRecibo = '';
    if (recibo != null && recibo != undefined) {
      strRecibo = recibo;
    }
    try {
      permisosImpresora();

      // if(tipoImpresora === 'USB')
      // {
      //     const arrayDevices = escpos.USB.findPrinter();
      //     if (arrayDevices.length > 0) {
      //         /* Solo puede haber un dispositivo USB */
      //         const dispositivoUnico = arrayDevices[0];
      //         var device = new escpos.USB(dispositivoUnico); //USB
      //     } else if (arrayDevices.length == 0) {
      //         throw 'Error, no hay ningún dispositivo USB conectado';
      //     } else {
      //         throw 'Error, hay más de un dispositivo USB conectado';
      //     }
      // }
      // else
      // {
      //     if(tipoImpresora === 'SERIE')
      //     {
      //         var device = new escpos.Serial('/dev/ttyS0', {
      //             baudRate: 115200,
      //             stopBit: 2
      //         });
      //     }
      // }
      const device = await dispositivos.getDevice();
      if (device == null) {
        throw 'Error controlado: El dispositivo es null';
      }
      const printer = new escpos.Printer(device);

      let detalles = '';
      let pagoTarjeta = '';
      let pagoTkrs = '';
      let detalleClienteVip = '';
      let detalleNombreCliente = '';
      let detallePuntosCliente = '';
      if (infoClienteVip && infoClienteVip.esVip) {
        detalleClienteVip = `Nom: ${infoClienteVip.nombre}\nNIF: ${infoClienteVip.nif}\nCP: ${infoClienteVip.cp}\nCiutat: ${infoClienteVip.ciudad}\nAdr: ${infoClienteVip.direccion}\n`;
      }

      if (infoCliente != null) {
        detalleNombreCliente = infoCliente.nombre;
        detallePuntosCliente = 'PUNTOS: ' + infoCliente.puntos;
      }

      for (let i = 0; i < arrayCompra.length; i++) {
        if (arrayCompra[i].promocion.esPromo) {
          let nombrePrincipal = (await articulosInstance.getInfoArticulo(arrayCompra[i].promocion.infoPromo.idPrincipal)).nombre;
          nombrePrincipal = 'Oferta ' + nombrePrincipal;
          while (nombrePrincipal.length < 20) {
            nombrePrincipal += ' ';
          }
          detalles += `${arrayCompra[i].unidades*arrayCompra[i].promocion.infoPromo.cantidadPrincipal}     ${nombrePrincipal.slice(0, 20)}       ${arrayCompra[i].promocion.infoPromo.precioRealPrincipal.toFixed(2)}\n`;
          if (arrayCompra[i].promocion.infoPromo.cantidadSecundario > 0) {
            let nombreSecundario = (await articulosInstance.getInfoArticulo(arrayCompra[i].promocion.infoPromo.idSecundario)).nombre;
            nombreSecundario = 'Oferta ' + nombreSecundario;
            while (nombreSecundario.length < 20) {
              nombreSecundario += ' ';
            }
            detalles += `${arrayCompra[i].unidades*arrayCompra[i].promocion.infoPromo.cantidadSecundario}     ${nombreSecundario.slice(0, 20)}       ${arrayCompra[i].promocion.infoPromo.precioRealSecundario.toFixed(2)}\n`;
          }
        } else {
          if (arrayCompra[i].nombre.length < 20) {
            while (arrayCompra[i].nombre.length < 20) {
              arrayCompra[i].nombre += ' ';
            }
          }
          detalles += `${arrayCompra[i].unidades}     ${arrayCompra[i].nombre.slice(0, 20)}       ${arrayCompra[i].subtotal.toFixed(2)}\n`;
        }
      }
      const fecha = new Date();
      if (tipoPago == 'TARJETA') {
        pagoTarjeta = '----------- PAGADO CON TARJETA ---------\n';
      }
      if (tipoPago == 'TICKET_RESTAURANT') {
        pagoTkrs = '----- PAGADO CON TICKET RESTAURANT -----\n';
      }
      let pagoDevolucion: string = '';

      if (tipoPago == 'DEVOLUCION') {
        //   mqttlog.loggerMQTT('Entramos en tipo pago devolucion')
        pagoDevolucion = '-- ES DEVOLUCION --\n';
      }
      let str1= '            ';
      let str2= '                 ';
      let str3= '              ';
      let base = '';
      let valorIva = '';
      let importe = '';
      let detalleIva4 = '';
      let detalleIva10 = '';
      let detalleIva21 = '';
      let detalleIva = '';
      let detalleIva0 = '';
      let detalleIva5 = '';
      if (tiposIva.importe1 > 0) {
        base=tiposIva.base1.toFixed(2)+'€';
        valorIva='4%: '+tiposIva.valorIva1.toFixed(2)+'€';
        importe=tiposIva.importe1.toFixed(2)+'€\n';
        detalleIva4 = str1.substring(0,str1.length-base.length)+base+str2.substring(0,str2.length-valorIva.length)+valorIva+str3.substring(0,str3.length-importe.length)+importe;
      }
      if (tiposIva.importe2 > 0) {
        base=tiposIva.base2.toFixed(2)+'€';
        valorIva='10%: '+tiposIva.valorIva2.toFixed(2)+'€';
        importe=tiposIva.importe2.toFixed(2)+'€\n';
        detalleIva10 = str1.substring(0,str1.length-base.length)+base+str2.substring(0,str2.length-valorIva.length)+valorIva+str3.substring(0,str3.length-importe.length)+importe;
      }
      if (tiposIva.importe3 > 0) {
        base=tiposIva.base3.toFixed(2)+'€';
        valorIva='21%: '+tiposIva.valorIva3.toFixed(2)+'€';
        importe=tiposIva.importe3.toFixed(2)+'€\n';
        detalleIva21 = str1.substring(0,str1.length-base.length)+base+str2.substring(0,str2.length-valorIva.length)+valorIva+str3.substring(0,str3.length-importe.length)+importe;
      }
      if (tiposIva.importe4 > 0) {
        base=tiposIva.base4.toFixed(2)+'€';
        valorIva='0%: '+tiposIva.valorIva4.toFixed(2)+'€';
        importe=tiposIva.importe4.toFixed(2)+'€\n';
        detalleIva0 = str1.substring(0,str1.length-base.length)+base+str2.substring(0,str2.length-valorIva.length)+valorIva+str3.substring(0,str3.length-importe.length)+importe;
      }
      if (tiposIva.importe5 > 0) {
        base=tiposIva.base5.toFixed(2)+'€';
        valorIva='5%: '+tiposIva.valorIva5.toFixed(2)+'€';
        importe=tiposIva.importe5.toFixed(2)+'€\n';
        detalleIva5 = str1.substring(0,str1.length-base.length)+base+str2.substring(0,str2.length-valorIva.length)+valorIva+str3.substring(0,str3.length-importe.length)+importe;
      }
      detalleIva = detalleIva0 + detalleIva4 + detalleIva5 + detalleIva10 + detalleIva21;
      let infoConsumoPersonal = '';
      if (tipoPago == 'CONSUMO_PERSONAL') {
        infoConsumoPersonal = '---------------- Dte. 100% --------------';
        detalleIva = '';
      }

      const diasSemana = ['Diumenge', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'];


      device.open(function() {
        printer

            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .size(0, 0)
            .text(cabecera)
            .text(`Data: ${diasSemana[fecha.getDay()]} ${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}  ${(fecha.getHours()<10?'0':'') + fecha.getHours()}:${(fecha.getMinutes()<10?'0':'') + fecha.getMinutes()}`)
            .text('Factura simplificada N: ' + numFactura)
            .text('Ates per: ' + nombreDependienta)
            .text(detalleClienteVip)
            .text(detalleNombreCliente)
            .text(detallePuntosCliente)
            .control('LF')
            .control('LF')
            .control('LF')
            .text('Quantitat      Article        Import (EUR)')
            .text('-----------------------------------------')
            .align('LT')
            .text(detalles)
            .align('CT')
            .text(pagoTarjeta)
            .text(pagoTkrs)
            .align('LT')
            .text(infoConsumoPersonal)
            .align('CT')
            .text('----------------------------------------------')
            .align('LT')
            .size(1, 1)
            .text(pagoDevolucion)
            .text('TOTAL: ' + total.toFixed(2) + ' €')
            .control('LF')
            .size(0, 0)
            .align('CT')
            .text('Base IVA         IVA         IMPORT')
            .align('LT')
            .text(detalleIva)
            .align('CT')
            .text('-- ES COPIA --')
            .control('LF')
            .text('ID: '+ random() +' - '+ random())
            .text(pie)
            .control('LF')
            .control('LF')
            .control('LF')
            .cut('PAPER_FULL_CUT')
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT('Error impresora: '+ err);
    }
  }

  async imprimirSalida(cantidad: number, fecha: number, nombreTrabajador: string, nombreTienda: string, concepto: string, tipoImpresora: string, codigoBarras: string) {
    try {
      const fechaStr = dateToString2(fecha);
      permisosImpresora();

      // if(tipoImpresora === 'USB')
      // {
      //     const arrayDevices = escpos.USB.findPrinter();
      //     if (arrayDevices.length > 0) {
      //         /* Solo puede haber un dispositivo USB */
      //         const dispositivoUnico = arrayDevices[0];
      //         var device = new escpos.USB(dispositivoUnico); //USB
      //     } else if (arrayDevices.length == 0) {
      //         throw 'Error, no hay ningún dispositivo USB conectado';
      //     } else {
      //         throw 'Error, hay más de un dispositivo USB conectado';
      //     }
      // }
      // else if(tipoImpresora === 'SERIE') {
      //     var device = new escpos.Serial('/dev/ttyS0', {
      //         baudRate: 115000,
      //         stopBit: 2
      //     });
      // }
      const device = await dispositivos.getDevice();

      const options = {encoding: 'GB18030'};
      const printer = new escpos.Printer(device, options);
      device.open(function() {
        printer
            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .align('CT')
            .size(0, 0)
            .text(nombreTienda)
            .text(fechaStr)
            .text('Dependienta: ' + nombreTrabajador)
            .text('Retirada efectivo: ' + cantidad)
            .size(1, 1)
            .text(cantidad)
            .size(0, 0)
            .text('Concepto')
            .size(1, 1)
            .text(concepto)
            .text('')
            .barcode(codigoBarras.slice(0, 12), 'EAN13', 4)
            .text('')
            .text('')
            .text('')
            .cut()
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT(err);
    }
  }

  async imprimirEntrada(totalIngresado: number, fecha: number, nombreDependienta: string) {
    const parametros = parametrosInstance.getParametros();
    try {
      const fechaStr = dateToString2(fecha);
      permisosImpresora();
      // if(parametros.tipoImpresora === 'USB')
      // {
      //     const arrayDevices = escpos.USB.findPrinter();
      //     if (arrayDevices.length > 0) {
      //         /* Solo puede haber un dispositivo USB */
      //         const dispositivoUnico = arrayDevices[0];
      //         var device = new escpos.USB(dispositivoUnico); //USB
      //     } else if (arrayDevices.length == 0) {
      //         throw 'Error, no hay ningún dispositivo USB conectado';
      //     } else {
      //         throw 'Error, hay más de un dispositivo USB conectado';
      //     }
      // }
      // else if(parametros.tipoImpresora === 'SERIE') {
      //     var device = new escpos.Serial('/dev/ttyS0', {
      //         baudRate: 115000,
      //         stopBit: 2
      //     });
      // }
      const device = await dispositivos.getDevice();

      const options = {encoding: 'GB18030'};
      const printer = new escpos.Printer(device, options);
      device.open(function() {
        printer
            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .align('CT')
            .size(0, 0)
            .text(parametros.nombreTienda)
            .text(fechaStr)
            .text('Dependienta: ' + nombreDependienta)
            .text('Ingreso efectivo: ' + totalIngresado)
            .size(1, 1)
            .text(totalIngresado)
            .size(0, 0)
            .text('')
            .size(1, 1)
            .text('')
            .text('')
            .text('')
            .cut()
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT(err);
    }
  }

  async imprimirTest() {
    const parametros = parametrosInstance.getParametros();
    try {
      permisosImpresora();
      // if(parametros.tipoImpresora === 'USB')
      // {
      //     const arrayDevices = escpos.USB.findPrinter();
      //     if (arrayDevices.length > 0) {
      //         /* Solo puede haber un dispositivo USB */
      //         const dispositivoUnico = arrayDevices[0];
      //         var device = new escpos.USB(dispositivoUnico); //USB
      //     } else if (arrayDevices.length == 0) {
      //         throw 'Error, no hay ningún dispositivo USB conectado';
      //     } else {
      //         throw 'Error, hay más de un dispositivo USB conectado';
      //     }
      // }
      // else if(parametros.tipoImpresora === 'SERIE') {
      //     var device = new escpos.Serial('/dev/ttyS0', {
      //         baudRate: 115000,
      //         stopBit: 2
      //     });
      // }
      const device = await dispositivos.getDevice();

      const options = {encoding: 'GB18030'};
      const printer = new escpos.Printer(device, options);
      device.open(function() {
        printer
            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .align('CT')
            .size(1, 1)
            .text('HOLA HOLA')
            .cut()
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT(err);
    }
  }

  async imprimirCaja(calaixFet, nombreTrabajador, descuadre, nClientes, recaudado, arrayMovimientos: any[], nombreTienda, fI, fF, cInicioCaja, cFinalCaja,totalDatafono3G,detalleApertura,detalleCierre, tipoImpresora) {
  
    try {
      const fechaInicio = new Date(fI);
      const fechaFinal = new Date(fF);
      let sumaTarjetas = 0;
      let textoMovimientos = '';
      for (let i = 0; i < arrayMovimientos.length; i++) {
        const auxFecha = new Date(arrayMovimientos[i]._id);
        if (arrayMovimientos[i].tipo === TIPO_SALIDA_DINERO) {
          if (arrayMovimientos[i].concepto == 'Targeta' || arrayMovimientos[i].concepto == 'Targeta 3G') {
            sumaTarjetas += arrayMovimientos[i].valor;
           
          } else {
            textoMovimientos += `${i + 1}: Salida:\n           Cantidad: -${arrayMovimientos[i].valor.toFixed(2)}\n           Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n           Concepto: ${arrayMovimientos[i].concepto}\n`;
          }
        }
        if (arrayMovimientos[i].tipo === TIPO_ENTRADA_DINERO) {
          textoMovimientos += `${i + 1}: Entrada:\n            Cantidad: +${arrayMovimientos[i].valor.toFixed(2)}\n            Fecha: ${auxFecha.getDate()}/${auxFecha.getMonth()}/${auxFecha.getFullYear()}  ${auxFecha.getHours()}:${auxFecha.getMinutes()}\n            Concepto: ${arrayMovimientos[i].concepto}\n`;
        }
      }
      textoMovimientos = `\nTotal targeta:      ${sumaTarjetas.toFixed(2)}\n` + textoMovimientos;

      permisosImpresora();
      // if(tipoImpresora === 'USB')
      // {
      //     const arrayDevices = escpos.USB.findPrinter();
      //     if (arrayDevices.length > 0) {
      //         /* Solo puede haber un dispositivo USB */
      //         const dispositivoUnico = arrayDevices[0];
      //         var device = new escpos.USB(dispositivoUnico); //USB
      //     } else if (arrayDevices.length == 0) {
      //         throw 'Error, no hay ningún dispositivo USB conectado';
      //     } else {
      //         throw 'Error, hay más de un dispositivo USB conectado';
      //     }
      // }
      // else {
      //     if(tipoImpresora === 'SERIE')
      //     {
      //         var device = new escpos.Serial('/dev/ttyS0', {
      //             baudRate: 115000,
      //             stopBit: 2
      //           })
      //     }
      // }
      const device = await dispositivos.getDevice();
      const options = {encoding: 'ISO-8859-15'}; // "GB18030" };
      const printer = new escpos.Printer(device, options);
      const mesInicial = fechaInicio.getMonth()+1;
      const mesFinal = fechaFinal.getMonth()+1;
      device.open(function() {
        printer
            .setCharacterCodeTable(19)
            .encode('CP858')
            .font('a')
            .style('b')
            .align('CT')
            .size(1, 1)
            .text('BOTIGA : ' + nombreTienda)
            .size(0, 0)
            .text('Resum caixa')
            .text('')
            .align('LT')
            .text('Resp.   : ' + nombreTrabajador)
            .text(`Inici: ${fechaInicio.getDate()}-${mesInicial}-${fechaInicio.getFullYear()} ${(fechaInicio.getHours()<10?'0':'') + fechaInicio.getHours()}:${(fechaInicio.getMinutes()<10?'0':'') + fechaInicio.getMinutes()}`)
            .text(`Final: ${fechaFinal.getDate()}-${mesFinal}-${fechaFinal.getFullYear()} ${(fechaFinal.getHours()<10?'0':'') + fechaFinal.getHours()}:${(fechaFinal.getMinutes()<10?'0':'') + fechaFinal.getMinutes()}`)
            .text('')
            .size(0, 1)
            .text('Calaix fet       :      ' + calaixFet.toFixed(2))
            .text('Descuadre        :      ' + descuadre.toFixed(2))
            .text('Clients atesos   :      ' + nClientes)
            .text('Recaudat         :      ' + recaudado.toFixed(2))
            .text('Datafon 3g       :      ' + totalDatafono3G)
            .text('Canvi inicial    :      ' + cInicioCaja.toFixed(2))
            .text('Canvi final      :      ' + cFinalCaja.toFixed(2))
            .text('')
            .size(0, 0)
            .text('Moviments de caixa')
            .text('')
            .text('')
            .text(textoMovimientos)
            .text('')
            .text('')
            .text('')
            .text('       0.01 --> ' +detalleApertura[0]['valor'].toFixed(2) +'      ' + '0.01 --> ' +detalleCierre[0]['valor'].toFixed(2) )
            .text('       0.02 --> ' +detalleApertura[1]['valor'].toFixed(2) +'      ' + '0.02 --> ' +detalleCierre[1]['valor'].toFixed(2) )
            .text('       0.05 --> ' +detalleApertura[2]['valor'].toFixed(2) +'      ' + '0.05 --> ' +detalleCierre[2]['valor'].toFixed(2) )
            .text('       0.10 --> ' +detalleApertura[3]['valor'].toFixed(2) +'      ' + '0.10 --> ' +detalleCierre[3]['valor'].toFixed(2) )
            .text('       0.20 --> ' +detalleApertura[4]['valor'].toFixed(2) +'      ' + '0.20 --> ' +detalleCierre[4]['valor'].toFixed(2) )
            .text('       0.50 --> ' +detalleApertura[5]['valor'].toFixed(2) +'      ' + '0.50 --> ' +detalleCierre[5]['valor'].toFixed(2) )
            .text('       1.00 --> ' +detalleApertura[6]['valor'].toFixed(2) +'      ' + '1.00 --> ' +detalleCierre[6]['valor'].toFixed(2) )
            .text('       2.00 --> ' +detalleApertura[7]['valor'].toFixed(2) +'      ' + '2.00 --> ' +detalleCierre[7]['valor'].toFixed(2) )
            .text('       5.00 --> ' +detalleApertura[8]['valor'].toFixed(2) +'      ' + '5.00 --> ' +detalleCierre[8]['valor'].toFixed(2) )
            .text('       10.00 --> ' +detalleApertura[9]['valor'].toFixed(2) +'     ' + '10.00 --> ' +detalleCierre[9]['valor'].toFixed(2) )
            .text('       20.00 --> ' +detalleApertura[10]['valor'].toFixed(2) +'    ' + '20.00 --> ' +detalleCierre[10]['valor'].toFixed(2) )
            .text('       50.00 --> ' +detalleApertura[11]['valor'].toFixed(2) +'    ' + '50.00 --> ' +detalleCierre[11]['valor'].toFixed(2) )
            .text('       100.00 --> ' +detalleApertura[12]['valor'].toFixed(2) +'   ' + '100.00 --> ' +detalleCierre[12]['valor'].toFixed(2) )
            .text('       200.00 --> ' +detalleApertura[13]['valor'].toFixed(2) +'   ' + '200.00 --> ' +detalleCierre[13]['valor'].toFixed(2) )
            .text('       500.00 --> ' +detalleApertura[14]['valor'].toFixed(2) +'   ' + '500.00 --> ' +detalleCierre[14]['valor'].toFixed(2) )
            .text('')
            .text('')
            .text('')
            .cut()
            .close();
      });
    } catch (err) {
        mqttlog.loggerMQTT(err);
    }
  }

  async abrirCajon(data:number) {
    const parametros = parametrosInstance.getParametros();
    try {
      if (os.platform() === 'linux') {
          mqttlog.loggerMQTT('abrir cajon linux')
        permisosImpresora();
        // if(parametros.tipoImpresora === 'USB')
        // {
        //     const arrayDevices = escpos.USB.findPrinter();
        //     if (arrayDevices.length > 0) {
        //         /* Solo puede haber un dispositivo USB */
        //         const dispositivoUnico = arrayDevices[0];
        //         var device = new escpos.USB(dispositivoUnico); //USB
        //     } else if (arrayDevices.length == 0) {
        //         throw 'Error, no hay ningún dispositivo USB conectado';
        //     } else {
        //         throw 'Error, hay más de un dispositivo USB conectado';
        //     }
        // } else {
        //     if(parametros.tipoImpresora === 'SERIE') {
        //         var device = new escpos.Serial('/dev/ttyS0', {
        //             baudRate: 115000,
        //             stopBit: 2
        //           });
        //     }
        // }
        const device = await dispositivos.getDevice();
        const printer = new escpos.Printer(device);

        let dataString:string=data.toString();

        let linea1Visor="Moltes gracies!!    "+"Total: "+dataString.replace(",",".")+"E";
        let restar=linea1Visor;
        linea1Visor+="                                        ";
        
        let lineasVisor:string=linea1Visor.substring(0,linea1Visor.length-restar.length);
        
        client.publish('hit.hardware/visor',lineasVisor);
        device.open(function() {
          printer
              .cashdraw(2)
              .close();
        });
      }else if (os.platform() === 'win32') {
        permisosImpresora();
        // if(parametros.tipoImpresora === 'USB')
        // {
        //     const arrayDevices = escpos.USB.findPrinter();
        //     if (arrayDevices.length > 0) {
        //         /* Solo puede haber un dispositivo USB */
        //         const dispositivoUnico = arrayDevices[0];
        //         var device = new escpos.USB(dispositivoUnico); //USB
        //     } else if (arrayDevices.length == 0) {
        //         throw 'Error, no hay ningún dispositivo USB conectado';
        //     } else {
        //         throw 'Error, hay más de un dispositivo USB conectado';
        //     }
        // } else {
        //     if(parametros.tipoImpresora === 'SERIE') {
        //         var device = new escpos.Serial('/dev/ttyS0', {
        //             baudRate: 115000,
        //             stopBit: 2
        //           });
        //     }
        // }
        const device = await dispositivos.getDevice();
        const printer = new escpos.Printer(device);
        
        let dataString:string=data.toString();
        let linea1Visor="Moltes gracies!!    "+"Total: "+dataString.replace(",",".")+"E";
        let restar=linea1Visor;
        linea1Visor+="                                        ";
        
        let lineasVisor:string=linea1Visor.substring(0,linea1Visor.length-restar.length);
        console.log(lineasVisor.length,lineasVisor);
        client.publish('hit.hardware/visor',lineasVisor);

        device.open(function() {
          printer
              .cashdraw(2)
              .close();
        });
        
      }
    } catch (err) {
        mqttlog.loggerMQTT(err);
    }
  }
  async mostrarVisor(data) {
    let eur = 'E';

    let limitNombre = 0;
    let lengthTotal = '';
    let datosExtra = '';
    if (data.total !== undefined) {
      lengthTotal = (data.total).toString();
      if (lengthTotal.length == 1) limitNombre = 17;
      else if (lengthTotal.length == 2) limitNombre = 16;
      else if (lengthTotal.length == 3) limitNombre = 15;
      else if (lengthTotal.length == 4) limitNombre = 14;
      else if (lengthTotal.length == 5) limitNombre = 13;
      else if (lengthTotal.length == 6) limitNombre = 12;
      else if (lengthTotal.length == 7) limitNombre = 11;

      const dependienta = data.dependienta.substring(0, limitNombre);
      const total = data.total + eur;
      const espacio= ' ';
      const size = 20-(dependienta.length + total.length);
      const espacios = ['', ' ', '  ', '   ', '    ', '     ', '      ', '       ', '        ', '         ', '          ', '           ', '            ', '             ', '              '];
      datosExtra = dependienta +espacios[size] + total;
    }
    if (datosExtra.length <= 2) {
      datosExtra = '';
      eur = '';
    }
    // Limito el texto a 14, ya que la línea completa tiene 20 espacios. (1-14 -> artículo, 15 -> espacio en blanco, 16-20 -> precio)
    data.texto = data.texto.substring(0, 14);
    data.texto += ' ' + data.precio + eur;
    let string = `${datosExtra} ${data.texto}                                               `
    string = string + '                                             '

    try {
      permisosImpresora();
      const device = await dispositivos.getDeviceVisor();
      if (device != null) {
        if(device === 'MQTT'){
          console.log('Mqtt sended' + string + '.')
          client.publish('hit.hardware/visor',string.substring(0,40))
          return
        }
        const options = {encoding: 'iso88591'};
        const printer = new escpos.Screen(device, options);

        try {
          device.open(function() {
            printer
                .clear()
                .text(string.substring(0,40))
                .close();
          });
        } catch (error) {

        }
      } else {
          mqttlog.loggerMQTT('Controlado: dispositivo es null');
      }
    } catch (err) {
        mqttlog.loggerMQTT('Error2: '+ err);
//     errorImpresora(err, event);
    }
       mqttlog.loggerMQTT('El visor da muchos problemas');
  }


  async imprimirEntregas() {
    const params = parametrosInstance.getParametros();
    return axios.post('entregas/getEntregas', {database: params.database, licencia: params.licencia}).then(async (res: any) => {
      try {
        permisosImpresora();
        const device = await dispositivos.getDevice();
        if (device != null) {
          const options = {encoding: 'ISO-8859-15'}; // "GB18030" };
          const printer = new escpos.Printer(device, options);
          device.open(function() {
            printer
                .setCharacterCodeTable(19)
                .encode('CP858')
                .font('a')
                .style('b')
                .align('CT')
                .size(0, 0)
                .text(res.data.info)
                .cut()
                .close();
          });
          return {error: false, info: 'OK'};
        }
        return {error: true, info: 'Error, no se encuentra la impresora'};
      } catch (err) {
          mqttlog.loggerMQTT(err);
        return {error: true, info: 'Error en CATCH imprimirEntregas() 2'};
      }
    }).catch((err) => {
        mqttlog.loggerMQTT(err);
      return {error: true, info: 'Error en CATCH imprimirEntregas() 1'};
    });
  }
}
export const impresoraInstance = new Impresora();

