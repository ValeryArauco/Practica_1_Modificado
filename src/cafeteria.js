import { Producto } from "./classProducto";
import { Reserva } from "./classReserva";

let listaProductos=[];
let Reservas = [];


function VerificarCampos(nombre,descripcion,precio,cantidad){
    if (nombre === '' || descripcion === '' || precio === '' || cantidad === '') {
        return false; 
    }
    return true;
}
function ActualizarMenuCantidadProductoXReservaEliminado(listaMenu, posicion, cantidad){
    listaMenu[posicion].cantidad = listaMenu[posicion].cantidad + cantidad;
    return listaMenu;
}

function ActualizarMenuCantidadProductoXReserva(listaMenu, posicion, cantidad){
    listaMenu[posicion].cantidad = listaMenu[posicion].cantidad - cantidad;
    return listaMenu;
}

function validarReserva(reserva,producto)
{
    let valido = false
    if(reserva.cantidad<=producto.cantidad){
        valido = true;
    }
    return valido
}

function ActualizarCantidadMenu(productos,indice,cantidad,reserva)
{
    console.log("Entra");
    if(validarReserva(reserva,productos[indice]))
    {
        productos[indice]-=cantidad;
        console.log(cantidad);
    }
    return productos;
}

function Reservar(productos,reserva,listaReservas,cantidad)
{
    for(let producto of productos)
    {
        if(CompararNombresProductos(producto,reserva))
        {
            if(typeof(producto) == "object"){
                let nuevo = new Producto(producto.nombre, producto.descripcion,producto.precio,producto.cantidad,producto.categoria);
                let reserva = new Reserva(nuevo,cantidad);
                if(validarReserva(reserva,nuevo)){
                    listaReservas.push(reserva);
                }
            }
            else{
                listaReservas.push(producto);
            }
        }
    }
    return listaReservas;
}

function MostrarListaReservas(reservas){
    return reservas;
}

function MostrarMenu(lista)
{
    for(let i=0;i<lista.length;i++)
    {
        lista[i].ActualizarDisponibilidad();
        if(lista[i].disponible===false)
        {
            lista.splice(i,1);
        }
    }
    return lista;
}

function MostrarPorCategoria(categoria,lista)
{
    let listaCat=[];

    for(let producto of lista)
    {
        if(producto.categoria===categoria)
        {
            listaCat.push(producto);
        }
        if(categoria==="todos")
        {
            listaCat.push(producto);
        }
    }
    return listaCat;
}


function CrearProducto(nombre, descripcion, precio, cantidad,categoria){
    return new Producto(nombre, descripcion, precio, cantidad,categoria);
}
function InsertarProducto(producto)
{
    listaProductos.push(producto);
}

function getListaProductos(){
    listaProductos=MostrarMenu(listaProductos);
    return listaProductos;
}

function getListaProductosReservas(){
    return Reservas;
}

function CompararNombresProductos(producto1, producto2){
    if(typeof(producto1) == "string" && typeof(producto2) == "string"){
        return producto1 == producto2;    
    }
    else if(typeof(producto1) == "object" && typeof(producto2) == "object"){
        return producto1.nombre == producto2.nombre;
    }
    
}
function eliminarProducto(nombreProducto,listaProductos) {
    for (let i = 0; i < listaProductos.length; i++) {
      if (listaProductos[i].nombre === nombreProducto) {
        listaProductos.splice(i, 1);
        return listaProductos;
      }
    }
}


function editarProducto(nombre, descripcion, precio, cantidad, categoria, producto){
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.precio = precio;
    producto.cantidad = cantidad;
    producto.categoria = categoria;
    return producto;
}

module.exports = { Reservar, MostrarMenu,MostrarListaReservas, CrearProducto, InsertarProducto, getListaProductos, getListaProductosReservas,  CompararNombresProductos,editarProducto,eliminarProducto,ActualizarMenuCantidadProductoXReserva,ActualizarMenuCantidadProductoXReservaEliminado,MostrarPorCategoria,VerificarCampos,ActualizarCantidadMenu};
