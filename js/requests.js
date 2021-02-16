import { displayLoader, hideLoader, listShops, cleanMain, singleShop, notFound, element, attribute } from './functions.js';

//const tiendas = 'http://192.168.1.38:8080/EmprInfRs_ArteagaAiram/api/tiendas';
const tiendas = 'https://webapp-210130211157.azurewebsites.net/webresources/mitienda/';
const xhr = new XMLHttpRequest();
const main = document.getElementsByTagName('main')[0];

/**
 * Busca todas las tiendas
 * @param {*} requestTypeValue 
 */
export function getTiendas(requestTypeValue) {
    cleanMain();
    displayLoader(main);
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    listShops(JSON.parse(xhr.response));
                    hideLoader();
                }
            }
            xhr.timeout = 5000;
            xhr.ontimeout = function () {
                notFound()
                hideLoader()
            }
            xhr.open('GET', tiendas);
            xhr.send();
            break;
        // FETCH
        case 1:
            console.log('getTiendas con Fetch')
            fetch(new Request(tiendas)).then(response => {
                return response.text();
            }).then(response => {
                hideLoader();
                listShops(JSON.parse(response));
            })
            break;
        // JQUERY
        case 2:
            console.log('getTiendas con JQuery')
            $.ajax({
                url: tiendas,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    hideLoader();
                    listShops(json);
                }
            })
            break;
    }
}

/**
 * Busca una tienda por ID
 */
export function getTienda(requestTypeValue) {
    cleanMain();
    let id = document.getElementById('searchInput').value;
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    singleShop(JSON.parse(xhr.response))
                    hideLoader()
                    let searchButton = document.getElementsByClassName('searchButton')[0];
                    searchButton.textContent = 'X';
                }
            }
            xhr.open('GET', tiendas + '/' + id);
            xhr.send();
            break;
        // FETCH
        case 1:
            fetch(new Request(tiendas + '/' + id)).then(response => {
                return response.text();
            }).then(response => {
                singleShop(JSON.parse(response));
                hideLoader();
                let searchButton = document.getElementsByClassName('searchButton')[0];
                searchButton.textContent = 'X';
        })
            break;
        // JQUERY
        case 2:
            $.ajax({
                url: tiendas + '/' + id,
                type: 'GET',
                dataType: 'json',
                success: function (json) {
                    singleShop(json);
                    hideLoader();
                    let searchButton = document.getElementsByClassName('searchButton')[0];
                    searchButton.textContent = 'X';
                }
            })
            break;
    }
}

/**
 * Funcion para agregar una tienda
 * @param {*} requestTypeValue Tipo de petición
 * @param {*} formData Contenido del formulario
 */
export function postTienda(requestTypeValue, formData) {
    cleanMain();
    displayLoader(main);
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    hideLoader()
                    getTiendas(requestTypeValue)
                }
            }
            xhr.open('POST', tiendas);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(formData));
            break;
        // FETCH
        case 1:
            fetch(tiendas, {
                method: 'POST',
                //mode: 'no-cors',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                hideLoader(),
                getTiendas(requestTypeValue)
            )
            break;
        // JQUERY
        case 2:
            $.ajax({
                url: tiendas,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(formData),
                success: function () {
                    hideLoader()
                    getTiendas(requestTypeValue)
                }
            })
            break;
    }
}


/**
 * Función para editar una tienda especifica
 * @param {*} requestTypeValue Tipo de petición
 * @param {*} formData Contenido del formulario
 */
export function putTienda(requestTypeValue, formData) {
    cleanMain();
    displayLoader(main);
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    hideLoader();
                    getTiendas(requestTypeValue);
                }
            }
            xhr.open('PUT', tiendas);
            xhr.send(JSON.stringify(formData));
            break;
        // FETCH
        case 1:
            fetch(tiendas, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(formData)
            }).then(
                hideLoader(),
                getTiendas(requestTypeValue)
            )
            break;
        //JQUERY
        case 2:
            $.ajax({
                url: tiendas,
                type: 'PUT',
                dataType: 'json',
                data: JSON.stringify(formData),
                success: () => {
                    hideLoader();
                    getTiendas(requestTypeValue)
                }
            })
            break;
    }
}

/**
 * Borra una tienda especifica (No funciona en la aplicacion de Inma)
 * @param {*} requestTypeValue Tipo de petición
 * @param {*} id Id de la tienda
 */
export function deleteTienda(requestTypeValue, id) {
    cleanMain();
    displayLoader(main);
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    hideLoader();
                    getTiendas(requestTypeValue);
                }
            }
            xhr.open('DELETE', tiendas + '/' + id);
            xhr.send();
            break;
        // FETCH
        case 1:
            fetch(tiendas + '/' + id, {
                method: 'DELETE',
                mode: 'cors'
            }).then(
                hideLoader(),
                getTiendas(requestTypeValue)
            )
            break;
        // JQUERY
        case 2:
            $.ajax({
                url: tiendas + '/' + id,
                type: 'DELETE',
                success: () => {
                    hideLoader();
                    getTiendas(requestTypeValue);
                }
            })
            break;
    }

}
