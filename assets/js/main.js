$(document).ready(function(){

    $('#phone').mask('+7 (ZZZ) ZZZ-ZZ-ZZ', {
        translation: {
            'Z': {
                pattern: /[0-9]/, optional: true
            }
        },
        placeholder: "+7(___) ___ - __ - __"
    });

    let currentModal = null;
    let previousModal = null;

    document.addEventListener('click', function (event) {
        const target = event.target;

        if (target.classList.contains('js-open-modal')) {
            const modalId = target.getAttribute('data-modal');
            previousModal = currentModal;
            currentModal = document.getElementById(modalId);

            if (previousModal) {
                previousModal.style.display = 'none';
            }

            currentModal.style.display = 'block';
            document.querySelector('.modal__wrapper').style.display = 'block';
        }

        if (target.classList.contains('modal__close') || target.classList.contains('modal__wrapper')) {
            if (previousModal) {
                currentModal.style.display = 'none';
                previousModal.style.display = 'block';
                currentModal = previousModal;
                previousModal = null;
            } else {
                document.querySelector('.modal__wrapper').style.display = 'none';
                currentModal.style.display = 'none';
                currentModal = null;
            }
        }
    });
});