import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'


document.addEventListener('DOMContentLoaded', function() {

  const commentTextArea = document.getElementById('comment-text');
  const addCommentBtn = document.getElementById('add-comment-btn');
  const commentsSection = document.getElementById('comments-section');
  const commentForm = document.querySelector('.comment-form');
  
  
  const addReplyBtn = document.getElementById('add-reply-btn');

  function showCommentForm() {
    if (commentForm) {
      commentForm.style.display = 'block';
      commentTextArea.focus();
    }
  }


  function addComment() {

    const commentText = commentTextArea.value.trim();


    if (!commentText) {
      alert('Por favor, escribe un comentario');
      return;
    }


    const commentElement = document.createElement('div');
    commentElement.className = 'flex w-full flex-row items-start justify-start gap-3 p-4';

   
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; 
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;


    commentElement.innerHTML = `
      <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style='background-image: url("https://drive.google.com/uc?export=view&id=1Fnu5Ft9vcPMJWosotE7QBhak5ZDh9x-m");'></div>
      <div class="flex h-full flex-1 flex-col items-start justify-start">
        <div class="flex w-full flex-row items-start justify-start gap-x-3">
          <p class="username text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]">Nuevo Usuario</p>
          <p class="comment-date text-[#4f7396] text-sm font-normal leading-normal">${formattedTime}</p>
        </div>
        <p class="comment-text text-[#0e141b] text-sm font-normal leading-normal">
          ${commentText}
        </p>
        <button class="delete-btn text-[#f44336] cursor-pointer text-sm underline mt-2">Eliminar</button>
      </div>
    `;


    const deleteBtn = commentElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
        commentElement.remove();
        saveComments();
      }
    });


    const newestFirstTitle = commentsSection.querySelector('h2');
    if (newestFirstTitle) {
      commentsSection.insertBefore(commentElement, newestFirstTitle.nextElementSibling);
    } else {

      commentsSection.prepend(commentElement);
    }


    commentTextArea.value = '';


    saveComments();
  }


  function saveComments() {
    const comments = [];
    const commentElements = commentsSection.querySelectorAll('.flex.w-full.flex-row.items-start.justify-start.gap-3.p-4');
    
    commentElements.forEach(commentElement => {

      const usernameElement = commentElement.querySelector('.username');
      if (usernameElement && usernameElement.innerText !== 'danny' && 
          usernameElement.innerText !== 'michelle' && 
          usernameElement.innerText !== 'ryan') {
          
        const textElement = commentElement.querySelector('.comment-text');
        const dateElement = commentElement.querySelector('.comment-date');
        
        if (textElement && dateElement) {
          comments.push({ 
            text: textElement.innerText, 
            date: dateElement.innerText 
          });
        }
      }
    });
    
    localStorage.setItem('comments', JSON.stringify(comments));
  }


  function loadComments() {
    try {
      const savedComments = localStorage.getItem('comments');
      if (!savedComments) return;
      
      const comments = JSON.parse(savedComments);
      
      if (!Array.isArray(comments)) return;
      
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'flex w-full flex-row items-start justify-start gap-3 p-4';
        commentElement.innerHTML = `
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0" style='background-image: url("https://drive.google.com/uc?export=view&id=1Fnu5Ft9vcPMJWosotE7QBhak5ZDh9x-m");'></div>
          <div class="flex h-full flex-1 flex-col items-start justify-start">
            <div class="flex w-full flex-row items-start justify-start gap-x-3">
              <p class="username text-[#0e141b] text-sm font-bold leading-normal tracking-[0.015em]">Nuevo Usuario</p>
              <p class="comment-date text-[#4f7396] text-sm font-normal leading-normal">${comment.date}</p>
            </div>
            <p class="comment-text text-[#0e141b] text-sm font-normal leading-normal">
              ${comment.text}
            </p>
            <button class="delete-btn text-[#f44336] cursor-pointer text-sm underline mt-2">Eliminar</button>
          </div>
        `;


        const deleteBtn = commentElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
          if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            commentElement.remove();
            saveComments();
          }
        });

        // Insertar el comentario después del título "Newest first"
        const newestFirstTitle = commentsSection.querySelector('h2');
        if (newestFirstTitle) {
          commentsSection.insertBefore(commentElement, newestFirstTitle.nextElementSibling);
        } else {

          commentsSection.prepend(commentElement);
        }
      });
    } catch (error) {
      console.error('Error al cargar comentarios:', error);

      localStorage.removeItem('comments');
    }
  }


  loadComments();


  if (addCommentBtn) {
    addCommentBtn.addEventListener('click', addComment);
  }

 
  if (commentTextArea) {
    commentTextArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addComment();
      }
    });
  }

  if (addReplyBtn) {
    addReplyBtn.addEventListener('click', showCommentForm);
  }
});