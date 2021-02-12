const main = document.getElementsByTagName('main')[0];
const tiendas = 'http://192.168.1.38:8080/EmprInfRs_ArteagaAiram/api/tiendas';

/**
 * Crea un elemento en el DOM
 * @param {*} element Elemento padre
 * @param {*} child Elemento hijo
 */
function element(element, child) {
    element.appendChild(document.createElement(child));
}

/**
 * Asigna un attributo a un elemento del DOM
 * @param {*} element Elemento a modificar
 * @param {*} attribute Tipo de atributo
 * @param {*} value Valor del atributo
 */
function attribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}

/**
 * Crea un elemento del formulario
 * @param {*} e Posición en el DOM del elemento
 * @param {*} id Id que se asignará
 * @param {*} text Texto que se asignará
 */
function formElement(e, id, text) {
    element(e, 'label');
    attribute(e.lastElementChild, 'for', id);
    e.lastElementChild.textContent = text;
    element(e, 'input');
    attribute(e.lastElementChild, 'id', id);
}

/**
 * Agrega iconos
 * @param {*} e Posición en el DOM del elemento
 * @param {*} iconSrc URL del icono
 */
function createButton(e, iconSrc) {
    element(e, 'button');
    element(e.lastElementChild, 'img');
    attribute(e.lastElementChild.lastElementChild, 'src', iconSrc);
}

/**
 * Muestra el loader
 */
function displayLoader() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'loader');
}

/**
 * Borra el loader
 */
function hideLoader() {
    document.getElementsByClassName('loader')[0].remove();
}

/**
 * Genera los botones del menú
 */
const buttonContent = ['XHR', 'Fetch', 'jQuery'];
element(main, 'div');
attribute(main.lastElementChild, 'class', 'requestMenu');
element(main.lastElementChild, 'h1');
main.lastElementChild.lastElementChild.textContent = 'Elige el método para realizar AJAX';
for (let i = 0; i < buttonContent.length; i++) {
    element(main.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild, 'button');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'id', i);
    main.lastElementChild.lastElementChild.lastElementChild.textContent = buttonContent[i];
}

/**
 * Agrega listener a los botones del inicio
 */
[...document.getElementsByTagName('button')].forEach(e => {
    e.addEventListener('click', () => {
        main.firstElementChild.remove();
        switch (+e.id) {
            case 0:
                selectXHR();
                break;
            case 1:
                selectFetch();
                break;
            case 2:
                selectJQuery();
                break;
        }
    })
})

/**
 * Agrega al DOM el menu de tienda
 */
function shopMenu() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'newShopContainer');
    element(main.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild, 'button');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'newShopButton');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = 'Nueva tienda';
    main.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { newShop() });
    element(main.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild, 'input');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'type', 'text');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'placeholder', 'ID de Tienda');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'searchInput');
    createButton(main.lastElementChild.lastElementChild, 'img/search.svg');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'searchButton');
}

/**
 * Agrega al DOM el formulario de nueva tienda
 */
function shopForm() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'newShopForm');
    element(main.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.textContent = 'Nueva Empresa';
    element(main.lastElementChild, 'form');
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'div');
    formElement(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'nombreTienda', 'Nombre');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'div');
    formElement(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'direccion', 'Dirección');
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'div');
    formElement(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'localidad', 'Localidad');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'div');
    formElement(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'telefono', 'Teléfono');
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRowSubmit');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'input');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'type', 'submit');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'value', 'Añadir Tienda');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'id', 'addShopButton');
}

/**
 * Agrega al DOM una tienda
 * @param {*} e Elemento del response
 */
function shop(e) {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'shop');
    element(main.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild, 'class', 'shopHeader');
    element(main.lastElementChild.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.textContent = e.nombreTienda;
    element(main.lastElementChild.lastElementChild, 'div');
    createButton(main.lastElementChild.lastElementChild.lastElementChild, 'img/pencil-square.svg');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { editShop(e.idTienda) });
    createButton(main.lastElementChild.lastElementChild.lastElementChild, 'img/trash-fill.svg');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { deleteShop(e.idTienda) });
    element(main.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild, 'class', 'shopBody');
    element(main.lastElementChild.lastElementChild, 'p');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = "Dirección: " + e.direccion + ' (' + e.localidad + ')';
    element(main.lastElementChild.lastElementChild, 'p');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = "Teléfono: " + e.telefono;
}

/**
 * Crea la lista de tiendas en el DOM
 */
function shopList(response) {
    shopMenu();
    shopForm();
    response.forEach(e => {
        shop(e);
    });
}

/**
 * Función que muestra todas las tiendas con XHR
 */
function selectXHR() {
    displayLoader();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', tiendas, true);
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                hideLoader();
                shopList(JSON.parse(xhr.response));
            }
        }
    }
    xhr.send();
}

/**
 * Función que muestra todas las tiendas con Fetch
 */
function selectFetch() {
    displayLoader();
    let request = new Request(tiendas);
    fetch(request).then(response => {
        return response.text();
    }).then(response => {
        hideLoader();
        shopList(JSON.parse(response));
    })
}

/**
 * Función que muestra todas las tiendas con jQuery
 */
function selectJQuery() {
    displayLoader();
    $.ajax({
        url: tiendas,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            hideLoader();
            shopList(json);
        }
    })
}

/**
 * Despliega el formulario para crear una nueva tienda
 */
function newShop() {
    console.log('New shop')
}

/**
 * Edita una tienda (Incompleto)
 * @param {*} idTienda 
 */
function editShop(idTienda) {
    console.log('Edit shop: ' + idTienda)
}

/**
 * Borra una tienda (Incompleto)
 * @param {*} idTienda 
 */
function deleteShop(idTienda) {
    console.log('Delete shop: ' + idTienda)
}
