// Objeto de producto

function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

// Carrito de compras

var carrito = [];

// Funcion para agregar un producto al carrito

function agregarProducto() {
  var nombre = prompt("Ingrese el nombre del producto:");
  var precio = parseFloat(prompt("Ingrese el precio del producto:"));

  var producto = new Producto(nombre, precio);
  carrito.push(producto);

  alert("Producto agregado al carrito.");
}

// Funcion que muestra el contenido del carrito

function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito esta vacio.");
  } else {
    var contenido = "Carrito de compras:\n";

    carrito.forEach(function (producto) {
      contenido +=
        "Nombre: " + producto.nombre + ", Precio: " + producto.precio + "\n";
    });

    alert(contenido);
  }
}

// Funcion para buscar un producto en el carrito por nombre

function buscarProducto() {
  var nombreBusqueda = prompt("Ingrese el nombre del producto a buscar:");
  var productoEncontrado = carrito.find(function (producto) {
    return producto.nombre === nombreBusqueda;
  });

  if (productoEncontrado) {
    alert(
      "Producto encontrado:\nNombre: " +
        productoEncontrado.nombre +
        ", Precio: " +
        productoEncontrado.precio
    );
  } else {
    alert("No se encontró ningún producto con ese nombre en el carrito.");
  }
}

// Funcion para filtrar productos por precio

function filtrarProductos() {
  var precioLimite = parseFloat(
    prompt("Ingrese el precio máximo para filtrar productos:")
  );
  var productosFiltrados = carrito.filter(function (producto) {
    return producto.precio <= precioLimite;
  });

  if (productosFiltrados.length === 0) {
    alert(
      "No hay productos en el carrito que cumplan con el precio máximo especificado."
    );
  } else {
    var contenido = "Productos filtrados:\n";

    productosFiltrados.forEach(function (producto) {
      contenido +=
        "Nombre: " + producto.nombre + ", Precio: " + producto.precio + "\n";
    });

    alert(contenido);
  }
}

// Opciones del programa

while (true) {
  var opcion = prompt(
    "Seleccione una opción:\n1. Agregar producto\n2. Mostrar carrito\n3. Buscar producto\n4. Filtrar productos por precio\n5. Salir"
  );

  switch (opcion) {
    case "1":
      agregarProducto();
      break;
    case "2":
      mostrarCarrito();
      break;
    case "3":
      buscarProducto();
      break;
    case "4":
      filtrarProductos();
      break;
    case "5":
      alert("Gracias por utilizar el carrito de compras.");
      console.log("Contenido final del carrito:", carrito);
      break;
    default:
      alert("Opción inválida. Por favor, seleccione una opción válida.");
  }

  if (opcion === "5") {
    break;
  }
}
