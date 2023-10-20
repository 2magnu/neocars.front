document.addEventListener('DOMContentLoaded', function() {
    const modalTriggers = document.querySelectorAll('.js-open-modal');
    const modalStack = [];

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
                    modalStack.pop(); // Убираем последний элемент из стека
                    const previousModalId = modalStack[modalStack.length - 1]; // Получаем предыдущий modalId из стека
                    if (previousModalId) {
                        modalStack.pop();
                        openModal(previousModalId); // Открываем предыдущее модальное окно из стека
                    } else {
                        modalWrapper.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }
                });

                modalWrapper.addEventListener('click', function(event) {
                    if (event.target === modalWrapper && event.target !== modalInner) {
                        closeButton.click();
                    }
                });

                modalStack.push(modalId); // Добавляем текущий modalId в стек

                const nestedModalTriggers = document.querySelectorAll('.js-open-modal');
                nestedModalTriggers.forEach(trigger => {
                    trigger.addEventListener('click', function() {
                        const nestedModalId = this.getAttribute('data-modal');
                        modalStack.push(modalId); // Добавляем текущий modalId в стек перед открытием нового окна
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
            modalStack.push(modalId);
            openModal(modalId);
        });
    });
});
