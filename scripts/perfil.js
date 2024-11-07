function cambiarColorRedes() {
   const imafacebook = document.querySelectorAll('.facebook');
   const imagtwitter = document.querySelectorAll('.twitter');
   const imaginstagram = document.querySelectorAll('.instagram');

   // Cambiar imagen para Facebook
   imafacebook.forEach(element => {
      element.addEventListener('mouseover', () => {
         element.src = 'img/facenaranja.jpg';  // Cambia a la nueva imagen
      });

      element.addEventListener('mouseout', () => {
         element.src = 'img/Logoface.jpg.png';  // Regresa a la imagen original
      });
   });

   // Cambiar imagen para Twitter
   imagtwitter.forEach(element => {
      element.addEventListener('mouseover', () => {
         element.src = 'img/twittwernaranja.jpg'; // Cambia a la nueva imagen
      });

      element.addEventListener('mouseout', () => {
         element.src = 'img/logo-instar.jpg.png'; // Regresa a la imagen original
      });
   });

   // Cambiar imagen para Instagram
   imaginstagram.forEach(element => {
      element.addEventListener('mouseover', () => {
         element.src = 'img/insta-naranja.jpg'; // Cambia a la nueva imagen
      });

      element.addEventListener('mouseout', () => {
         element.src = 'img/logo-ins.jpg.png'; // Regresa a la imagen original
      });
   });
}

// Asegúrate de que el DOM esté completamente cargado antes de ejecutar la función
document.addEventListener('DOMContentLoaded', function () {
   cambiarColorRedes();
});
