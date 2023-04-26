const productos = {
    "reloj inteligente": 1550,
    "auricular inalambrico": 600,    
    "mochila": 400,
    "bolso": 380,
    "tablet": 900,
    "juego de mesa": 300,
    "silla gamer": 1200,
  };
  
  function seleccionarProductos() {
    const textoFijo = document.getElementById("texto-fijo");
    textoFijo.style.display = "block";
    
    const seleccion = [];
    while (true) {
      const producto = prompt("Ingrese el nombre de un producto (o escriba 'listo' para finalizar):");
      if (producto.toLowerCase() === "listo") {
        break;
      } else if (productos[producto]) {
        const cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto} que desea:`));
        seleccion.push({producto, cantidad});
      } else {
        alert("Producto no encontrado.");
      }
    }
  
    let costoTotal = 0;
    for (const seleccionItem of seleccion) {
      const {producto, cantidad} = seleccionItem;
      costoTotal += productos[producto] * cantidad;
    }
  
    alert(`El costo total es $${costoTotal}.`);
    textoFijo.style.display = "none";
  }