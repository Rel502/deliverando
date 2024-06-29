function returnFood(name, price, i) {
    return /*html*/`
        <div id="card" onclick="handleCardClick(event, '${name}', ${price}, ${i})" class="card">

        <div class="d-flex drctn-col vert-gap-card">
            <div class="d-flex">
                <h3 class="reset-mbse">${name}</h3>
                <img id="cardInfo${i}" onclick="handleCardInfoClick(event)" class="icons pointer" src="./assets/img/01_icons/info.png" alt="Info">
            </div>
            <p><span>${formattPrice(price)}</span> €</p>
        </div>

        <img class="add-icon pointer"
            src="./assets/img/01_icons/add.png" alt="Hinzufügen">
        </div>
    `;
}

function returnBasketHTML(dish, amount, price, i) {
    if (amount < 1) {
        return '';
    } else {
        return /*html*/`
        <div class="d-flex jstf-spc-btwn sctn-pad">
            <div class="d-flex algn-base gap-s">
                <span>${amount}</span>
                <p>${dish}</p>
            </div>
            <div>
                ${calcSum(amount, price).toFixed(2).replace('.', ',')} €
            </div>
        </div>
        <!---------------------------------->
        <!-- 2) REDUCE <> INCREASE AMOUNT -->
        <div class="d-flex jstf-end">
            <div class="d-flex algn-c jstf-spc-around gap-m">
                <!-- DECREASE AMOUNT -->
                <img onclick="decreaseAmount(${i})" class="pointer" src="./assets/img/01_icons/minus.png" alt="Menge reduzieren">
                <span>${amount}</span>
                <!-- INCREASE AMOUNT -->
                <img onclick="increaseAmount(${i})" class="pointer" src="./assets/img/01_icons/add.png" alt="Menge erhöhen">
            </div>
        </div>
        <!-- INFOBOX: MINIMUM ORDER AMOUNT NOT REACHED -->
         <div id="infoBoxBasket" class="infobox-basket d-none">
            <p>Leider kannst du noch nicht bestellen. 
               Athenos liefert erst ab einem Mindestbestellwert von 9,99 € (exkl. Lieferkosten).
            </p>
         </div>
    `;
    }
}

function returnBasketAccounting(sum, totalSum) {
    return /*html*/ `
    <table class="sctn-mar">
        <tr>
            <td>Zwischensumme</td>
            <td><span id="subTotal">${formattPrice(sum)}</span> €</td>
        </tr>
        <tr>
            <td>Lieferkosten</td>
            <td><span id="deliveryCosts">1,29</span> €</td>
        </tr>
        <tr>
            <td><b>Gesamt</b></td>
            <td><span id="totalPrice">${formattPrice(totalSum)}</span> €</td>
        </tr>
    </table>
    <!-- ACTIVE BUTTON -->
    <button id="activePayBtn" onclick="showOrderComplete()" class="pay-btn d-none">
        <h2>Bezahlen (<span id="payBtnSum">${formattPrice(totalSum)}</span>€)</h2>
    </button>
    <!-- INACTIVE BUTTON -->
    <button id="inactivePayBtn" class="pay-btn inactive-btn d-none">
        <h2>Bezahlen (<span id="payBtnSum">${formattPrice(totalSum)}</span>€)</h2>
    </button>
`;
}

function returnPlaceholder() {
    return /*html*/ `
        <div class="d-flex drctn-col algn-c mtb-50 gap-m">
            <img src="./assets/img/01_icons/basket.png" alt="Warenkorb">
            <h3>Warenkorb leer</h3>
            <p class="txt-algn-c">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
        </div>
    `;
}

function returnToBaskedBar() {
    return /*html*/ `
        <button onclick="showBasketOverlay()" class="basket-btn">
            <div class="pos-relative">
                <div class="basket-counter">${updateBasketCounter()}</div>
                <img class="icons" src="./assets/img/01_icons/basket.png" alt="Warenkorb">
            </div>
            
            <h2>Warenkorb (<span id="toBasketBtnMobile">...</span> €)</h2>
        </button>
    `;
}