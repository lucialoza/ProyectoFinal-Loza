const contenedor = document.getElementById("container-productos")


function mostrarTarjetasVinos(producto){
   
    const nuevoVino = document.createElement("div")
    nuevoVino.classList ="card"
    nuevoVino.innerHTML += `
        <img src=${producto.imagen}>
        <div class="texto-boton">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio}</p>
            <button>Agregar al carrito</button>
        </div>
        `
    contenedor.appendChild(nuevoVino)
    nuevoVino.getElementsByTagName('button')[0].addEventListener("click", ()=>{
        agregarAlCarrito(producto)
        Swal.fire({
            text: `¡Su producto "${producto.nombre}" se agregó correctamente!`,
            icon: "success",
            width: "350px"
        });
        actualizarNumeroCarrito()
    })
    
}



fetch("../info.json")
.then(datos => {
    if (!datos.ok){ // Por si tenemos un error en el backend, por si al imprimirlo por consola los datos apareciera ok: false
        throw new Error("Error al traer los datos")
    }else{
     return datos.json()
    }  
})
.then(productos => {
    productos.vinos.forEach(producto =>{ // pongo .vinos porque en info.json llamé a todos los productos vinos
        mostrarTarjetasVinos(producto)
    })

})

// Separo por Categorías

const listaDeCategorias = document.getElementsByClassName("list")
const arrayDeListaDeCategorias = Array.from (listaDeCategorias)// Como listaDeCategorias es un HTMLCollection si lo imprimo por consola, entonces lo convierto en array.

fetch("../info.json")
.then(datos => {
    if (!datos.ok){ // Por si tenemos un error en el backend, por si al imprimirlo por consola los datos apareciera ok: false
        throw new Error("Error al traer los datos")
    }else{
     return datos.json()
    }  
})
.then(productos =>{
    arrayDeListaDeCategorias.forEach (list => {
        list.addEventListener ("click", (e) => {
            let categoria = e.target.innerText // e.target hace referencia al nodo al cual estoy anclando este evento.

            const VinosFiltrados = productos.vinos.filter((producto) =>{
                return producto.categoria.toUpperCase() == categoria.toUpperCase()
            })
            contenedor.innerHTML = "" // lo limpio para que no se acumulen con los vinos que estaban antes
            VinosFiltrados.forEach((producto)=>{
                mostrarTarjetasVinos(producto)
            })
        }) 
    })
})



