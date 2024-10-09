//Sacar el valor
const nombreLogin=document.getElementById('nombre_login');
const telefono= document.getElementById('telefono');
const email= document.getElementById('email');
const confirmarContraeña= document.getElementById('confirmarContraeña');
const contraeña= document.getElementById('contraeña');
const codigo= document.getElementById('codigo');

//textos almacenar el ERROR
const mensajeError= document.getElementById('mensajeErrorLogin');
const nombErrortext= document.getElementById('mensErrornombre');
const teleErrortext= document.getElementById('mensteleerror');
const emailErrortext= document.getElementById('mensEmailerror');
const contrErrortext= document.getElementById('mensErrorcontra');
const codigErrortext= document.getElementById('menscodierror');
const conficontraErrortext= document.getElementById('confcontrError');

const formularioLogin= document.getElementById('formularioLogin');
let objetoLogin;

formularioLogin.addEventListener('submit', (event)=>{
    event.preventDefault();
    let bdlogin=JSON.parse(localStorage.getItem('usuarios'))
        if(teleErrortext.innerText==="" && nombErrortext.innerText==="" && emailErrortext.innerText==="" && contrErrortext.innerText===""&& conficontraErrortext.innerText==="" && codigErrortext.innerText===""){
        
            if(bdlogin===null){
                bdlogin=[];
                alert("esta nulo")
             objetoLogin=[
            {"id":1,"Nombre":nombreLogin.value,"Telefono":telefono.value,"Codigo": codigo.value,"Email":email.value,"Contraseña":contraeña.value}
                    
            ]
            bdlogin.push(objetoLogin)
            localStorage.setItem('usuarios',JSON.stringify(bdlogin));
            alert("Usuario creado con éxito")
        }
        else{ 
            
            alert("ya hay")
            let arrayNumeros=[];

            bdlogin.forEach(element => {
               console.log( arrayNumeros.push(element.id));
               
            });
            
            

           
        }
        }
        
})

class mensaje{

    constructor(inputss, mensajeobjeto,confirmarContraseña){
        
    this.input= inputss;  
    this.mensaje=mensajeobjeto  
    this.confirmacioncon=confirmarContraseña;
}
mostrarMensaje(){
    this.input.addEventListener('input',()=>{
        
        let inputActual= this.input.value;
        if(this.input===nombreLogin){
            if(!/^[A-Za-z]([\-\._]{1})?[A-Za-z0-9\-\._]{3,19}$/.test(inputActual))
            {this.mensaje.innerText="Nombre invalido debe tener minimo 4 carcater máximo 20, max un caracter especial (. - _) debe comenzar con letras"}
            else{ this.mensaje.innerText="";}
        }

        if(this.input===telefono){

        if(!/^\d{8,10}$/.test(inputActual)){
            let mensajeNumero= "Ingresa un número valido\n "
            this.mensaje.innerText = mensajeNumero;
            this.mensaje.style.color="red"
                  
        }else{

            this.mensaje.innerText = "";
        }
    }  

    if(this.input===codigo){

        if(!/^\d{8,10}$/.test(inputActual)){
            let mensajeNumero= "Ingresa un código valido\n "
            this.mensaje.innerText = mensajeNumero;
            this.mensaje.style.color="red"
                  
        }else{

            this.mensaje.innerText = "";
        }
    }  
    
    if(this.input===email){
        if(!/^[a-zA-Z0-9]{1,20}([.-_]{1}[a-zA-Z0-9]{1,10})?@[a-zA-Z0-9]{1,10}([-.]{1}[a-zA-Z0-9]{1,20})?\.[a-zA-Z0-9]{2,6}$/.test(inputActual)){

            let mensajeEmal= "Ingresa un correo valido\n "
            this.mensaje.innerHTML=mensajeEmal;
        }else{
            this.mensaje.innerText="";
        }
        }
        if(this.input===contraeña){
                
            if( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°])[A-Za-z0-9\+\-\*\^\/@\{\}\[\]\)\(\.=,%()\?!"#$&\|°]{8,10}$/.test(inputActual)){
                
        let mensaContra="Debe contener 8 digitos entre mayusculas, minusculas, carcateres especiales y números"
                this.mensaje.innerText=mensaContra;
            }  
            else{
                this.mensaje.innerText="";
            }     
        }

        if(this.input===confirmarContraeña){
                if(this.input.value!==this.confirmacioncon.value){

                        this.mensaje.innerText="las contraseñas no son iguales"

                }
                else{
                    this.mensaje.innerText="";
                }
        }
       
    });
   
};
};

let array=[];

let tele= new mensaje(telefono,teleErrortext);
tele.mostrarMensaje();

let emails= new mensaje(email,emailErrortext);
emails.mostrarMensaje();

let contraseñas= new mensaje(contraeña,contrErrortext);
contraseñas.mostrarMensaje();

let cofirContras= new mensaje(confirmarContraeña,conficontraErrortext,contraeña);
cofirContras.mostrarMensaje();

let nombreLog= new mensaje(nombreLogin,nombErrortext);
nombreLog.mostrarMensaje();

let codilog= new mensaje(codigo,codigErrortext)
codilog.mostrarMensaje();



const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      containerFormRegister = document.querySelector(".register"),
      containerFormLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide")
})


btnSignUp.addEventListener("click", e => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide")
})