//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const productosNuevos = document.querySelector("#productos-nuevos");
const productosDestacados = document.querySelector("#productos-destacados");
const productosDiscontinuados = document.querySelector("#productos-discontinuados");
const btncompletarCompra = $('#completar-compra').on("click", completarCompra);
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  //Cuando Agregas un Producto presionando Comprar
  productosNuevos.addEventListener("click", agregarProducto);
  productosDestacados.addEventListener("click", agregarProducto);
  productosDiscontinuados.addEventListener("click", agregarProducto);
}

function completarCompra(){
  console.log('escribiendo..');
}
//Elimina productos
carrito.addEventListener("click", eliminarProducto);

//Muestra los productos de LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carritoHTML();
});

//Vaciar el Carrito Btn
vaciarCarritoBtn.addEventListener("click", () => {
  articulosCarrito = []; //Resetear el arreglo
  localStorage.removeItem("carrito");
  limpiarHTML(); //Redibujamos el HTML
});

//Funciones

function agregarProducto(e) {
  e.preventDefault();
  Swal.fire({
    text: "Producto Agregado Correctamente",
    icon: "success",
  });
  if (e.target.classList.contains("agregar-carrito")) {
    const button = e.target;
    const item = button.closest(".card");

    leerDatosProducto(item);
  }
}

//Eliminar Productoa
function eliminarProducto(e) {
  //Me aseguro de presionar donde la clase borrar-producto
  if (e.target.classList.contains("borrar-producto")) {
    //Guardo el valor del atributo data-id
    const productId = e.target.getAttribute("data-id");

    //Eliminar del Arreglo por el data-id
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productId
    );
    Swal.fire({
      text: "Producto Eliminado con Exito",
      icon: "info",
    });
    //Vuelvo a dibujar el carrito con el nuevo arreglo
    carritoHTML();
  }
}

//Lee los datos
function leerDatosProducto(producto) {
  //Creo objeto con la informacion del producto seleccionado
  const infoProducto = {
    imagen: producto.querySelector("img").src,
    descripcion: producto.querySelector(".card-title").textContent,
    precio: producto.querySelector(".item-price").textContent,
    id: producto.querySelector("input").getAttribute("data-id"),
    cantidad: 1,
  };

  //Reviso si existe ya el producto en el carrito
  const existe = articulosCarrito.some(
    (producto) => producto.id === infoProducto.id
  );
  if (existe) {
    //Actualizo la cantidad
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === infoProducto.id) {
        producto.cantidad++;
        return producto; //Retorna el objeto actualizado
      } else {
        return producto; //Retorna los objetos no duplicados
      }
    });
    articulosCarrito = [...productos];
  } else {
    //Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoProducto];
  }
  carritoHTML();
}

//Muestra el carrito en el HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  articulosCarrito.forEach((producto) => {
    const { imagen, descripcion, precio, cantidad, id } = producto;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
        ${descripcion}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href="#" class="btn btn-danger borrar-producto" data-id="${id}"> x</a>
        </td>
      `;
    //Agrega el row al tbody
    contenedorCarrito.appendChild(row);
  });

  guardarStorage();
}

//Funciones de LocalStorage
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

//Eliminar Productos del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

//TimerCountDown
$("#example").countdown({
  date: "04/01/2021 00:00:00",
  offset: -3,
  day: "Day",
  days: "Dias",
  hour: "Hora",
  hours: "Horas",
  minute: "Minuto",
  minutes: "Minutos",
  second: "Segundo",
  seconds: "Segundos",
});

//PreLoader
function counter() {
  var count = setInterval(function () {
    var c = parseInt($(".counter").text());
    $(".counter").text((++c).toString());
    if (c == 100) {
      clearInterval(count);
      $(".counter").addClass("hide");
      $(".preloader").addClass("active");
    }
  }, 60);
}

counter();

//Ajax
let xhttp = new XMLHttpRequest();
xhttp.open(
  "GET",
  "https://randomuser.me/api/?results=4&nat=ES&inc=name,email,picture"
);
xhttp.send();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    let datosx = JSON.parse(this.responseText);
    const datos = datosx.results;
    pintarTestimonios(datos);
  }

  function pintarTestimonios(datos) {
    const testimonios = document.querySelector("#testimonios");
    for (let item of datos) {
      testimonios.innerHTML += `
      <div class="col-3 justify-content-between>
    <div class="card" >
  <img class="card-img-top" src=${item.picture.thumbnail} style="width:50%" class="img-thumbnail">
  <div class="card-body">
    <h5 class="card-title">${item.name.first}  ${item.name.last}</h5>
    <q class="card-text font-italic">The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</q>
    <strong class="py5">${item.email}</strong>
  </div>
</div>    
</div>
    `;
    }
  }
};
