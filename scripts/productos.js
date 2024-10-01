const divPagos = document.getElementById('pagos');
const divCafeteria = document.getElementById('cafeteria');
const divPapeleria = document.getElementById('papeleria');
// const swiperContainer = document.querySelector('swiper-container');
const swiperContainers = document.querySelectorAll('swiper-container');


const ajustarSwiper = (width)=>{
  if(width<640){
    swiperContainers.forEach(swiperContainer=>{
      swiperContainer.setAttribute('slides-per-view',1)
      swiperContainer.setAttribute('space-between',10)
    })
  }
  if(width>=640 && width<768){
    swiperContainers.forEach(swiperContainer=>{
      swiperContainer.setAttribute('slides-per-view',2)
      swiperContainer.setAttribute('space-between',20)
    })
  }
  if(width>=768 && width<1000){
    swiperContainers.forEach(swiperContainer=>{
      swiperContainer.setAttribute('slides-per-view',3)
      swiperContainer.setAttribute('space-between',30)
    })
  }

  if(width>1000){
    swiperContainers.forEach(swiperContainer=>{
      swiperContainer.setAttribute('slides-per-view',4)
      swiperContainer.setAttribute('space-between',40)
    })
  }

}

ajustarSwiper(window.screen.width)

addEventListener('resize',()=>{
  var width = innerWidth;

  ajustarSwiper(width)
  
})

const fetchProducts = async()=>{
    const response = await fetch('./db/products.json');
    const data = await response.json();

    data.productos.map(cat=>{
      if(cat.categoria=='Pagos'){
        cat.items.map(item=>{
          if(item.top){
            const productoP = document.createElement('swiper-slide');
  
            productoP.innerHTML=`<div class="item">
                                  <img src="${item.fotografia}">
                                  <div class="title">${item.nombre}</div>
                                  <div class="price">Precio: $${item.precio.toLocaleString('de-DE')}</div>
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
    
            divPagos.append(productoP)
          }
  
      })
      }else if(cat.categoria=='Cafeteria'){
        cat.items.map(item=>{
          if(item.top){  
            const productoP = document.createElement('swiper-slide');
    
            productoP.innerHTML=`<div class="item">
                                  <img src="${item.fotografia}">
                                  <div class="title">${item.nombre}</div>
                                  <div class="price">Precio: $${item.precio}</div>
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
    
            divCafeteria.append(productoP)
          }
      })
      }else if(cat.categoria=='Papeleria'){
        cat.items.map(item=>{
          if(item.top){
            const productoP = document.createElement('swiper-slide');
    
            productoP.innerHTML=`<div class="item">
                                  <img src="${item.fotografia}">
                                  <div class="title">${item.nombre}</div>
                                  <div class="price">Precio: $${item.precio}</div>
                                  <button onclick="addToCard(0)">Add To Card</button>
                                </item>`
    
            divPapeleria.append(productoP)
      }
      })
      }
    })
    

  
}

fetchProducts();
