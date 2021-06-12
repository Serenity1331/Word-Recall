const words = ['Страна', 'Язык', 'Люди', 'Говорят', 'Мужчина', 'Женщина'];
const countries = ['Ukraine', 'Italy', 'Germany', 'Russia', 'Korea', 'France', 'USA', 'Japan', 'China']
let wordsInterval = 3500;

function init() {
    gameStart(); // must be after createSelectionList
    displayAnswersListener();
    chosenCountryListener();
    collapsibleListener();
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

function chosenCountryListener() {

    const countryNames = document.querySelectorAll('.countryName');
    countryNames.forEach(elem => {

        elem.addEventListener('click', function () {
            this.classList.contains('chosen') ? this.classList.remove('chosen') : this.classList.add('chosen')
        })
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

function getChosenCountries() {

    let arr = [];
    const chosen = document.querySelectorAll('.chosen');
    chosen.forEach(elem => arr.push(elem.textContent))

    return arr
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
            0: 'Америка',
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

function displayAnswersListener() {
    const btn = document.querySelector('.showAnswers');
    btn.addEventListener('click', () => {

        const answers = document.querySelector('.answers__container');

        answers.classList.toggle('visible');
        btn.classList.toggle('active');
        btn.textContent === 'Посмотреть ответы'
            ? btn.textContent = 'Скрыть ответы'
            : btn.textContent = 'Посмотреть ответы'
    })
}

function collapsibleListener() {

    const answerBoxes = document.querySelectorAll('.answers__box');
    answerBoxes.forEach(elem => {
        elem.addEventListener('click', function () {
            const collapsed = this.nextElementSibling;
            elem.classList.toggle('active');
            collapsed.classList.toggle('collapsed')
        })
    })
}

init();
// insertTableData()

