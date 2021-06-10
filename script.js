const words = ['Страна', 'Язык', 'Люди', 'Говорят', 'Мужчина', 'Женщина'];
const countries = ['Ukraine', 'Italy', 'Germany', 'Russia', 'Korea', 'France', 'USA', 'Japan', 'China']
let wordsInterval = 1000;

function init() {
    createSelectionList();
    gameStart(); // must be after createSelectionList
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

init();