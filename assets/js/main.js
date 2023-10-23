$(document).ready(function(){

    $("#phone").inputmask({
        mask: "+7(999)-999-99-99"
    });

    $("#email").inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        greedy: false,
        onBeforePaste: function(pastedValue, opts) {
            pastedValue = pastedValue.toLowerCase();
            return pastedValue.replace("mailto:", "");
        },
        definitions: {
            "*": {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
                casing: "lower"
            }
        }
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