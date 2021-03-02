//Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");
let articulosCarrito = [];


$(document).ready(obtenerLocalStorage());



cargarEventListener();

function cargarEventListener() {
    //Cuando Agregas un Producto presionando Comprar
    listaProductos.addEventListener("click", agregarProducto);
}
//Elimina productos
carrito.addEventListener('click', eliminarProducto);

//Vaciar el Carrito Btn
vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = []; //Resetear el arreglo
    limpiarHTML(); //Redibujamos el HTML
})

//Funciones
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const button = e.target;
        const item = button.closest('.card');

        leerDatosProducto(item);
    }
}

//Eliminar Productoa
function eliminarProducto(e) {
    //Me aseguro de presionar donde la clase borrar-producto
    if (e.target.classList.contains('borrar-producto')) {
        //Guardo el valor del atributo data-id
        const productId = e.target.getAttribute('data-id');

        //Eliminar del Arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productId);
        //Vuelvo a dibujar el carrito con el nuevo arreglo
        carritoHTML(articulosCarrito);

    }
}

//Lee los datos
function leerDatosProducto(producto) {
    //Creo objeto con la informacion del producto seleccionado
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        descripcion: producto.querySelector('.card-title').textContent,
        precio: producto.querySelector('.item-price').textContent,
        id: producto.querySelector('input').getAttribute('data-id'),
        cantidad: 1
    }

    //Reviso si existe ya el producto en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        //Actualizo la cantidad
        const productos = articulosCarrito.map(producto => {
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
    gurdarLocalStorage(articulosCarrito);
    carritoHTML(articulosCarrito);
}

//Muestra el carrito en el HTML
function carritoHTML(carrito) {

    //Limpiar el HTML
    limpiarHTML();

    carrito.forEach(producto => {
        const { imagen, descripcion, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
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
    })
}

//Eliminar Productos del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



function gurdarLocalStorage(carrito) {
    localStorage.setItem('productos', JSON.stringify(carrito));
}

function obtenerLocalStorage() {
    if (localStorage.getItem('productos')) {
        let carrito = JSON.parse(localStorage.getItem('productos', ));
        carritoHTML(carrito);

    } else {
        console.log('Local Storage Vacio');
    }


}

//TimerCountDown
$('#example').countdown({
    date: '12/25/2021 00:00:00',
    offset: -3,
    day: 'Day',
    days: 'Dias',
    hour: 'Hora',
    hours: 'Horas',
    minute: 'Minuto',
    minutes: 'Minutos',
    second: 'Segundo',
    seconds: 'Segundos'
});

//PreLoader
function counter() {
    var count = setInterval(function() {
        var c = parseInt($('.counter').text());
        $('.counter').text((++c).toString());
        if (c == 100) {
            clearInterval(count);
            $('.counter').addClass('hide')
            $('.preloader').addClass('active')
        }
    }, 60)

}

counter()