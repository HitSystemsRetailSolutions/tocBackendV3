export interface DevolucionesInterface {
    _id: number,
    timestamp: number,
    total: number,
    lista: {
        _id: number,
        nombre: string,
        promocion: {
            _id: string,
            esPromo: boolean
        },
        subtotal: number,
        unidades: number
    }[],
    tipoPago: 'DEVOLUCION',
    idTrabajador: number,
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
    enviado: boolean,
    enTransito: boolean,
    intentos: number,
    comentario: string,
}
