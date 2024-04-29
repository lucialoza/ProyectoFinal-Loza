// Agregar al Carrito


function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem('carrito'))|| [] // convierto el string en array
    console.log(memoria)
    let cuenta = 0
    if(!memoria){
        // Si no hay productos en el carrito, agregamos el primero
        const nuevoProducto = getNuevoProductoParaMemoria(producto)
        localStorage.setItem('carrito', JSON.stringify(nuevoProducto)) // convierto el array en string
        cuenta = 1
    } else{
        // Si ya hay productos en el carrito, actualizamos la cantidad o agregamos uno nuevo
        const indiceProducto = memoria.findIndex(vino => vino.id === producto.id)
        console.log(indiceProducto)
        const nuevaMemoria = memoria
        
        if(indiceProducto === -1){ // Si no lo encuentra en la memoria
            nuevaMemoria.push(getNuevoProductoParaMemoria(producto))
            cuenta = 1
        }else{ //si ya existe el producto
            nuevaMemoria[indiceProducto].cantidad ++
            cuenta = nuevaMemoria [indiceProducto].cantidad
        }
        localStorage.setItem('carrito', JSON.stringify(nuevaMemoria))
        return cuenta
    }
    actualizarNumeroCarrito()
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem('carrito'))
    const indiceProducto = memoria.findIndex(vino => vino.id === producto.id)
    if(memoria[indiceProducto].cantidad ===1){
        memoria.splice(indiceProducto,1)
    } else{
        memoria[indiceProducto].cantidad --;
    }
    localStorage.setItem("carrito", JSON.stringify(memoria))
    actualizarNumeroCarrito()
}

// Toma un producto, le agrega cantidad 1 y lo devuelve
function getNuevoProductoParaMemoria(producto){
    const nuevoProducto = producto
    nuevoProducto.cantidad = 1
    return nuevoProducto
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito")

function actualizarNumeroCarrito(){
    try{
        const memoria = JSON.parse(localStorage.getItem('carrito'))
        const cuenta = memoria.reduce((acumulador, valorDelArray)=> acumulador + valorDelArray.cantidad, 0)
        cuentaCarritoElement.innerText = cuenta
    }
    catch (error){
        console.error(error)
    }

}




actualizarNumeroCarrito()