// Bootstrap Form Validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get all forms that need validation
    var forms = document.querySelectorAll('.needs-validation');
    
    // Loop and prevent submission
    Array.prototype.slice.call(forms).forEach(function(form) {
      form.addEventListener('submit', function(event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Auto-close alerts after 5 seconds, but allow manual close
document.addEventListener('DOMContentLoaded', function() {
  var alerts = document.querySelectorAll('.alert');
  alerts.forEach(function(alert) {
    // Listen for manual close button clicks
    var closeBtn = alert.querySelector('.btn-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        alert.remove();
      });
    }
    
    // Auto-close after 5 seconds
    setTimeout(function() {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 5000);
  });
});
