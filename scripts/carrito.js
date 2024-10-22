function ingresar(boton_precionado) {
    const precioElement = boton_precionado.parentElement.querySelector('.price');
    const precio = precioElement ? parseFloat(precioElement.innerText.replace(/[^\d.-]/g, '')) : 0; // Convertir a número
    const imagen = boton_precionado.parentElement.querySelector('img').src;

    // Crear elementos del carrito
    const carrito = document.getElementById('carrito');
    const crearitem_carrito = document.createElement('div');
    crearitem_carrito.classList.add('item-carrito'); // Clase para el contenedor del item
    crearitem_carrito.style.display = 'flex'; // Flex para alinear los elementos

    const crearitem_precio = document.createElement('p');
    crearitem_precio.classList.add('item-precio'); // Clase para el precio
    const crear_imagen = document.createElement('img');
    crear_imagen.classList.add('item-imagen'); // Clase para la imagen
    crear_imagen.style.width = '50px'; // Ajustar tamaño
    crear_imagen.style.height = '50px'; // Ajustar tamaño

    const crearcanti = document.createElement('p');
    crearcanti.classList.add('item-cantidad'); // Clase para la cantidad
    crearcanti.innerText = 1;

    const agrgar = document.createElement('button');
    agrgar.innerText = "+";
    agrgar.classList.add('button-agregar'); // Clase para el botón de agregar cantidad

    const cerrar_item = document.createElement('button');
    cerrar_item.classList.add('cerrar-item'); // Clase para el botón de eliminar
    cerrar_item.innerText = "Eliminar";

    crearitem_precio.innerText = `Precio: $${precio.toFixed(2)}`; // Asegurarse de que el precio esté bien formateado
    crear_imagen.src = imagen;

    // Añadir elementos al carrito
    crearitem_carrito.appendChild(crear_imagen);
    crearitem_carrito.appendChild(crearcanti);
    crearitem_carrito.appendChild(crearitem_precio);
    crearitem_carrito.appendChild(agrgar);
    crearitem_carrito.appendChild(cerrar_item);
    
    carrito.appendChild(crearitem_carrito);

    // Configurar los eventos
    eliminar(cerrar_item);
    agregarMas(agrgar, crearcanti, crearitem_precio, precio); // Pasar los elementos necesarios
    total_carrito();
}

function eliminar(boton_eliminar) {
    boton_eliminar.addEventListener('click', (event) => {
        event.stopPropagation();
        boton_eliminar.parentElement.remove();  
        total_carrito();
    });
}

function agregarMas(agrgera, crearcanti, crearitem_precio, precio) {
    agrgera.addEventListener('click', (event) => {
        event.preventDefault(); 
        event.stopPropagation();
        crearcanti.innerText = parseInt(crearcanti.innerText) + 1; // Aumentar la cantidad
        crearitem_precio.innerText = `Precio: $${(precio * parseInt(crearcanti.innerText)).toFixed(2)}`; // Actualizar el precio
        total_carrito(); // Actualizar el total del carrito
    });
}

function total_carrito() {
    const carrito = document.getElementById('carrito');
    const totalvruni = carrito.querySelectorAll('.item-precio');
    const totales_array = Array.from(totalvruni);

    let suma = 0;
    totales_array.forEach(element => {
        const valor = parseFloat(element.innerText.replace(/[^0-9.]/g, ''));
        if (!isNaN(valor)) {
            suma += valor;
        }
    });

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    });

    const totalapagar = document.getElementById('total');
    totalapagar.innerText = `Total: ${formatter.format(suma)}`;
}

function irACar() {
    document.getElementById('car').scrollIntoView({ behavior: 'smooth' });
}
