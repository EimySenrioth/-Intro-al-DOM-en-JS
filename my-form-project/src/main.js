import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a los elementos del DOM de los elementos agregados
  //a mi plantilla generado por IA, las partes del formulario las cree de manera manuel y se agregaron al final del formulario
  const commentTextArea = document.getElementById('comment-text');
  const addCommentBtn = document.getElementById('add-comment-btn');
  const commentsSection = document.getElementById('comments-section');
//se uso el metdo get para obtener las referencias del HTML
//el campo del texto donde se ingresara el comentario
//el boton para agregar el comentario
//la seccion donde se mostraran los comentarios, este lo plenea estilizar con css para que este dento de la plantilla
  // Función para agregar un nuevo comentario cuendo se apreta añadir
  function addComment() {
      // Obtener el texto del comentario
      const commentText = commentTextArea.value.trim();
// value obtiene el valor del campo de texto y trim elimina los espacios en blanco al inicio y al final del texto
      // Validar que el comentario no esté vacío
      if (!commentText) {//! (negación lógica) en JavaScript se usa para invertir el valor de una expresión booleana.
          alert('Por favor, escribe un comentario');
          return;
      }
//si esta vacio se muestra un alerta y se retorna para que no se ejecute el resto del codigo
      // Crear el elemento del comentario
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';
//se crea un div para contener el comentario y se le asigna la clase comment para darle estilo con css
      // Obtener la fecha y hora actual
      const now = new Date();
      const formattedDate = now.toLocaleString();
//se obtiene la fecha y hora actual y se le asigna a la variable formattedDate
      // Crear la estructura interna del comentario
      commentElement.innerHTML = `
          <div class="comment-header">
              <span class="comment-date">${formattedDate}</span>
              <button class="delete-btn">Eliminar</button>
          </div>
          <div class="comment-content">
              ${commentText}
          </div>
      `;
//se crea la estructura interna del comentario, se agrega la fecha y hora y el boton de eliminar
//se le da formato al comentario
      // Agregar el evento para eliminar el comentario
      //se useo el otro metodo del DOM, querySelector para obtener el boton de eliminar
      const deleteBtn = commentElement.querySelector('.delete-btn');//se busca el elemnto con la clase de js que busca el dom que tenga  delete-btn
      deleteBtn.addEventListener('click', () => {
          if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
              commentElement.remove();
          }
      });
//se agrega el evento para eliminar el comentario, si se confirma se elimina el comentario
//evento click para el boton de eliminar
//se eilimna usando el metodo remove
      // Agregar el comentario al inicio de la sección de comentarios
      commentsSection.insertBefore(commentElement, commentsSection.firstChild);
//esta parte no esta conectada a la plantilla todavia, pues aparece abajo
//se agrega el comentario al inicio de la seccion de comentarios
//se usa el metodo insertBefore para agregar el comentario al inicio de la seccion
      // Limpiar el textarea, es decir se borra el comentario para que el usario pueda escribir otro
      commentTextArea.value = '';
  }

  // Agregar evento al botón de agregar comentario
  addCommentBtn.addEventListener('click', addComment);
  //se añade un event listener al boton de añadir comentario
  //cuando se hace clik se ejecuta la  addComment
//este es un plus que se agrego para que se pueda agregar un comentario con el
//aqui se se agrego e.pr... para evitar el salto de linea, esto es comun en paginas web
  // Agregar evento para enviar con Enter (Shift+Enter para nueva línea)
  commentTextArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          addComment();
      }
  });
});
77//nota para mi:firstChild es una propiedad del DOM que devuelve el primer hijo de un nodo
//firstElementChild es diferente a firstChild, ya que firstElementChild devuelve el primer hijo de un nodo como un elemento del DOM
//en mi codigo commentsSection.firstChild devuelve el primer hijo de la seccion de comentarios,aqui debo meter los comentario de la platnilla