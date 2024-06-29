async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function getArrayFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setArrayToLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function formattPrice(number) {
    let fixedNumber = number.toFixed(2);
    return fixedNumber.replace('.', ',');
}

function showElement(id) {
    document.getElementById(id).classList.remove('d-none');
}

function hideElement(id) {
    document.getElementById(id).classList.add('d-none');
}

function clearInnerHTML(id) {
    document.getElementById(id).innerHTML = ``;
}

