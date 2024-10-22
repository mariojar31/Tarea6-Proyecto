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

const fetchData = async()=>{
  let mostrar= await JSON.parse(localStorage.getItem('productos'))
  if(!mostrar){
    const response = await fetch("../db/products.json")
    const data = await response.json()
    mostrar = data.productos
    localStorage.setItem('productos',JSON.stringify(mostrar))
  }

mostrar.map(elemte=>{
    if(elemte.categoria=='Pagos'){
        let elementos= elemte.items;
        elementos.map(ele=>{
          //console.log(ele.fotografia)
          const productoP = document.createElement('swiper-slide');
  
          productoP.innerHTML=`<div class="item">
                                <img src="${ele.fotografia}">
                                <div class="title">${ele.nombre}</div>
                                <div class="price">Precio: $${ele.precio}</div>
                                <button onclick="addToCard(0)">Add To Card</button>
                                
                              </item>`
  
          divPagos.append(productoP)

        })
      
    } else if(elemte.categoria=='Cafeteria'){
        let elementosC= elemte.items;
        elementosC.map(ele=>{
          //console.log(ele.fotografia)
          const productoP = document.createElement('swiper-slide');
  
          productoP.innerHTML=`<div class="item">
                                <img src="${ele.fotografia}">
                                <div class="title">${ele.nombre}</div>
                                <div class="price">Precio: $${ele.precio}</div>
                                <button onclick="addToCard(0)">Add To Card</button>
                              </item>`
  
        divCafeteria.append(productoP)

        })

    }

    else if(elemte.categoria=='Papeleria'){
      let elementosP= elemte.items;
      elementosP.map(ele=>{
        //console.log(ele.fotografia)
        const productoP = document.createElement('swiper-slide');

        productoP.innerHTML=`<div class="item">
                              <img src="${ele.fotografia}">
                              <div class="title">${ele.nombre}</div>
                              <div class="price">Precio: $${ele.precio}</div>
                              <button onclick="addToCard(0)">Add To Card</button>
                            </item>`

      divPapeleria.append(productoP)

      })

  }
  
})

}

fetchData()



