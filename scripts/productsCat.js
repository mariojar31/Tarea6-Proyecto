const listProducts = document.getElementById('productsList');
const head = document.getElementById('productHead')
const url = new URL(location.href);
const categ = url.searchParams.get('cat');
const cap = categ.charAt(0).toUpperCase()+categ.slice(1);
head.innerText= cap 

const fetchProductsCat = async(category)=>{
    const response = await fetch('./db/products.json');
    const data = await response.json();

    data.productos.map(cat=>{
      if(cat.categoria.toLowerCase()==category){
        console.log(cat)
        cat.items.map(item=>{
          
            const productoP = document.createElement('div');
  
            productoP.innerHTML=`<div class="item mx-3 ">
                                  <img src="${item.fotografia}">
                                  <div class="title">${item.nombre}</div>
                                  <div class="price">Precio: $${item.precio.toLocaleString('de-DE')}</div>
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
    
            listProducts.append(productoP)
  
      })
      
      }
    })
  
}

fetchProductsCat(categ);