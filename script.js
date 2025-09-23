// Находим элементы на странице
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');

// Здесь будем хранить элемент, который был активен до открытия окна
let lastActive = null;

// Обработчик отправки формы
form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений об ошибках
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    // 2) Проверка встроенной браузерной валидации
    if (!form.checkValidity()) {
        e.preventDefault();

        // Пример: отдельная обработка для поля email
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity(
                'Введите корректный e-mail, например name@example.com'
            );
        }

        // Показываем ошибки браузера
        form.reportValidity();

        // Для доступности: помечаем невалидные поля
        [...form.elements].forEach(el => {
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        });

        return; // если ошибки есть, дальше не идём
    }

    // 3) Если форма прошла проверку — имитируем отправку
    e.preventDefault();

    // Закрываем окно (если оно открыто)
    document.getElementById('contactDialog')?.close('success');

    // Очищаем все поля формы
    form.reset();
});

// Открыть диалог
openBtn.addEventListener('click', () => {
    // Запоминаем, какой элемент был в фокусе
    lastActive = document.activeElement;

    // Открываем окно в модальном режиме
    dlg.showModal();

    // Ставим фокус на первое поле формы
    dlg.querySelector('input,select,textarea,button')?.focus();
});

// Закрыть диалог кнопкой "Отмена"
closeBtn.addEventListener('click', () => {
    dlg.close('cancel');
});

// После закрытия возвращаем фокус туда, где он был
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Примечание:
// Нажатие клавиши Esc автоматически вызовет событие "cancel"
// и закроет <dialog>
