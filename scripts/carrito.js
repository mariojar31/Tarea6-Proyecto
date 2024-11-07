function ingresar(boton_precionado) {    
    const precioElement = boton_precionado.parentElement.querySelector('.price');
    const precio = precioElement ? parseFloat(precioElement.innerText.replace(/[^\d.-]/g, '')) : 0;
    const imagen = boton_precionado.parentElement.querySelector('img').src;

    const carrito = document.getElementById('carrito');
    const crearitem_carrito = document.createElement('div');
    crearitem_carrito.classList.add('item-carrito');
    crearitem_carrito.style.display = 'flex';

    const crearitem_precio = document.createElement('p');
    crearitem_precio.classList.add('item-precio');
    const crear_imagen = document.createElement('img');
    crear_imagen.classList.add('item-imagen');
    crear_imagen.style.width = '50px';
    crear_imagen.style.height = '50px';

    const crearcanti = document.createElement('p');
    crearcanti.classList.add('item-cantidad');
    crearcanti.innerText = 1;

    const disminuir = document.createElement('button');
    disminuir.innerText = "-";
    disminuir.classList.add('button-disminuir');

    const agrgar = document.createElement('button');
    agrgar.innerText = "+";
    agrgar.classList.add('button-agregar');

    const cerrar_item = document.createElement('button');
    cerrar_item.classList.add('cerrar-item');
    cerrar_item.innerText = "Eliminar";

    crearitem_precio.innerText = `Precio: $${precio.toFixed(2)}`;
    crear_imagen.src = imagen;

    // Añadir elementos al carrito en el orden requerido
    crearitem_carrito.appendChild(crear_imagen); // Imagen del producto
    crearitem_carrito.appendChild(crearitem_precio); // Precio
    crearitem_carrito.appendChild(disminuir); 
    crearitem_carrito.appendChild(crearcanti); 
    crearitem_carrito.appendChild(agrgar); 
    crearitem_carrito.appendChild(cerrar_item); // Botón de eliminar

    carrito.appendChild(crearitem_carrito);
    $('#successModal').modal('show');

    setTimeout(function() {
        $('#successModal').modal('hide');
    }, 2000);

    eliminar(cerrar_item);
    agregarMas(agrgar, crearcanti, crearitem_precio, precio);
    quitar(disminuir, crearcanti, crearitem_precio, precio);

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
        crearcanti.innerText = parseInt(crearcanti.innerText) + 1;
        crearitem_precio.innerText = `Precio: $${(precio * parseInt(crearcanti.innerText)).toFixed(2)}`;
        total_carrito();
    });
}

function quitar(disminuir, crearcanti, crearitem_precio, precio) {
    disminuir.addEventListener('click', (event) => {
        event.preventDefault(); 
        event.stopPropagation();
        const cantidad = parseInt(crearcanti.innerText);
        if (cantidad > 1) { // Asegurar que la cantidad no sea menor que 1
            crearcanti.innerText = cantidad - 1;
            crearitem_precio.innerText = `Precio: $${(precio * parseInt(crearcanti.innerText)).toFixed(2)}`;
            total_carrito();
        }
    });
}

function total_carrito() {
    const carrito = document.getElementById('carrito');
    const totalvruni = carrito.querySelectorAll('.item-precio');
    const totales_array = Array.from(totalvruni);
    const totalProducts = carrito.querySelectorAll('.item-cantidad');
    const totalProductsArray = Array.from(totalProducts);

    let suma = 0;
    let counter = 0;
    totales_array.forEach(element => {
        const valor = parseFloat(element.innerText.replace(/[^0-9.]/g, ''));
        if (!isNaN(valor)) {
            suma += valor;
        }
    });

    totalProductsArray.forEach(product => {
        counter += parseInt(product.innerText);
    });

    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    });

    const emptyCart = document.getElementById('emptyCart');
    if (counter > 0) {
        emptyCart.classList.remove('d-block');
        emptyCart.classList.add('d-none');
    } else {
        emptyCart.classList.remove('d-none');
        emptyCart.classList.add('d-block');
    }

    const totalapagar = document.getElementById('total');
    totalapagar.innerText = `Total: ${formatter.format(suma)}`;

    const canTotal = document.getElementById('canTotal');
    canTotal.innerText = `Total Productos: ${counter}`;
}

function irACar() {
    document.getElementById('car').scrollIntoView({ behavior: 'smooth' });
}