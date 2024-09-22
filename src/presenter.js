import * as Cafeteria from "./cafeteria.js"

const div2 = document.querySelector("#menu-div");
const div3 = document.querySelector("#reservas-div");
const divCateg = document.querySelector("#div-categorias");
const selectCategoria = document.querySelector("#select-categoria");
const formAgregarProducto = document.querySelector("#agregarProducto-form");
const adminButton = document.getElementById("adminButton");
const adminDiv = document.getElementById("admin");
const cliButton = document.getElementById("clienteButton");
const clienteDiv = document.getElementById("cliente");
const nombre = document.querySelector("#nombre");
const descripcion = document.querySelector("#descripcion");
const precio = document.querySelector("#precio");
const cantidad = document.querySelector("#cantidad");
const categoria = document.querySelector("#categoria");
const form = document.getElementById("editForm");
const nombreInput = document.getElementById("editNombre");
const descripcionInput = document.getElementById("editDescripcion");
const precioInput = document.getElementById("editPrecio");
const cantidadInput = document.getElementById("editCantidad");
const cateogiraInput = document.getElementById("editCategoria");

let lista=[];
let ListaReservas=[];

adminDiv.style.display = "none";

adminButton.addEventListener("click", function() {
  adminDiv.style.display = "block";
  clienteDiv.style.display = "none";

  const adminButtons = document.getElementsByClassName("admin-button");
  for (const element of adminButtons) {
    element.style.display = "block";
  }
  const clientButtons = document.getElementsByClassName("client-button");
  for (const element of clientButtons) {
    element.style.display = "none";
  }
});

cliButton.addEventListener("click", function() {
  adminDiv.style.display = "none";
  clienteDiv.style.display ="block";
  //Ocultar botones de editar y eliminar
  const adminButtons = document.getElementsByClassName("admin-button");
  for (const element of adminButtons) {
    element.style.display = "none";
  }

});


formAgregarProducto.addEventListener("submit", (event) => {
    event.preventDefault();
    const producto = Cafeteria.CrearProducto(nombre.value, descripcion.value, parseFloat(precio.value), cantidad.value,categoria.value);
    console.log(Cafeteria.VerificarCampos(nombre.value, descripcion.value, parseFloat(precio.value), cantidad.value,categoria.value));
    if(!Cafeteria.VerificarCampos(nombre.value, descripcion.value, parseFloat(precio.value), cantidad.value,categoria.value)) return;
    Cafeteria.InsertarProducto(producto);
    renderizarProductos();
    formAgregarProducto.reset();
});

selectCategoria.addEventListener("change", function() {
  let categoriaSeleccionada = selectCategoria.value;
  let listaFiltrada =Cafeteria.MostrarPorCategoria(categoriaSeleccionada, lista);
  MostrarPorCategoriaProductos(listaFiltrada);
});

function MostrarPorCategoriaProductos(listafiltrada){
let html='<h2>categorias</h2>';

listafiltrada.forEach(reserva=>{
  html += `
          <div>
            <h3>Nombre: ${reserva.producto.nombre}</h3>
            <p>Descripción: ${reserva.producto.descripcion}</p>
            <p>Precio: ${reserva.producto.precio}</p>
            <p>Cantidad: ${reserva.cantidad}</p>
            <p>Categoria: ${reserva.producto.categoria}</p>
            <button class="btn_reservar">Reservar</button>
            </div>
            `;
    });
    divCateg.innerHTML=html;
}

function renderizarProductos() {
    let html = '<h1>MENÚ CAFETERIA CATO</h1>';

    let htmlReservas = '<h1>Mis RESERVAS</h1>';
    lista=Cafeteria.getListaProductos();
    lista.forEach((producto, i) => {
        html += `
          <div>
            <h3>Nombre: ${producto.nombre}</h3>
            <p>Descripción: ${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Categoria: ${producto.categoria}</p>
            <button class="btn_reservar client-button">Reservar</button>
            <button class="btn_editar admin-button" data-index="${i}">Editar</button>
            <button class="btn_eliminar admin-button">Eliminar</button>
          </div>
        `;
    });

    ListaReservas.forEach(reserva => {
      htmlReservas += `
        <div>
            <h3>Nombre: ${reserva.producto.nombre}</h3>
            <p>Descripción: ${reserva.producto.descripcion}</p>
            <p>Precio: ${reserva.producto.precio}</p>
            <p>Cantidad: ${reserva.cantidad}</p>
            <p>Categoria: ${reserva.producto.categoria}</p>
            <button class="btn_eliminarReserva">Eliminar</button>
            <button class="btn_confirmarReserva">Confirmar</button>
          </div>
        `;
    });


      div2.innerHTML = html;
      div3.innerHTML = htmlReservas;
      const btnsReservar = document.getElementsByClassName("btn_reservar");
      const btnsEliminar = document.getElementsByClassName("btn_eliminar");
      const btnsEliminarReserva = document.getElementsByClassName("btn_eliminarReserva");
      const btnsConfirmar = document.getElementsByClassName("btn_confirmarReserva");
      for (let i = 0; i < btnsEliminar.length; i++) {
      btnsEliminar[i].addEventListener("click", function () {
        Cafeteria.eliminarProducto(lista[i].nombre,lista);
        renderizarProductos();
        alert('se elimino correctamente');
        });
      }
      for (let i = 0; i < btnsReservar.length; i++) {
        btnsReservar[i].addEventListener("click", function () {
          let cantidad = prompt("Ingrese la cantidad a reservar:");
          if (cantidad !== null && cantidad !== "") {
            cantidad = parseInt(cantidad);
          }
        ListaReservas = Cafeteria.getListaProductosReservas();
        ListaReservas = Cafeteria.Reservar(lista, lista[i], ListaReservas,cantidad);
        
        renderizarProductos();
        });
      }
      for (let i = 0; i < btnsConfirmar.length; i++) {
        btnsConfirmar[i].addEventListener("click", function () {
          const indiceEncontrado = lista.findIndex((producto) => producto.nombre === ListaReservas[i].producto.nombre);
          lista = Cafeteria.ActualizarMenuCantidadProductoXReserva(lista, indiceEncontrado, ListaReservas[i].cantidad);
          
          renderizarProductos();
        });
        }
      for (let i = 0; i <  btnsEliminarReserva.length; i++) {
        btnsEliminarReserva[i].addEventListener("click", function () {
        ListaReservas = Cafeteria.eliminarProducto(ListaReservas[i].nombre,ListaReservas);
        alert('se elimino la reserva reservo correctamente');
        renderizarProductos();
        });
      }
      //const btnsEditar = document.getElementsByClassName("btn_editar");
    const btnsEditar = document.getElementsByClassName("btn_editar");
    for (const element of btnsEditar) {
    element.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      mostrarFormularioEdicion(index);
    });
  
  }
}

function mostrarFormularioEdicion(index) {


  const producto = lista[index];
  nombreInput.value = producto.nombre;
  descripcionInput.value = producto.descripcion;
  precioInput.value = producto.precio;
  cantidadInput.value = producto.cantidad;
  cateogiraInput.value = producto.categoria;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nuevoNombre = nombreInput.value;
    const nuevaDescripcion = descripcionInput.value;
    const nuevoPrecio = parseFloat(precioInput.value);
    const nuevaCantidad = parseInt(cantidadInput.value);
    const nuevaCategoria = cateogiraInput.value;

    if (nuevoNombre && nuevaDescripcion && !isNaN(nuevoPrecio) && !isNaN(nuevaCantidad)) {
      lista[index] = Cafeteria.editarProducto(nuevoNombre, nuevaDescripcion, nuevoPrecio,nuevaCantidad, nuevaCategoria, lista[index]);
      renderizarProductos();
      alert('Producto editado correctamente');
      ocultarFormularioEdicion();
    } else {
      alert('Todos los campos deben estar llenos y el precio y la cantidad deben ser números');
    }
  });

  document.getElementById("editarForm").style.display = "block";
}

function ocultarFormularioEdicion() {
  document.getElementById("editForm").reset();
  document.getElementById("editarForm").style.display = "none";
}