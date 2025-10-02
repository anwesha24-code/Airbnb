
(() => {
        'use strict'

  // Select all forms with class "needs-validation"
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

