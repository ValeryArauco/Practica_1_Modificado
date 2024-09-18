export class Producto{
    constructor(nombre, descripcion, precio, cantidad,categoria){
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._precio = precio;
        this._cantidad = cantidad;
        this._disponible = true;
        this._categoria = categoria;
    }

    get nombre(){
        return this._nombre;
    }

    get descripcion(){
        return this._descripcion;
    }

    get precio(){
        return this._precio;
    }

    get cantidad(){
        return this._cantidad;
    }
    
    get disponible()
    {
        return this._disponible;
    }
    
    get categoria(){
        return this._categoria;
    }

    set cantidad(cantidad){
        this._cantidad = cantidad;
    }

    set nombre(nombre){
        this._nombre=nombre;
    }

    set descripcion(descripcion){
        this._descripcion=descripcion;
    }

    set precio(precio){
        this._precio=precio;
    }

    set disponible(disponible){
        this._disponible=disponible;
    }

    set categoria(categoria){
        this._categoria=categoria;
    }


    ActualizarDisponibilidad()
    {
        if(this._cantidad<=0)
        {
            this._disponible=false;
        }
    }
}