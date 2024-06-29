/* --------------------> SCRIPT.JS <--------------------

    PROJECT:        deliverando 
                    (Lieferando Clon)
    
    AUTHOR:         Michael Zeitler
                    Dieburger Str. 52
                    60386 Frankfurt am Main

    BIRTHDATE:      1987-02-05

-------------------------------------------------------*/

// INIT
function init() {
    includeHTML();
    renderFood();
    renderBasket(); 
}

let food = [
    {
        "name": "Gyrosteller mit Pommes",
        "price": 11.50
    },
    {
        "name": "Gemischte Grillplatte",
        "price": 17.50
    },
    {
        "name": "Pita mit Zaziki",
        "price": 8.50
    },
    {
        "name": "Meeresfrüchte Salat",
        "price": 12.50
    },
    {
        "name": "Hausgemachtes Dessert",
        "price": 8.90
    }
];

function renderFood() {
    let content = document.getElementById('foodContent');
    clearInnerHTML('foodContent');

    for (let i = 0; i < food.length; i++) {
        const name = food[i]['name'];
        const price = food[i]['price'];

        content.innerHTML += returnFood(name, price, i);
    }
}

function handleCardClick(event, name, price, i) {

    if (event.target.classList.contains('icons')) {
        return;
    }

    addToBasket(name, price, i);
}

function handleCardInfoClick(event) {
    event.stopPropagation();
}

function addToBasket(name, price, i) {
    let index = basket.indexOf(name);

    if (index == -1) {
        basket.push(name);
        prices.push(price);
        amounts.push(1);
    } else {
        amounts[index]++;   /*---> Menge um 1 erhöhen, wenn sich das Gericht bereits im Warenkorb befindet */
    }

    saveBasket();
    renderBasket();
}

let basket = [];
let prices = [];
let amounts = [];

let fee = 1.29;     /*---> Delivery costs */

// RENDER BASKET --------------------------------------------------
function renderBasket() {
    let sum = 0;    /*---> Product of price & amount for each dish */

    let content = document.getElementById('basketContent');
    content.innerHTML = '';

    loadBasket();

    if (basket.length == 0) {
        showPlaceholder();
    } else {
        for (let i = 0; i < basket.length; i++) {
            const dish = basket[i];
            const price = prices[i];
            const amount = amounts[i];
            sum += price * amount;

            content.innerHTML += returnBasketHTML(dish, amount, price, i);
        }
        renderToBasketBar();
        /*---> rendering bottom-bar on mobile devices; 
          ---> only visible, if basked is not empty*/
        renderBasketAccounting(sum);
        /*---> rendering sub total, delivery costs, total sum & order button */
    }
    updateBasketCounter();
}

function loadBasket() {
    let localStorage = getArrayFromLocalStorage('basket');

    if (localStorage) {
        basket = getArrayFromLocalStorage('basket');
        prices = getArrayFromLocalStorage('prices');
        amounts = getArrayFromLocalStorage('amounts');
    } else {
        return []
    }

}

function decreaseAmount(i) {
    if (amounts[i] == 1) {
        removeDishFromBasket(i);
        saveBasket();
        renderBasket();
    } else {
        amounts[i]--;
        saveBasket();
        renderBasket();
    }
}

function removeDishFromBasket(position) {
    basket.splice(position, 1);
    prices.splice(position, 1);
    amounts.splice(position, 1);
}

function increaseAmount(i) {
    amounts[i]++;
    saveBasket();
    renderBasket();
}

// ---> Popup which is displayed, when pay button is clicked
function showOrderComplete() {
    showElement('orderCompletePopup');
    hideBasketOverlay();
    hideScrollbar();
}

function orderComplete() {
    hidePopup('orderCompletePopup');
    showScrollbar();
    resetArrays(basket, prices, amounts);
    document.getElementById('basketAccounting').innerHTML = '';
    clearInnerHTML('toBasketBar');  /* Element by ID ---> .innerHTML = '' */
    saveBasket();
    renderBasket();
}

function hidePopup(id) {
    document.getElementById(id).classList.add('d-none');
}

function resetArrays(basket, prices, amounts) {
    basket.length = 0;
    prices.length = 0;
    amounts.length = 0;
}

function updateBasketCounter() {
    let basketCounter = 0;

    for (let i = 0; i < amounts.length; i++) {
        const amount = amounts[i];

        basketCounter += amount;
    }

    return basketCounter;
}

function renderToBasketBar() {
    let toBaskedBar = document.getElementById('toBasketBar');
    toBaskedBar.innerHTML = returnToBaskedBar();
}

function showPlaceholder() {
    let content = document.getElementById('basketContent');
    let basketAccounting = document.getElementById('basketAccounting');

    basketAccounting.innerHTML = '';
    content.innerHTML = '';

    content.innerHTML += returnPlaceholder();
    clearInnerHTML('toBasketBar');
}

function renderBasketAccounting(sum) {
    let content = document.getElementById('basketAccounting');
    content.innerHTML = '';

    let totalSum = 0;
    totalSum = sum + fee;

    content.innerHTML = returnBasketAccounting(sum, totalSum);
    validMinOrderAmount(sum);   /*---> ? validate if minimum order amount is reached */

    updateBasketBtnMobile(totalSum);
}

function validMinOrderAmount(sum) {
    if (sum < 9.99) {
        showElement('inactivePayBtn');
        showElement('infoBoxBasket');
    } else {
        showElement('activePayBtn');
    }
}

function updateBasketBtnMobile(totalSum) {
    document.getElementById('toBasketBtnMobile').innerHTML = `${formattPrice(totalSum)}`;
}

function saveBasket() {
    setArrayToLocalStorage('basket', basket);
    setArrayToLocalStorage('prices', prices);
    setArrayToLocalStorage('amounts', amounts);
}

function calcSum(amount, price) {
    return amount * price;
}

function showBasketOverlay() {
    showElement('basketOverlay');
    hideScrollbar();
}

function hideBasketOverlay() {
    hideElement('basketOverlay');
    showScrollbar();
}

function hideScrollbar() {
    document.querySelector('body').classList.add('overflow-hidden');
}

function showScrollbar() {
    document.querySelector('body').classList.remove('overflow-hidden');
}

