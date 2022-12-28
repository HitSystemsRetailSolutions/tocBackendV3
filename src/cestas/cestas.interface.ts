export interface CestasInterface {
    _id: number,
    tiposIva: {
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
    },
    regalo?: boolean,
    lista: {
        _id: number,
        nombre: string,
        unidades: number,
        subtotal: number,
        suplementosId?: number[],
        promocion: {
            _id: string,
            esPromo: boolean,
            infoPromo?: {
                idPrincipal: number,
                cantidadPrincipal: number,
                idSecundario: number,
                cantidadSecundario: number,
                precioRealPrincipal: number,
                precioRealSecundario: number,
                unidadesOferta: number,
                tipoPromo: string
            }
        },
        regalo?: boolean
    }[],
    nombreCesta?: string;
    idCestaSincro?: string,
    idTrabajador: number
}
