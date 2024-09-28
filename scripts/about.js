const container_biogra1 = document.getElementById('container-biogra1')
const container_biogra2 = document.getElementById('container-biogra2')
const container_biogra3 = document.getElementById('container-biogra3')
const container_biogra4 = document.getElementById('container-biogra4')

const container1 = document.getElementById('container1')
const container2 = document.getElementById('container2')
const container3 = document.getElementById('container3')
const container4 = document.getElementById('container4')


container1.addEventListener('mouseover',()=>{container_biogra1.style='display:block'})
container2.addEventListener('mouseover',()=>{container_biogra2.style='display:block'})
container3.addEventListener('mouseover',()=>{container_biogra3.style='display:block'})
container4.addEventListener('mouseover',()=>{container_biogra4.style='display:block'})

container1.addEventListener('mouseleave', ()=>{setTimeout(()=>{},1000);container_biogra1.style='display:none'})
container2.addEventListener('mouseleave', ()=>{setTimeout(()=>{},1000);container_biogra2.style='display:none'})
container3.addEventListener('mouseleave', ()=>{setTimeout(()=>{},1000);container_biogra3.style='display:none'})
container4.addEventListener('mouseleave', ()=>{setTimeout(()=>{},1000);container_biogra4.style='display:none'})

