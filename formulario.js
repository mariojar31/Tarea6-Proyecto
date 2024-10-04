const formularioagrgar = document.getElementById('formularioAgregar');
const categoria= document.getElementById('categoria')
const nombre= document.getElementById('nombre')
const descripcion = document.getElementById('descripcion')
const precio= document.getElementById('precio')
const formulaelimianr = document.getElementById('formularioEliminar');
const id= document.getElementById('id')
const cateelimi= document.getElementById('categeliminar')


formularioagrgar.addEventListener('submit',(event)=>{
            
    event.preventDefault();
    let  valor_nombre= nombre.value
    let valor_descripcion= descripcion.value
    let valor_precio= precio.value
    let valor_categoria= categoria.value
    
    agregar_productos(valor_categoria,valor_nombre,valor_descripcion,valor_precio)
   location.reload();

})

formulaelimianr.addEventListener('submit',(event)=>{
    event.preventDefault;
    let valor_ID= id.value
    let valor_categoria= cateelimi.value
    eliminar_productos(valor_categoria , valor_ID);
    location.reload();

})

const URL= './db/products.json';

async function Obtener_datos(){
    
    const extrae = await fetch(URL);
    const datos= await extrae.json();
    const productos= datos.productos;
    let datos_local= JSON.parse(localStorage.getItem('productos'))
    //console.log(datos_local);
    if(datos_local==null){
        localStorage.setItem('productos',JSON.stringify( productos));
    }
   
}
Obtener_datos();

function agregar_productos(categoria, Nombre,Descripcion,Precio){

    const archivoImagen = document.getElementById('imagen').files[0];
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
    
}

function encontrarID(items){

    let listaID=[];

    items.map(element=>{
        listaID.push(element.id);
        
        

    })

return Math.max(...listaID)
}