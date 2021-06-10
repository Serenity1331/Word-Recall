const words = ['Страна', 'Язык', 'Люди', 'Говорят', 'Мужчина', 'Женщина'];
const countries = ['Ukraine', 'Italy', 'Germany', 'Russia', 'Korea', 'France', 'USA', 'Japan', 'China']
let wordsInterval = 3500;

function init() {
    createSelectionList();
    gameStart(); // must be after createSelectionList
    displayAnswersListener();
}

function gameStart() {

    const btn = document.querySelector('.start');
    btn.addEventListener('click', function () {

        const chosenCountries = getChosenCountries();

        if (chosenCountries.length === 0) {
            alert('Сначала выберите страну')
            return;
        }

        btn.classList.add('white');

        startCountryTimer(1, chosenCountries.length - 1, chosenCountries);
        startWordTimer(0, words.length, words)

        if (chosenCountries.length < 2) return

        let counter = 0;
        let timerId = setInterval(() => {

            if (counter === chosenCountries.length - 2) clearInterval(timerId);

            startWordTimer(0, words.length, words)
            counter += 1;

        }, wordsInterval * words.length + wordsInterval)


    })
}

function showWord(word) {

    const postfix = '  - ...';
    const wordsField = document.querySelector('.words')
    wordsField.innerHTML = word + postfix;
}

function showCountry(country) {

    const countryField = document.querySelector('.country')
    countryField.innerHTML = country;
}

function startWordTimer(from, to, arr) {

    let current = from;
    let timerId = setInterval(function () {

        showWord(arr[current])

        if (current === to) {
            const wordsField = document.querySelector('.words');
            wordsField.innerHTML = ''
            clearTimeout(timerId)
        }

        current++;

    }, wordsInterval);
}

function startCountryTimer(from, to, arr) {

    let current = from;
    showCountry(arr[0]);

    // if only one country is chosen
    if (arr.length === 1) return;

    let timerId = setInterval(() => {

        if (current === to) clearInterval(timerId);

        showCountry(arr[current]);
        current++;

    }, wordsInterval * words.length + wordsInterval);
}

function createSelectionList() {

    const countrySelection = document.querySelector('.countrySelection');
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < countries.length; i++) {

        const countryName = countries[i];
        const countryElement = createLabelAndCheckbox(countryName);
        fragment.appendChild(countryElement);

    }

    countrySelection.appendChild(fragment)

}

function createLabelAndCheckbox(value) {

    let div = document.createElement('div')
    div.classList.add('labelBox');

    let label = document.createElement('label');
    label.classList.add('countryName');
    label.setAttribute('for', value);
    label.textContent = value;

    let input = document.createElement('input');
    input.classList.add('countryCheckbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', value);
    input.checked = true;

    div.appendChild(label);
    div.appendChild(input);

    return div
}

function getChosenCountries() {

    let arr = [];
    let checkboxes = document.querySelectorAll('.countryCheckbox');
    checkboxes.forEach(elem => elem.checked ? arr.push(elem.previousSibling.textContent) : 0)
    return arr;
}

function getAnswers() {

    const answers = [
        {
            0: 'Украина',
            1: 'украинский',
            2: 'украинцы',
            3: 'по-украински',
            4: 'украинец',
            5: 'украинка',
        },
        {
            0: 'Италия',
            1: 'итальянский',
            2: 'итальянцы',
            3: 'по-итальянски',
            4: 'итальянец',
            5: 'итальянка',
        },
        {
            0: 'Германия',
            1: 'немецкий',
            2: 'немцы',
            3: 'по-немецки',
            4: 'немец',
            5: 'немка',
        },
        {
            0: 'Россия',
            1: 'русский',
            2: 'русские',
            3: 'по-русски',
            4: 'русский',
            5: 'русская',
        },
        {
            0: 'Корея',
            1: 'корейский',
            2: 'корейцы',
            3: 'по-корейски',
            4: 'кореец',
            5: 'кореянка',
        },
        {
            0: 'Франция',
            1: 'французский',
            2: 'французы',
            3: 'по-французски',
            4: 'француз',
            5: 'француженка',
        },
        {
            0: 'США/Америка',
            1: 'английский',
            2: 'американцы',
            3: 'по-английски',
            4: 'американец',
            5: 'американка',
        },
        {
            0: 'Япония',
            1: 'японский',
            2: 'японцы',
            3: 'по-японски',
            4: 'японец',
            5: 'японка',
        },
        {
            0: 'Китай',
            1: 'китайский',
            2: 'китайцы',
            3: 'по-китайски',
            4: 'китаец',
            5: 'китаянка',
        },
    ]

    return answers;
}

function createTable() {

    const answers = getAnswers();
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < countries.length; i++) {

        const tRow = document.createElement('tr');
        const countryObject = answers[i];

        for (let j = 0; j < words.length; j++) {

            const countryData = countryObject[j]
            const tCell = document.createElement('td')
            tCell.classList.add('cell')
            tCell.textContent = countryData;
            tRow.appendChild(tCell)
        }

        fragment.appendChild(tRow)
    }

    return fragment;
}

function insertTableData() {

    const data = createTable();
    const table = document.querySelector('.answers__table');
    table.appendChild(data);
}

function displayAnswersListener() {
    const btn = document.querySelector('.answers__title');
    btn.addEventListener('click', () => {

        const table = document.querySelector('.answers__table');
        table.style.opacity = 1;
    })
}

init();
insertTableData()

