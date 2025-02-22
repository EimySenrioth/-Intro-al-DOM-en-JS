import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Obtener referencias a los elementos del DOM
  const commentTextArea = document.getElementById('comment-text');
  const addCommentBtn = document.getElementById('add-comment-btn');
  const commentsSection = document.getElementById('comments-section');

  // Función para agregar un nuevo comentario
  function addComment() {
      // Obtener el texto del comentario
      const commentText = commentTextArea.value.trim();

      // Validar que el comentario no esté vacío
      if (!commentText) {
          alert('Por favor, escribe un comentario');
          return;
      }

      // Crear el elemento del comentario
      const commentElement = document.createElement('div');
      commentElement.className = 'comment';

      // Obtener la fecha y hora actual
      const now = new Date();
      const formattedDate = now.toLocaleString();

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

      // Agregar el evento para eliminar el comentario
      const deleteBtn = commentElement.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
          if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
              commentElement.remove();
          }
      });

      // Agregar el comentario al inicio de la sección de comentarios
      commentsSection.insertBefore(commentElement, commentsSection.firstChild);

      // Limpiar el textarea
      commentTextArea.value = '';
  }

  // Agregar evento al botón de agregar comentario
  addCommentBtn.addEventListener('click', addComment);

  // Agregar evento para enviar con Enter (Shift+Enter para nueva línea)
  commentTextArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          addComment();
      }
  });
});
