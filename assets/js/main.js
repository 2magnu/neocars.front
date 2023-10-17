document.addEventListener('DOMContentLoaded', function() {
    const modalTriggers = document.querySelectorAll('.js-open-modal');

    function openModal(modalId) {
        const template = document.getElementById(modalId);

        if (template) {
            const modalContent = document.importNode(template.content, true);
            const modalInner = document.querySelector('.modal__inner');

            if (modalInner) {
                modalInner.innerHTML = '';
                modalInner.appendChild(modalContent);

                const inputsWithMasks = modalInner.querySelectorAll('input[data-mask]');
                inputsWithMasks.forEach(input => {
                    const inputMaskOptions = JSON.parse(input.getAttribute('data-mask'));
                    Inputmask(inputMaskOptions).mask(input);
                });

                const modalWrapper = document.querySelector('.modal__wrapper');
                modalWrapper.style.display = 'block';
                document.body.style.overflow = 'hidden';

                const closeButton = document.querySelector('.modal__close');

                closeButton.addEventListener('click', function() {
                    modalWrapper.style.display = 'none';
                    document.body.style.overflow = 'auto';
                });

                modalWrapper.addEventListener('click', function(event) {
                    if (event.target === modalWrapper) {
                        modalWrapper.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });

                // Рекурсивный вызов функции открытия модального окна
                const nestedModalTriggers = document.querySelectorAll('.js-open-modal');
                nestedModalTriggers.forEach(trigger => {
                    trigger.addEventListener('click', function() {
                        const nestedModalId = this.getAttribute('data-modal');
                        openModal(nestedModalId);
                    });
                });
            } else {
                console.error('Модальное окно не найдено в DOM');
            }
        } else {
            console.error('Шаблон модального окна не найден');
        }
    }

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
});
