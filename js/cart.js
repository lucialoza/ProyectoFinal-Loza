const contenedor = document.getElementById("container-productos")


function mostrarProductosEnCarrito(){
    contenedor.innerHTML = "" //para que cuando se muestran los vinos (para cuando se actualice el carrito), se borre todo lo que veiamos antes
    const productos = JSON.parse(localStorage.getItem("carrito"))
    
    if (productos && productos.length > 0) { // me aseguro que haya algún producto en el carrito antes de que pase lo siguiente.
        productos.forEach(producto => {
            const nuevoVino = document.createElement("div")
            nuevoVino.classList ="card2"
            nuevoVino.innerHTML += `
                <img src=${producto.imagen}>
                <h2>${producto.nombre}</h2>
                <p>$${producto.precio}</p>
                <div>
                    <button class="restar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="sumar">+</button>
                </div>
            `
            // Agrego el nuevo producto al contenedor    
            contenedor.appendChild(nuevoVino)
        })   
    }  
    
    // Muestro Precio Total del Carrito y opciones de terminar compra o cancelarla
    contenedor.innerHTML += `
        <div class="terminar-compra">
            <h3>Total: $${calcularTotal()}  </h3>
            <button id="comprar">Terminar Compra</button>
            <button id="cancelar">Cancelar Compra</button>
        </div>
    `
    actualizarNumeroCarrito()
}

// Llamo a la función para mostrar los productos en el carrito
mostrarProductosEnCarrito()

// Evento para los botones
contenedor.addEventListener("click", (event) => {
    if (event.target.classList.contains("restar")) {
        const productoNombre = event.target.closest(".card2").querySelector("h2").textContent;
        const producto = obtenerProductoPorNombre(productoNombre);
        restarAlCarrito(producto);
        mostrarProductosEnCarrito();
    } else if (event.target.classList.contains("sumar")) {
        const productoNombre = event.target.closest(".card2").querySelector("h2").textContent;
        const producto = obtenerProductoPorNombre(productoNombre);
        agregarAlCarrito(producto);
        mostrarProductosEnCarrito();
    } else if (event.target.id === "cancelar") {
        limpiarCarrito();
        Swal.fire({
            icon: "error",
            title: "Su compra fue cancelada con éxito"
        });
        mostrarProductosEnCarrito();
    } else if (event.target.id === "comprar") {
        limpiarCarrito();
        Swal.fire({
            icon: "success",
            title: "¡Compra realizada!",
            text: "Recibirá noticias en su correo con la información del envío"
        });
        mostrarProductosEnCarrito();
    }
});

function obtenerProductoPorNombre(nombre) {
    const productos = JSON.parse(localStorage.getItem("carrito"));
    return productos.find(producto => producto.nombre === nombre);
}


// function calcular Precio Total del Carrito
function calcularTotal() {
    const productos = JSON.parse(localStorage.getItem("carrito"))
    let total = 0;
    for (const producto of productos) {
        total += producto.precio * producto.cantidad;
    }
    return total;
}


function limpiarCarrito(){
    localStorage.removeItem('carrito')
    actualizarNumeroCarrito()
}


