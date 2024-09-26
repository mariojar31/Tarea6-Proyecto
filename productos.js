const divPagos = document.getElementById('producto');


const fetchProducts = async()=>{
    const response = await fetch('./db/products.json');
    const data = await response.json();
    const productos_Pagos = data.productos[0].items

    productos_Pagos.map(item=>{
        const productoP = document.createElement('div');

        productoP.innerHTML=`<div class="row row-cols-1 row-cols-md-3 g-4">
                    <div class="col">
                        <div class="card mb-3" style="max-width: 540px;">
                            <div class="row g-0">
                              <div class="col-md-4">
                                <img src="#" class="img-fluid rounded-start" alt="...">
                              </div>
                              <div class="col-md-8">
                                <div class="card-body">
                                  <h5 class="card-title">${item.nombre}</h5>
                                  <p class="card-text">${item.descripcion}</p>
                                  
                                  <p><b>Precio: </b><span>${item.precio}</span></p>
                                  
                                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>

                </div>`

        divPagos.append(productoP)

    })
}

fetchProducts();
