export class Reserva{
    constructor(producto,cantidad){
        this._producto=producto;
        this._cantidad=cantidad;
    }

    get producto(){
        return this._producto;
    }

    get cantidad(){
        return this._cantidad;
    }
}