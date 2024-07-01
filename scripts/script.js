function init() {
    includeHTML();
    renderFood();
    renderBasket();
    changeLikeIcon();
}

let isLiked = false;

function toggleLike() {
    isLiked = !isLiked;

    setArrayToLocalStorage('isLiked', isLiked);
    changeLikeIcon();
}

function changeLikeIcon() {
    let likeIcon = document.getElementById('likeIcon');

    isLiked = getArrayFromLocalStorage('isLiked');
    
    if (isLiked) {
        likeIcon.src = "./assets/img/01_icons/heart.png";
    } else {
        likeIcon.src = "./assets/img/01_icons/like.png";
    }
}

function renderFood() { /*<--- Categories with bg-image */
    let content = document.getElementById('foodContent');
    clearInnerHTML('foodContent');

    for (let i = 0; i < food.length; i++) {
        const foodObj = food[i];
        const category = foodObj['category'];

        content.innerHTML += returnFoodCategory(category, i);
        renderFoodContent(content, foodObj, i);

    }
}

function renderFoodContent(content, foodObj, i) { /*<--- Dishes, description, price */
    for (let j = 0; j < foodObj['dishes'].length; j++) {
        const dish = foodObj['dishes'][j];
        const price = foodObj['prices'][j];
        const description = foodObj['descriptions'][j];
        content.innerHTML += returnDishes(dish, price, description, i);
    }
}

function handleCardClick(event, dish, price, i) {
    if (event.target.classList.contains('icons')) {
        return;
    }

    addToBasket(dish, price, i);
}

function handleCardInfoClick(event) {
    event.stopPropagation();
}

function addToBasket(dish, price, i) {
    let index = basket.indexOf(dish);

    if (index == -1) {
        basket.push(dish);
        prices.push(price);
        amounts.push(1);
    } else {
        amounts[index]++;   
    }

    saveBasket();
    renderBasket();
}

function deleteFromBasket(position) {
    basket.splice(position, 1);
    prices.splice(position, 1);
    amounts.splice(position, 1);

    saveBasket();
    renderBasket();
}

let basket = [];
let prices = [];
let amounts = [];

let fee = 1.29;     

function renderBasket() {
    let sum = 0;    /*<--- Product of price & amount for each dish */

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
        renderBasketAccounting(sum);
    }

    updateBasketCounter();  /*<--- displayed on mobile devices / sticky button */
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
    clearInnerHTML('toBasketBar');  
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