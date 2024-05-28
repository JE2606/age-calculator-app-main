// INPUTS
const dayInput = document.querySelector('.input__day');
const monthInput = document.querySelector('.input__month');
const yearInput = document.querySelector('.input__year');

// LABELS
const dayLabel = document.querySelector('.label__day');
const monthLabel = document.querySelector('.label__month');
const yearLabel = document.querySelector('.label__year');

// MESSAGE
const dayMessage = document.querySelector('.error__day');
const monthMessage = document.querySelector('.error__month');
const yearMessage = document.querySelector('.error__year');

// FORM
const form = document.querySelector('.form');
const button = document.querySelector('.button');

// RESULT
const dayResult = document.querySelector('.day__result');
const monthResult = document.querySelector('.month__result');
const yearResult = document.querySelector('.year__result');

// Helper function to validate input
const validateInput = (input, label, error, min, max, message) => {
    if (input.value === '') {
        error.textContent = 'This field is required';
        input.classList.add('input__error');
        label.classList.add('error__label');
        return false;
    } else if (+input.value < min || +input.value > max) {
        error.textContent = message;
        input.classList.add('input__error');
        label.classList.add('error__label');
        return false;
    } else {
        error.textContent = '';
        input.classList.remove('input__error');
        label.classList.remove('error__label');
        return true;
    }
};

// Validate day, month, and year inputs
const validateForm = () => {
    const currentYear = new Date().getFullYear();
    const isValidDay = validateInput(dayInput, dayLabel, dayMessage, 1, 31, 'Must be a valid day');
    const isValidMonth = validateInput(monthInput, monthLabel, monthMessage, 1, 12, 'Must be a valid month');
    const isValidYear = validateInput(yearInput, yearLabel, yearMessage, 1900, currentYear, 'Must be a valid year');

    if (isValidDay && isValidMonth && isValidYear) {
        const day = +dayInput.value;
        const month = +monthInput.value;
        const year = +yearInput.value;

        // Validate specific dates
        const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (day > daysInMonth[month - 1]) {
            dayMessage.textContent = `This month cannot have more than ${daysInMonth[month - 1]} days`;
            dayInput.classList.add('input__error');
            dayLabel.classList.add('error__label');
            return false;
        }

        return true;
    }

    return false;
};

// Calculate age
const calculateAge = () => {
    if (validateForm()) {
        const birthDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
        const currentDate = new Date();
        let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
        let ageMonths = currentDate.getMonth() - birthDate.getMonth();
        let ageDays = currentDate.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        yearResult.textContent = ageYears;
        monthResult.textContent = ageMonths;
        dayResult.textContent = ageDays;
    } else {
        alert('Please correct the errors in the form.');
    }
};

button.addEventListener('click', (e) => {
    e.preventDefault();
    calculateAge();
});
