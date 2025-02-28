document.addEventListener('DOMContentLoaded', function() {
    const addReplyBtn = document.getElementById('add-reply-btn');
    const signupModal = document.getElementById('signup-modal');
    const closeBtn = document.querySelector('.close-btn');
    const signupForm = document.getElementById('signup-form');
  
    // Función para mostrar la ventana emergente
    function showSignupModal() {
      signupModal.style.display = 'block';
    }
  
    // Función para ocultar la ventana emergente
    function closeSignupModal() {
      signupModal.style.display = 'none';
    }
  
    // Función para manejar el envío del formulario de registro
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();
      // Aquí puedes manejar el registro del usuario
      alert('Cuenta creada exitosamente');
      closeSignupModal();
    });
  
    // Agregar evento al botón de añadir respuesta para mostrar la ventana emergente
    addReplyBtn.addEventListener('click', showSignupModal);
  
    // Agregar evento al botón de cerrar la ventana emergente
    closeBtn.addEventListener('click', closeSignupModal);
  
    // Cerrar la ventana emergente si el usuario hace clic fuera de ella
    window.addEventListener('click', function(event) {
      if (event.target === signupModal) {
        closeSignupModal();
      }
    });
  });