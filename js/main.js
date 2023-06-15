document.addEventListener("DOMContentLoaded", function () {
  let listaProductos = document.getElementById("lista-productos");
  let listaCarrito = document.getElementById("lista-carrito");
  let totalCarrito = document.getElementById("total");
  let vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  let agregarManualmenteBtn = document.getElementById("agregar-manualmente");
  let nombreProductoInput = document.getElementById("nombre-producto");
  let precioProductoInput = document.getElementById("precio-producto");

  let carrito = [];

  // Cargar productos disponibles desde JSON local

  function cargarProductos() {
    fetch("./assets/data/productos.json")
      .then(response => response.json())
      .then(data => {
        let listaProductos = document.getElementById("lista-productos");

        data.forEach(function (producto) {
          let card = document.createElement("div");
          card.classList.add("col");

          let cardBody = document.createElement("div");
          cardBody.classList.add("card", "h-100");

          let img = document.createElement("img");
          img.src = producto.imagen;
          img.alt = producto.nombre;
          img.classList.add("card-img-top");

          let cardContent = document.createElement("div");
          cardContent.classList.add("card-body");

          let nombre = document.createElement("h5");
          nombre.classList.add("card-title");
          nombre.textContent = producto.nombre;

          let precio = document.createElement("p");
          precio.classList.add("card-text");
          precio.textContent = "$" + producto.precio.toFixed(2);

          let agregarBtn = document.createElement("button");
          agregarBtn.classList.add("btn", "btn-success");
          agregarBtn.textContent = "Agregar";

          cardContent.appendChild(nombre);
          cardContent.appendChild(precio);
          cardContent.appendChild(agregarBtn);

          cardBody.appendChild(img);
          cardBody.appendChild(cardContent);

          card.appendChild(cardBody);

          listaProductos.appendChild(card);

          // Evento click al botón "Agregar"
          agregarBtn.addEventListener("click", function () {
            carrito.push(producto);
            mostrarCarrito();
            Swal.fire({
              title: 'Producto agregado',
              text: 'El producto ha sido agregado al carrito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          });
          
        });
      })
      .catch(error => {
        console.log("Error al cargar los productos:", error);
      });
  }

  cargarProductos();

  // Evento click al botón "Vaciar Carrito"
  vaciarCarritoBtn.addEventListener("click", function () {
    carrito = [];
    mostrarCarrito();
    Swal.fire({
      title: 'Carrito vaciado',
      text: 'El carrito ha sido vaciado',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  });

  // Evento click al botón "Agregar Manualmente"
  agregarManualmenteBtn.addEventListener("click", function () {
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
      Swal.fire({
        title: 'Producto agregado',
        text: 'El producto ha sido agregado al carrito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

      // Limpiar las entradas después de agregar el producto
      nombreProductoInput.value = "";
      precioProductoInput.value = "";
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingresa el nombre y precio del producto',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  });

// Mostrar el carrito de compras
function mostrarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach(function (producto) {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
      <button class="quitar-carrito" data-id="${producto.id}">Quitar</button>
    `;

    let agregarBtn = li.querySelector(".quitar-carrito");
    agregarBtn.classList.add("btn", "btn-danger", "mb-2", "ms-4", "mt-2", "btn-sm");

    agregarBtn.addEventListener("click", function () {
      let id = producto.id;
      carrito = carrito.filter(function (prod) {
        return prod.id !== id;
      });
      mostrarCarrito();
      Swal.fire({
        title: 'Producto eliminado',
        text: 'El producto ha sido eliminado del carrito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    });

    listaCarrito.appendChild(li);
  });

  actualizarTotal();
}


  // Actualizar el total del carrito
  function actualizarTotal() {
    let total = carrito.reduce(function (sum, producto) {
      return sum + producto.precio;
    }, 0);
    totalCarrito.textContent = "Total: $" + total.toFixed(2);
  }
});