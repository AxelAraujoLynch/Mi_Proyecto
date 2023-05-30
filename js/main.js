document.addEventListener("DOMContentLoaded", function () {
  let listaProductos = document.getElementById("lista-productos");
  let listaCarrito = document.getElementById("lista-carrito");
  let totalCarrito = document.getElementById("total");
  let vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  let agregarManualmenteBtn = document.getElementById("agregar-manualmente");
  let nombreProductoInput = document.getElementById("nombre-producto");
  let precioProductoInput = document.getElementById("precio-producto");

  let carrito = [];

  // Cargar productos disponibles

  cargarProductos();

  // Evento click a los productos disponibles

  listaProductos.addEventListener("click", agregarProducto);

  // Evento click al boton "Vaciar Carrito"

  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

  // Evento click al boton "Agregar Manualmente"

  agregarManualmenteBtn.addEventListener("click", agregarManualmente);

  // Productos disponibles desde JSON

  function cargarProductos() {
    let productos = [
      { id: 1, nombre: "Smartphone Samsung Galaxy A51", precio: 80.999 },
      { id: 2, nombre: "Laptop Lenovo", precio: 70.999 },
      { id: 3, nombre: "Televisor LED LG 43", precio: 50.0 },
      { id: 4, nombre: "Reloj inteligente Xiaomi", precio: 6.999 },
      { id: 5, nombre: "Cámara digital Canon EOS Rebel T7", precio: 73.999 },
      { id: 6, nombre: "Auriculares inalámbricos", precio: 35.999 },
      { id: 7, nombre: "Monitor de juego Zowie 24", precio: 65.999 },
      { id: 8, nombre: "Impresora multifunción HP", precio: 45.0 },
      {
        id: 9,
        nombre: "Consola de videojuegos PlayStation 5",
        precio: 150.999,
      },
      { id: 10, nombre: "Tableta Huawei MatePad T8", precio: 45.999 },
      { id: 11, nombre: "Robot aspirador Gadnic", precio: 200.5 },

      // Si es necesario agregar mas productos aca.....
    ];

    productos.forEach(function (producto) {
      let li = document.createElement("li");
      li.dataset.id = producto.id;
      li.dataset.nombre = producto.nombre;
      li.dataset.precio = producto.precio;

      li.innerHTML = `
        <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
        <button class="agregar-carrito">Agregar</button>
      `;

      let agregarBtn = li.querySelector(".agregar-carrito");
      agregarBtn.classList.add(
        "btn",
        "btn-success",
        "mb-2",
        "ms-4",
        "mt-2",
        "btn-sm"
      );

      listaProductos.appendChild(li);
    });
  }

  // Agregar un producto al carrito

  function agregarProducto(e) {
    if (e.target.classList.contains("agregar-carrito")) {
      let producto = {
        id: e.target.parentNode.dataset.id,
        nombre: e.target.parentNode.dataset.nombre,
        precio: parseFloat(e.target.parentNode.dataset.precio),
      };

      carrito.push(producto);
      mostrarCarrito();
    }
  }

  // Muestra el carrito de compras

  function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach(function (producto) {
      let li = document.createElement("li");
      li.innerHTML = `
        <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
        <button class="quitar-carrito" data-id="${producto.id}">Quitar</button>
      `;

      let agregarBtn = li.querySelector(".quitar-carrito");
      agregarBtn.classList.add(
        "btn",
        "btn-danger",
        "mb-2",
        "ms-4",
        "mt-2",
        "btn-sm"
      );

      listaCarrito.appendChild(li);
    });

    actualizarTotal();

    // Evento click a los botones de quitar del carrito

    let botonesQuitar = document.getElementsByClassName("quitar-carrito");
    for (let i = 0; i < botonesQuitar.length; i++) {
      botonesQuitar[i].addEventListener("click", quitarProducto);
    }
  }

  //  Total del carrito

  function actualizarTotal() {
    let total = carrito.reduce(function (sum, producto) {
      return sum + producto.precio;
    }, 0);
    totalCarrito.textContent = "Total: $" + total.toFixed(2);
  }

  // Vaciar el carrito de compras

  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }

  // Quitar un producto del carrito

  function quitarProducto(e) {
    let id = e.target.dataset.id;
    carrito = carrito.filter(function (producto) {
      return producto.id !== id;
    });
    mostrarCarrito();
  }

  // Agregar un producto manualmente

  function agregarManualmente() {
    let nombreProducto = nombreProductoInput.value;
    let precioProducto = parseFloat(precioProductoInput.value);

    if (nombreProducto && precioProducto) {
      let producto = {
        id: new Date().getTime().toString(),
        nombre: nombreProducto,
        precio: precioProducto,
      };

      carrito.push(producto);
      mostrarCarrito();

      // Limpiar la entrada despuess de agregar el producto
      nombreProductoInput.value = "";
      precioProductoInput.value = "";
    }
  }
});
