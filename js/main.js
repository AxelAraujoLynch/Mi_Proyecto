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
        data.forEach(function (producto) {
          let li = document.createElement("li");
          li.dataset.id = producto.id;
          li.dataset.nombre = producto.nombre;
          li.dataset.precio = producto.precio;

          li.innerHTML = `
            <span>${producto.nombre} - $${producto.precio.toFixed(2)}</span>
            <button class="agregar-carrito">Agregar</button>
          `;

          let agregarBtn = li.querySelector(".agregar-carrito");
          agregarBtn.classList.add("btn", "btn-success", "mb-2", "ms-4", "mt-2", "btn-sm");

          agregarBtn.addEventListener("click", function () {
            let producto = {
              id: li.dataset.id,
              nombre: li.dataset.nombre,
              precio: parseFloat(li.dataset.precio),
            };

            carrito.push(producto);
            mostrarCarrito();
            Swal.fire({
              title: 'Producto agregado',
              text: 'El producto ha sido agregado al carrito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          });

          listaProductos.appendChild(li);
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
        let id = li.querySelector(".quitar-carrito").dataset.id;
        carrito = carrito.filter(function (producto) {
          return producto.id !== id;
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
