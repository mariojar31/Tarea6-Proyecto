const listProducts = document.getElementById('productsList');
const head = document.getElementById('productHead')
const url = new URL(location.href);
const categ = url.searchParams.get('cat');
const cap = categ.charAt(0).toUpperCase()+categ.slice(1);
head.innerText= cap 
console.log(categ)
<<<<<<< HEAD

const fetchJSON= async()=>{
  
  let products=JSON.parse(localStorage.getItem('productos'))
  if(products==null){
    const response = await fetch('./db/products.json');
    const data = await response.json();
    return data.productos
  }else{
    return products
  }
  
}

const fetchProductsCat = async(category)=>{
    const products = await fetchJSON()

    products.map(cat=>{
      if(cat.categoria==category){
        console.log(cat)
        cat.items.map(item=>{
          
            const productoP = document.createElement('div');
  
            productoP.innerHTML=`<div class="item mx-3 ">
                                  <img src="${item.fotografia}">
                                  <div class="title">${item.nombre}</div>
                                  <div class="price">Precio: $${item.precio.toLocaleString('de-DE')}</div>
=======


const fetchProductsCat=(categoria=>{
  let infolocal=JSON.parse(localStorage.getItem('productos'))
    infolocal.forEach(element => {
        if(element.categoria==categoria){
            element.items.forEach(elemento=>{
              let elementoCreado= document.createElement('div')
                elementoCreado.innerHTML=`<div class="item mx-3 ">
                                  <img src="${elemento.fotografia}">
                                  <div class="title">${elemento.nombre}</div>
                                  <div class="price">Precio: $${elemento.precio.toLocaleString('de-DE')}</div>
>>>>>>> 14f02499a7224194bb2b12b88c21bfd711285bfe
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
              listProducts.appendChild(elementoCreado)
              
     
            })

        }
      });
    
})



fetchProductsCat(categ);