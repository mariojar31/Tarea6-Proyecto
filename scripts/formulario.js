const formularioagrgar = document.getElementById('formulario');
const categoria= document.getElementById('Categoria')
const nombre= document.getElementById('nombre')
const descripcion = document.getElementById('Descripcion')
const precio= document.getElementById('Precio')
const formulaelimianr = document.getElementById('formularioEliminar');
const id= document.getElementById('id')
const borrarBtn= document.getElementById('')
const productList = document.getElementById('productList')
const select = document.getElementById('selectCategory')

let filter = 'none'
select.addEventListener('change',()=>{
    const selectedValue = select.value
    filter=selectedValue
    Obtener_datos()
})

formularioagrgar.addEventListener('submit',(event)=>{
            
    event.preventDefault();
    let  valor_nombre= nombre.value
    let valor_descripcion= descripcion.value
    let valor_precio= precio.value
    let valor_categoria= categoria.value
    
    agregar_productos(valor_categoria,valor_nombre,valor_descripcion,valor_precio)
   location.reload();

})


const URL= './db/products.json';

async function Obtener_datos(){
    productList.innerHTML=''
    const extrae = await fetch(URL);
    const datos= await extrae.json();
    const productos= datos.productos;
    let datos_local= JSON.parse(localStorage.getItem('productos'))
    //console.log(datos_local);
    if(datos_local==null){
        localStorage.setItem('productos',JSON.stringify( productos));
        datos_local= JSON.parse(localStorage.getItem('productos'))
    }
    datos_local.map(cat=>{
        
        if(filter!=="none"){
            if(cat.categoria==filter){
                cat.items.map(producto=>{
                
                    const row = document.createElement('tr')
                    row.innerHTML=`
                                    <td scope="row"><input type="number" value=${producto.id} disabled style="width: 50px;"></td>
                                    <td><input type="text" value="${producto.nombre}" disabled></td>
                                    <td><input type="number" value=0 disabled></td>
                                    <td><div class="d-flex flex-row"><span class="btn btn-danger mx-1" onClick="eliminar_productos('${cat.categoria}',${producto.id})">Borrar</span><span class="btn btn-primary mx-1">Modificar</span><span class="btn btn-success mx-1 disabled">Confirmar</span></div></td>
                                `
                    productList.appendChild(row)
                })
            }

        }else{
            cat.items.map(producto=>{
                
                const row = document.createElement('tr')
                row.innerHTML=`
                                <td scope="row"><input type="number" value=${producto.id} disabled style="width: 50px;"></td>
                                <td><input id="name${producto.id}" type="text" value="${producto.nombre}" disabled></td>
                                <td><input id="cant${producto.id}" type="number" value=${producto.disponible} disabled></td>
                                <td><div class="d-flex flex-row"><span class="btn btn-danger mx-1" onClick="eliminar_productos('${cat.categoria}',${producto.id})"><img src="./img/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></span><span class="btn btn-primary mx-1" onclick="actMod(${producto.id})"><img src="../img/box_edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></span><span id="btnCheck${producto.id}"  onclick="saveChanges(${producto.id})" class="btn btn-success mx-1 disabled"><img src="./img/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"></span></div></td>
                            `
                productList.appendChild(row)
            })
        }
    })
    
    
   
}
Obtener_datos();

const actMod = (id)=>{
    document.getElementById(`name${id}`).disabled=false
    document.getElementById(`cant${id}`).disabled=false
    document.getElementById(`btnCheck${id}`).classList.remove('disabled')
}

const saveChanges = (id)=>{
    document.getElementById(`btnCheck${id}`).classList.add('disabled')
}

function agregar_productos(categoria, Nombre,Descripcion,Precio){
    
    const archivoImagen = document.getElementById('foto').files[0];
    console.log(archivoImagen)
    if(!archivoImagen){
        alert("Por favor ingrese la imagen "); return;
    }
        const leer= new FileReader();
        leer.readAsDataURL(archivoImagen);
        leer.onload=()=>{

            const UrlImagen= leer.result;
        
        let desdelocalpr= JSON.parse(localStorage.getItem('productos'))    
        desdelocalpr.map(eleme=>{

               if(eleme.categoria==categoria){

                    let encontrarIDD= encontrarID(eleme.items)+1;
                    

                    let guardar= {
                            id:encontrarIDD,
                            nombre:Nombre,
                            descripcion: Descripcion,
                            precio: Precio,
                            fotografia:UrlImagen,
                            disponible: true,
                            top:true}

                    eleme.items.push(guardar);       
             }
        })
        localStorage.setItem('productos',JSON.stringify(desdelocalpr));      
}

}

function eliminar_productos(categoria , ID){
    let desdelocalpr= JSON.parse(localStorage.getItem('productos'))    
   
   for(let i=0; i<desdelocalpr.length; i++){
        //console.log(desdelocalpr[i].categoria)
        
        if (desdelocalpr[i].categoria===categoria){

                let arrayitems= desdelocalpr[i].items

                 for ( let j=0; j<arrayitems.length;j++){

                        if(arrayitems[j].id===Number(ID)){

                            arrayitems= arrayitems.filter(arrayl=>arrayl.id !== Number(ID))

                            desdelocalpr[i].items=arrayitems
                            localStorage.setItem('productos', JSON.stringify(desdelocalpr))

                        }
                          
                 }

            
        }

   }
   location.reload()
}

function encontrarID(items){

    let listaID=[];

    items.map(element=>{
        listaID.push(element.id);
        
        

    })

return Math.max(...listaID)
}

const mostrarProductos = async()=>{

    let datos_local= await JSON.parse(localStorage.getItem('productos'))
    




}
