// ==================== ЗАВДАННЯ 1: ВАЛІДАЦІЯ ФОРМИ ====================

const patterns = {
    pib: /^[А-Яа-яІіЇїЄєҐґ']+\.[А-Яа-яІіЇїЄєҐґ]\.[А-Яа-яІіЇїЄєҐґ]$/,
    idcard: /^[А-Яа-яІіЇїЄєҐґ]{2} №\d{6}$/,
    faculty: /^[А-Яа-яІіЇїЄєҐґ]+$/,
    birthdate: /^\d{2}\.\d{2}\.\d{4}$/,
    address: /^м\.\s[А-Яа-яІіЇїЄєҐґ]+$/
};

const errorMessages = {
    pib: 'Формат: Прізвище.І.Б. (наприклад: Іванишин.О.О.)',
    idcard: 'Формат: ТТ №ЧЧЧЧЧЧ (наприклад: КВ №987654)',
    faculty: 'Тільки українські літери (наприклад: ФІОТ)',
    birthdate: 'Формат: ЧЧ.ЧЧ.ЧЧЧЧ (наприклад: 10.04.2006)',
    address: 'Формат: м. Назва (наприклад: м. Київ)'
};

const form = document.getElementById('validationForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;
    const formData = {};

    for (let fieldName in patterns) {
        const input = document.getElementById(fieldName);
        const formGroup = input.parentElement;
        const errorSpan = formGroup.querySelector('.error-message');
        const value = input.value.trim();

        if (!patterns[fieldName].test(value)) {
            formGroup.classList.add('error');
            errorSpan.textContent = errorMessages[fieldName];
            isValid = false;
        } else {
            formGroup.classList.remove('error');
            errorSpan.textContent = '';
            formData[fieldName] = value;
        }
    }


    if (isValid) {
        const newWindow = window.open('', '_blank', 'width=400,height=400');
        newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="uk">
            <head>
                <meta charset="UTF-8">
                <title>Введені дані</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 30px;
                        background-color: #f5f5f5;
                    }
                    h1 {
                        font-size: 24px;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .data-item {
                        margin-bottom: 15px;
                        font-size: 16px;
                    }
                    .data-item strong {
                        display: inline-block;
                        width: 150px;
                    }
                </style>
            </head>
            <body>
                <h1>Введені дані</h1>
                <div class="data-item"><strong>ПІБ:</strong> ${formData.pib}</div>
                <div class="data-item"><strong>ID-card:</strong> ${formData.idcard}</div>
                <div class="data-item"><strong>Факультет:</strong> ${formData.faculty}</div>
                <div class="data-item"><strong>Дата народження:</strong> ${formData.birthdate}</div>
                <div class="data-item"><strong>Адреса:</strong> ${formData.address}</div>
            </body>
            </html>
        `);
        newWindow.document.close();
    }
});

// ==================== ЗАВДАННЯ 2: ТАБЛИЦЯ 6x6 ====================

const table = document.getElementById('mainTable');
const variantNumber = 9; // Ваш варіант
let selectedColor = document.getElementById('colorPicker').value;

document.getElementById('colorPicker').addEventListener('input', function (e) {
    selectedColor = e.target.value;
});

function createTable() {
    let cellNumber = 1;
    for (let i = 0; i < 6; i++) {
        const row = table.insertRow();
        for (let j = 0; j < 6; j++) {
            const cell = row.insertCell();
            cell.textContent = cellNumber;
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.dataset.number = cellNumber;

            if (cellNumber === variantNumber) {
                cell.addEventListener('mouseenter', function () {
                    this.style.backgroundColor = getRandomColor();
                });

                cell.addEventListener('click', function () {
                    this.style.backgroundColor = selectedColor;
                });

                cell.addEventListener('dblclick', function () {
                    changeColumnAlternate(parseInt(this.dataset.col), parseInt(this.dataset.row));
                });
            }

            cellNumber++;
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColumnAlternate(col, startRow) {
    const rows = table.rows;
    let changeNext = true;

    for (let i = startRow; i < rows.length; i++) {
        if (changeNext) {
            rows[i].cells[col].style.backgroundColor = selectedColor;
        }
        changeNext = !changeNext;
    }
}

createTable();