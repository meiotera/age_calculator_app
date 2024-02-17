class Conversor_Tempo {
    constructor(day, month, year) {
        this.year = Number(year);
        this.month = Number(month);
        this.day = Number(day);
    }

    convert_date() {
        // data atual
        let hoje = new Date();
        // data passada pelo usuario
        let dateUser = new Date(`${this.year},${this.month},${this.day}`);
        let years = hoje.getFullYear() - dateUser.getFullYear();
        let months = hoje.getMonth() - dateUser.getMonth();
        let days = hoje.getDate() - dateUser.getDate();

        if (months < 0 || (months === 0 && days < 0)) {
            years--;
            months = months + 12;
        }

        if (days < 0) {
            months--;
            let lastMonth = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
            days += lastMonth.getDate();
        }

        return [years, months, days];
    }

    print() {
        let [years, months, days] = this.convert_date();
        let year = document.getElementById('y');
        let month = document.getElementById('m');
        let day = document.getElementById('d');

        year.innerText = years;
        month.innerText = months;
        day.innerText = days;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio do formulário

        const day = document.getElementById('day');
        const month = document.getElementById('month');
        const year = document.getElementById('year');

        const dateOk = verifyFields(inputs, day, month, year);

        const [dayUser, monthUser, yearUser] = dateOk;

        if (!dayUser || !monthUser || !yearUser) return;

        const date = new Conversor_Tempo(dayUser, monthUser, yearUser);

        date.print();
    });
});

function verifyFields(inputs, dayUser, monthUser, yearUser) {
    const hoje = new Date();
    const day = Number(dayUser.value);
    const month = Number(monthUser.value);
    const year = Number(yearUser.value);

    // let dataInformada = new Date(`${year}-${month}-${day}`);
    let resetData = new Date(`${year}-${month}-01`);
    let qtdDiasMes = new Date(resetData.getFullYear(), resetData.getMonth() + 1, 0);

    let err = 0;

    if (day > qtdDiasMes.getDate()) {
        const span = dayUser.nextElementSibling;

        dayUser.parentElement.classList.add('erro');
        dayUser.style.borderColor = 'hsl(0, 100%, 67%)';
        span.innerText = 'Must be a valid day';

        err += 1;
    } else {
        const span = dayUser.nextElementSibling;

        dayUser.parentElement.classList.remove('erro');
        dayUser.style.borderColor = '';
        span.innerText = '';
    }

    if (month > 12) {
        const span = monthUser.nextElementSibling;

        monthUser.parentElement.classList.add('erro');
        monthUser.style.borderColor = 'hsl(0, 100%, 67%)';
        span.innerText = 'Must be a valid month';

        err += 1;
    } else {
        const span = monthUser.nextElementSibling;

        monthUser.parentElement.classList.remove('erro');
        monthUser.style.borderColor = '';
        span.innerText = '';
    }

    if (year > hoje.getFullYear()) {
        const span = yearUser.nextElementSibling;

        yearUser.parentElement.classList.add('erro');
        yearUser.style.borderColor = 'hsl(0, 100%, 67%)';
        span.innerText = 'Must be a valid year';

        err += 1;
    } else {
        const span = yearUser.nextElementSibling;

        yearUser.parentElement.classList.remove('erro');
        yearUser.style.borderColor = '';
        span.innerText = '';
    }

    if (err > 0) return;

    inputs.forEach(input => {
        const span = input.nextElementSibling;

        if (!input.value) {

            input.parentElement.classList.add('erro');
            input.style.borderColor = 'hsl(0, 100%, 67%)';
            span.innerText = 'This field is required';

        } else {

            input.parentElement.classList.remove('erro');
            input.style.borderColor = '';
            span.innerText = '';
        }
    });

    return [day, month, year];
}