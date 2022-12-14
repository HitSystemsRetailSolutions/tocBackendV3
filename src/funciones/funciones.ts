import {ArticulosInterface} from '../articulos/articulos.interface';

interface TiposIva
{
    base1: number,
    base2: number,
    base3: number,
    base4: number,
    base5: number,
    valorIva1: number,
    valorIva2: number,
    valorIva3: number,
    valorIva4: number,
    valorIva5: number,
    importe1: number,
    importe2: number,
    importe3: number,
    importe4: number,
    importe5: number
}

function redondearPrecio(precio) /* REDONDEA AL SEGUNDO DECIMAL */
{
  return Math.round(precio * 100) / 100;
}
export function construirObjetoIvas(infoArticulo: ArticulosInterface, unidades, tipoIvaAnterior: TiposIva, infoAPeso = null) : TiposIva {
  let base1 = 0; let base2 = 0; let base3 = 0; let base4 = 0; let base5 = 0;

  let valor1 = 0; let valor2 = 0; let valor3 = 0; let valor4 = 0; let valor5 = 0;
  let importe1 = 0; let importe2 = 0; let importe3 = 0; let importe4 = 0; let importe5 = 0;
console.log("tipoIvas: ",infoArticulo.tipoIva);
  if (infoAPeso == null) {
    switch (infoArticulo.tipoIva) {
      case 1: base1 = (infoArticulo.precioConIva / 1.04) * unidades; valor1 = (infoArticulo.precioConIva / 1.04) * 0.04 * unidades; importe1 = infoArticulo.precioConIva * unidades; break;
      case 2: base2 = (infoArticulo.precioConIva / 1.10) * unidades; valor2 = (infoArticulo.precioConIva / 1.10) * 0.10 * unidades; importe2 = infoArticulo.precioConIva * unidades; break;
      case 3: base3 = (infoArticulo.precioConIva / 1.21) * unidades; valor3 = (infoArticulo.precioConIva / 1.21) * 0.21 * unidades; importe3 = infoArticulo.precioConIva * unidades; break;
      case 4: base4 = (infoArticulo.precioConIva / 1) * unidades; valor4 = (infoArticulo.precioConIva / 1) * 0 * unidades; importe4 = infoArticulo.precioConIva * unidades; break;
      case 5: base5 = (infoArticulo.precioConIva / 1.05) * unidades; valor5 = (infoArticulo.precioConIva / 1.05) * 0.05 * unidades; importe5 = infoArticulo.precioConIva * unidades; break;
      default: break;
    }
  } else {
    switch (infoArticulo.tipoIva) {
      case 1: base1 = (infoAPeso.precioAplicado / 1.04) * unidades; valor1 = (infoAPeso.precioAplicado / 1.04) * 0.04 * unidades; importe1 = infoAPeso.precioAplicado * unidades; break;
      case 2: base2 = (infoAPeso.precioAplicado / 1.10) * unidades; valor2 = (infoAPeso.precioAplicado / 1.10) * 0.10 * unidades; importe2 = infoAPeso.precioAplicado * unidades; break;
      case 3: base3 = (infoAPeso.precioAplicado / 1.21) * unidades; valor3 = (infoAPeso.precioAplicado / 1.21) * 0.21 * unidades; importe3 = infoAPeso.precioAplicado * unidades; break;
      case 4: base4 = (infoAPeso.precioAplicado / 1) * unidades; valor4 = (infoAPeso.precioAplicado / 1)  * 0 * unidades; importe4 = infoAPeso.precioAplicado * unidades; break;
      case 5: base5 = (infoAPeso.precioAplicado / 1.05) * unidades; valor5 = (infoAPeso.precioAplicado / 1.05) * 0.05 * unidades; importe5 = infoAPeso.precioAplicado * unidades; break;
      default: break;
    }
  }
  const aux = {
    base1: redondearPrecio(base1 + tipoIvaAnterior.base1),
    base2: redondearPrecio(base2 + tipoIvaAnterior.base2),
    base3: redondearPrecio(base3 + tipoIvaAnterior.base3),
    base4: redondearPrecio(base4 + tipoIvaAnterior.base4),
    base5: redondearPrecio(base5 + tipoIvaAnterior.base5),
    valorIva1: redondearPrecio(valor1 + tipoIvaAnterior.valorIva1),
    valorIva2: redondearPrecio(valor2 + tipoIvaAnterior.valorIva2),
    valorIva3: redondearPrecio(valor3 + tipoIvaAnterior.valorIva3),
    valorIva4: redondearPrecio(valor4 + tipoIvaAnterior.valorIva4),
    valorIva5: redondearPrecio(valor5 + tipoIvaAnterior.valorIva5),
    importe1: redondearPrecio(importe1 + tipoIvaAnterior.importe1),
    importe2: redondearPrecio(importe2 + tipoIvaAnterior.importe2),
    importe3: redondearPrecio(importe3 + tipoIvaAnterior.importe3),
    importe4: redondearPrecio(importe4 + tipoIvaAnterior.importe4),
    importe5: redondearPrecio(importe5 + tipoIvaAnterior.importe5),
  };
  
  return aux;
}
export function convertirPuntosEnDinero(puntos: number): number {
  return Math.trunc(puntos*0.03*0.02);
}
export function crearCestaVacia() {
  const cestaVacia = {
    _id: Date.now(),
    tiposIva: {
      base1: 0,
      base2: 0,
      base3: 0,
      base4:0,
      base5:0,
      valorIva1: 0,
      valorIva2: 0,
      valorIva3: 0,
      valorIva4: 0,
      valorIva5: 0,
      importe1: 0,
      importe2: 0,
      importe3: 0,
      importe4: 0,
      importe5: 0
    },
    lista: [],
    idTrabajador: null,
  };
  return cestaVacia;
}
