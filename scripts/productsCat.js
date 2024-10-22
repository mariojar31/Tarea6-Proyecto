const listProducts = document.getElementById('productsList');
const head = document.getElementById('productHead')
const url = new URL(location.href);
const categ = url.searchParams.get('cat');
const cap = categ.charAt(0).toUpperCase()+categ.slice(1);
head.innerText= cap 
console.log(categ)


const fetchProductsCat=async(categoria)=>{
  let infolocal=JSON.parse(localStorage.getItem('productos'))

  if(!infolocal){
    const response = await fetch("../db/products.json")
    const data = await response.json()
    infolocal = data.productos
    localStorage.setItem('productos',JSON.stringify(infolocal))
  }

    infolocal.forEach(element => {
        if(element.categoria==categoria){
            element.items.forEach(elemento=>{
              let elementoCreado= document.createElement('div')
                elementoCreado.innerHTML=`<div class="item mx-3 ">
                                  <img src="${elemento.fotografia}">
                                  <div class="title">${elemento.nombre}</div>
                                  <div class="price">Precio: $${elemento.precio.toLocaleString('de-DE')}</div>
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
              listProducts.appendChild(elementoCreado)
              
     
            })

        }
      });
    
}



fetchProductsCat(categ);