import { getTiendas, getTienda, deleteTienda } from './requests.js';
import { checkShopName, checkShopAdress, checkShopLocation, checkShopPhoneNumber, checkFormSubmit } from './shopForm.js';

const main = document.getElementsByTagName('main')[0];
export var requestTypeValue;
var error = "border-color: red; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(255, 0, 0, 0.6);";
var success = "border-color: green; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset, 0 0 8px rgba(0, 255, 0, 0.6);";

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
 */
export function displayLoader() {
    element(main, 'div');
    attribute(main.lastElementChild, 'class', 'loader');
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
    [...document.getElementsByClassName('shop')].forEach(e => { e.remove() })
}

/**
 * Crea la lista de tiendas en el DOM
 */
export function shopList(response) {
    shopMenu();
    shopForm();
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
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'type', 'text');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'placeholder', 'ID de Tienda');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'searchInput');
    createButton(main.lastElementChild.lastElementChild, 'img/search.svg');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'searchButton');
    main.lastElementChild.lastElementChild.lastElementChild.addEventListener('click', () => { getTienda(requestTypeValue) });
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
    shopFormElement('nombreTienda', 'Nombre', '^[\\w\\d]{0,}[\\s]{0,1}([\\w\\d]{0,}[\\s]{0,1}){0,}[^ -]$', 'nombreTiendaHelper');
    document.getElementById('nombreTienda').addEventListener('input', ()=> { checkShopName() });
    shopFormElement('direccion', 'Dirección', '^[A-Za-z]*(\\s?[A-Za-z]*[0-9]*)*[^\\s]$', 'direccionHelper');
    document.getElementById('direccion').addEventListener('input', ()=> { checkShopAdress() });
    element(main.lastElementChild.lastElementChild, 'div');
    attribute(main.lastElementChild.lastElementChild.lastElementChild, 'class', 'formRow');
    shopFormElement('localidad', 'Localidad', '^[A-Za-z]{0,}([ ]{0,1}[A-Za-z]{0,}){0,}[^ ]$', 'localidadHelper');
    document.getElementById('localidad').addEventListener('input', ()=> { checkShopLocation() });
    shopFormElement('telefono', 'Teléfono', '^[689]\\d{8}$', 'telefonoHelper');
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
 * @param {*} id Id del input
 * @param {*} label Label que acompaña al input
 * @param {*} regexp Expresión regular del input
 * @param {*} idHelper Id del helper
 */
function shopFormElement(id, label, regexp, idHelper) {
    element(main.lastElementChild.lastElementChild.lastElementChild, 'div');
    formElement(main.lastElementChild.lastElementChild.lastElementChild.lastElementChild, id, label, regexp, idHelper);
}

/**
 * Agrega al DOM una tienda
 * @param {*} e Elemento del response
 */
export function shop(e) {
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
function deleteShop(e) {
    console.log(e);
    confirm('¿Seguro que quiere borrar la tienda' + e.nombreTienda + '?') ? deleteTienda(requestTypeValue, e.idTienda) : null;
}
