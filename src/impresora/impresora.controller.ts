import {Controller, Post, Body} from '@nestjs/common';
import { parametrosInstance } from 'src/parametros/parametros.clase';
import {impresoraInstance} from './impresora.class';

@Controller('impresora')
export class ImpresoraController {
    @Post('imprimirTicket')
  imprimirTicket(@Body() params) {
    const idTicket: number = params.idTicket;
    impresoraInstance.imprimirTicket(idTicket);
  }

    @Post('abrirCajon')
    abrirCajon() {
      impresoraInstance.abrirCajon();
    }

    @Post('imprimirEntregas')
    imprimirEntregas() {
      return impresoraInstance.imprimirEntregas();
    }

    @Post('imprimirCaja')
    imprimircaja(@Body() params) {
      const parametros = parametrosInstance.getParametros();
      params.caja.detalleApertura.forEach(element => {
        console.log(element)
      });
      return impresoraInstance.imprimirCaja(params.caja.calaixFetZ,params.caja.idDependienta, params.caja.descuadre, params.caja.nClientes,  params.caja.recaudado, params.caja.movimientos, parametros.nombreTienda, params.caja.inicioTime, params.caja.finalTime, params.caja.infoExtra.cambioInicial, params.caja.infoExtra.cambioFinal,params.totalDatafono3G,params.caja.detalleApertura, params.caja.detalleCierre, null)

    }
    
    @Post('despedida')
    despedircliente() {
      impresoraInstance.despedircliente();
    }
    @Post('bienvenida')
    binvenidacliente() {
      impresoraInstance.binvenidacliente();
    }
}
