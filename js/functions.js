import { getTiendas, getTienda, deleteTienda } from './requests.js';
import { checkShopName, checkEditShopName, checkShopAdress, checkEditShopAdress, checkShopLocation, checkEditShopLocation, checkShopPhoneNumber, checkEditShopPhoneNumber, checkFormSubmit, checkEditFormSubmit } from './shopForm.js';

const main = document.getElementsByTagName('main')[0];
export var requestTypeValue;
var searchValue = 0;
var error = "border-color: red; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(255, 0, 0, 0.6);";
var success = "border-color: green; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(0, 255, 0, 0.6);";

/**
 * Crea un elemento en el DOM
 * @param {*} element Elemento padre
 * @param {*} child Elemento hijo
 */
export function element(element, child) {
    element.appendChild(document.createElement(child));
}

/**
 * Asigna un attributo a un elemento del DOM
 * @param {*} element Elemento a modificar
 * @param {*} attribute Tipo de atributo
 * @param {*} value Valor del atributo
 */
export function attribute(element, attribute, value) {
    element.setAttribute(attribute, value);
}

/**
 * Inicia/reinicia la aplicación web
 */
export function init() {
    let main = document.getElementsByTagName('main')[0];
    if (main.childElementCount != 0) {
        [...main.children].forEach(e => {
            e.remove();
        });
    }
    requestMenu();
}

/**
 * 
 * @param {*} element 
 * @param {*} elementStyle 
 */
export function elementStyle(element, elementStyle) {
    element.style = elementStyle;
}

function elementText(elementHelp, elementHelpText) {
    elementHelp.textContent = elementHelpText;
}

/**
 * Modifica un elemeneto, su helper y el mensaje
 * @param {*} element 
 * @param {*} elementHelp 
 * @param {*} elementHelpText 
 */
export function inputError(element, elementHelp, elementHelpText) {
    elementStyle(element, error);
    elementText(elementHelp, elementHelpText);
    elementStyle(elementHelp, 'visibility: visible;');
}

/**
 * Modifica un elemento cunado el input es válido
 * @param {*} element 
 * @param {*} elementHelp 
 * @param {*} elementHelpText 
 */
export function inputSuccess(element, elementHelp, elementHelpText) {
    elementStyle(element, success);
    elementText(elementHelp, elementHelpText);
    elementStyle(elementHelp, 'visibility: hidden;');
}

/**
 * Genera el menu inicial
 */
function requestMenu() {
    const buttonContent = ['XHR', 'Fetch', 'jQuery'];
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'requestMenu');
    element(main.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.textContent = 'Elige el método para realizar AJAX';
    for (let i = 0; i < buttonContent.length; i++) {
        element(main.lastElementChild, 'div');
        element(main.lastElementChild.lastElementChild, 'button');
        main.lastElementChild.lastElementChild.lastElementChild.textContent = buttonContent[i];
        main.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => {
            main.firstElementChild.remove();
            requestTypeValue = i;
            mainMenu();
            getTiendas(requestTypeValue);    
        })
    }
}

/**
 * Crea un elemento del formulario
 * @param {*} e Posición en el DOM del elemento
 * @param {*} id Id que se asignará
 * @param {*} text Texto que se asignará
 */
function formElement(e, id, text, pattern, helper) {
    element(e, 'label');
    attribute(e.lastElementChild, 'for', id);
    e.lastElementChild.textContent = text;
    element(e, 'input');
    attribute(e.lastElementChild, 'id', id);
    attribute(e.lastElementChild, 'required', '');
    attribute(e.lastElementChild, 'pattern', pattern);
    element(e, 'small');
    attribute(e.lastElementChild, 'id', helper);
    e.lastElementChild.textContent = '-';
    elementStyle(e.lastElementChild, 'visibility: hidden;');
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
 * @param {*} e Elemento del DOM
 */
export function displayLoader(e) {
    element(e, 'div');
    attribute(e.lastElementChild, 'class', 'loader');
}

/**
 * Borra el loader
 */
export function hideLoader() {
    document.getElementsByClassName('loader')[0].remove();
}

/**
 * Borra las tiendas del main
 */
export function cleanMain() {
    [...document.getElementsByClassName('shop')].forEach(e => { e.remove(); });
}

/**
 * 
 */
export function mainMenu() {
    shopMenu();
    shopForm();
}

/**
 * Crea la lista de tiendas en el DOM
 */
export function listShops(response) {
    response.forEach(e => {
        shop(e);
    });
}

/**
 * Genera una tienda en el DOM 
 */
export function singleShop(response) {
    shop(response);
}

/**
 * Agrega al DOM el menu de tienda
 */
function shopMenu() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'newShopMenu');
    element(main.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild, 'button');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'newShopButton');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = 'Nueva tienda';
    main.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { newShop() });
    element(main.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild, 'input');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'type', 'number');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'placeholder', 'ID de Tienda');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'id', 'searchInput');
    createButton(main.lastElementChild.lastElementChild, 'img/search.svg');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'searchButton');
    main.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { searchButton() });
}

/**
 * Agrega al DOM el formulario de nueva tienda
 */
function shopForm() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'newShopContainer');
    element(main.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.textContent = 'Nueva Empresa';
    element(main.lastElementChild, 'form');
    attribute(main.lastElementChild.lastElementChild, 'id', 'newShopForm');
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    shopFormElement(main.lastElementChild.lastElementChild.lastElementChild, 'nombreTienda', 'Nombre', '^[\\w\\d]{0,}[\\s]{0,1}([\\w\\d]{0,}[\\s]{0,1}){0,}[^ -]$', 'nombreTiendaHelper');
    document.getElementById('nombreTienda').addEventListener('input', ()=> { checkShopName() });
    shopFormElement(main.lastElementChild.lastElementChild.lastElementChild, 'direccion', 'Dirección', '^[A-Za-z]*(\\s?[A-Za-z]*[0-9]*)*[^\\s]$', 'direccionHelper');
    document.getElementById('direccion').addEventListener('input', ()=> { checkShopAdress() });
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    shopFormElement(main.lastElementChild.lastElementChild.lastElementChild, 'localidad', 'Localidad', '^[A-Za-z]{0,}([ ]{0,1}[A-Za-z]{0,}){0,}[^ ]$', 'localidadHelper');
    document.getElementById('localidad').addEventListener('input', ()=> { checkShopLocation() });
    shopFormElement(main.lastElementChild.lastElementChild.lastElementChild, 'telefono', 'Teléfono', '^[689]\\d{8}$', 'telefonoHelper');
    document.getElementById('telefono').addEventListener('input', ()=> { checkShopPhoneNumber() });
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRowSubmit');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'input');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'type', 'submit');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'value', 'Añadir Tienda');
    attribute(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'id', 'addShopButton');
    document.getElementById('addShopButton').addEventListener('click', (e) => { checkFormSubmit(e); });
}

/**
 * Crea un elemento del formulario con formato especificado
 * @param {*} container Contenedor padre
 * @param {*} id Id del input
 * @param {*} label Label que acompaña al input
 * @param {*} regexp Expresión regular del input
 * @param {*} idHelper Id del helper
 */
function shopFormElement(container, id, label, regexp, idHelper) {
    element(container, 'div');
    formElement(container.lastElementChild, id, label, regexp, idHelper);
}

/**
 * Agrega al DOM una tienda
 * @param {*} e Elemento del response
 */
export function shop(e) {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'shop');
    attribute(main.lastElementChild, 'id', e.idTienda);
    element(main.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild, 'class', 'shopHeader');
    element(main.lastElementChild.lastElementChild, 'div');
    element(main.lastElementChild.lastElementChild.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.textContent = e.nombreTienda;
    element(main.lastElementChild.lastElementChild, 'div');
    createButton(main.lastElementChild.lastElementChild.lastElementChild, 'img/pencil-square.svg');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { editShop(e) });
    createButton(main.lastElementChild.lastElementChild.lastElementChild, 'img/trash-fill.svg');
    main.lastElementChild.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { deleteShop(e) });
    element(main.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild, 'class', 'shopBody');
    element(main.lastElementChild.lastElementChild, 'p');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = "Dirección: " + e.direccion + ' (' + e.localidad + ')';
    element(main.lastElementChild.lastElementChild, 'p');
    main.lastElementChild.lastElementChild.lastElementChild.textContent = "Teléfono: " + e.telefono;
}

/**
 * Agrega al DOM el mensage de tienda no encontrada
 */
export function notFound() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'shop');
    element(main.lastElementChild, 'h1');
    main.lastElementChild.lastElementChild.textContent = 'Tienda no encontrada';
}

/**
 * Despliega el formulario para crear una nueva tienda
 */
function newShop() {
    let container = document.getElementsByClassName('newShopContainer')[0];
    if(container.style.display == 'none') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

/**
 * 
 * @param {*} e Evento
 * @param {*} s Fuente
 */
function editShop(e) {
    let idTienda = e.idTienda;
    let shop = document.getElementById(idTienda);

    // Si el formulario existe, lo borra
    if(document.getElementById('editShopContainer') != null) {
        document.getElementById('editShopContainer').remove();
    }

    // General el formulario
    element(shop, 'div');
    attribute(shop.lastElementChild, 'id', 'editShopContainer');
    attribute(shop.lastElementChild, 'class', 'newShopContainer');
    element(shop.lastElementChild, 'h1');
    shop.lastElementChild.lastElementChild.textContent = 'Editar Empresa';
    element(shop.lastElementChild, 'form');
    attribute(shop.lastElementChild.lastElementChild, 'id', 'editShopForm');
    element(shop.lastElementChild.lastElementChild, 'div');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    shopFormElement(shop.lastElementChild.lastElementChild.lastElementChild, 'editNombreTienda', 'Nombre', '^[\\w\\d]{0,}[\\s]{0,1}([\\w\\d]{0,}[\\s]{0,1}){0,}[^ -]$', 'editNombreTiendaHelper');
    document.getElementById('editNombreTienda').addEventListener('input', ()=> { checkEditShopName() });
    shopFormElement(shop.lastElementChild.lastElementChild.lastElementChild, 'editDireccion', 'Dirección', '^[A-Za-z]*(\\s?[A-Za-z]*[0-9]*)*[^\\s]$', 'editDireccionHelper');
    document.getElementById('editDireccion').addEventListener('input', ()=> { checkEditShopAdress() });
    element(shop.lastElementChild.lastElementChild, 'div');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    shopFormElement(shop.lastElementChild.lastElementChild.lastElementChild, 'editLocalidad', 'Localidad', '^[A-Za-z]{0,}([ ]{0,1}[A-Za-z]{0,}){0,}[^ ]$', 'editLocalidadHelper');
    document.getElementById('editLocalidad').addEventListener('input', ()=> { checkEditShopLocation() });
    shopFormElement(shop.lastElementChild.lastElementChild.lastElementChild, 'editTelefono', 'Teléfono', '^[689]\\d{8}$', 'editTelefonoHelper');
    document.getElementById('editTelefono').addEventListener('input', ()=> { checkEditShopPhoneNumber() });
    element(shop.lastElementChild.lastElementChild, 'div');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRowSubmit');
    element(shop.lastElementChild.lastElementChild.lastElementChild, 'input');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'type', 'submit');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'value', 'Editar Tienda');
    attribute(shop.lastElementChild.lastElementChild.lastElementChild.lastElementChild, 'id', 'editShopButton');
    document.getElementById('editShopButton').addEventListener('click', (e) => { checkEditFormSubmit(e, idTienda); });

    // Agrega información de la tienda al formulario
    document.getElementById('editNombreTienda').value = e.nombreTienda;
    document.getElementById('editDireccion').value = e.direccion;
    document.getElementById('editLocalidad').value = e.localidad;
    document.getElementById('editTelefono').value = e.telefono;
}

/**
 * Borra una tienda pidiendo confirmación
 * @param {*} e Evento
 */
function deleteShop(e) {
    confirm('¿Seguro que quiere borrar la tienda ' + e.nombreTienda + '?') ? deleteTienda(requestTypeValue, e.idTienda) : null;
}

/**
 * 
 */
function searchButton() {
    let searchButton = document.getElementsByClassName('searchButton')[0];
    if(document.getElementById('searchInput').value != '' && searchValue == 0) {
        searchButton.disabled = true;
        searchButton.lastElementChild.remove();
        displayLoader(searchButton);
        let loader = document.getElementsByClassName('loader')[0];
        loader.style = "height: 8px; width: 8px;"
        getTienda(requestTypeValue)
        searchValue++;
    } else if(searchValue == 1) {
        searchButton.textContent = '';
        element(searchButton, 'img');
        attribute(searchButton.lastElementChild, 'src', 'img/search.svg');
        getTiendas(requestTypeValue);
        searchValue--;
    }
}
