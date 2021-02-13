import { displayLoader, hideLoader, shopList, cleanMain, singleShop } from './functions.js';

const tiendas = 'http://192.168.1.38:8080/EmprInfRs_ArteagaAiram/api/tiendas';
const xhr = new XMLHttpRequest();
const request = new Request(tiendas);

/**
 * Busca todas las tiendas
 * @param {*} requestTypeValue 
 */
export function getTiendas(requestTypeValue) {
    cleanMain();
    displayLoader();
    switch (requestTypeValue) {
        // XHR
        case 0:
            console.log('getTiendas con XHR');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    shopList(JSON.parse(xhr.response));
                    hideLoader();
                }
            }
            xhr.open('GET', tiendas);
            xhr.send();
            break;
        // FETCH
        case 1:
            console.log('getTiendas con Fetch')
            fetch(request).then(response => {
                return response.text();
            }).then(response => {
                hideLoader();
                shopList(JSON.parse(response));
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
                    shopList(json);
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
    displayLoader();
    let id = document.getElementsByClassName('searchInput')[0].value;
    switch (requestTypeValue) {
        // XHR
        case 0:
            console.log('getTienda con XHR');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    singleShop(JSON.parse(xhr.response));
                    hideLoader();
                }
            }
            xhr.open('GET', tiendas + '/' + id);
            xhr.send();
            break;
    }
}

export function postTienda(requestTypeValue, formData) {
    cleanMain();
    displayLoader();
    switch (requestTypeValue) {
        // XHR
        case 0:
            console.log('postTienda con XHR')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    hideLoader();
                    getTiendas(requestTypeValue);
                }
            }
            xhr.open('POST', tiendas);
            xhr.send(JSON.stringify(formData));
            break;
    }
}

export function putTienda() {

}

export function deleteTienda(requestTypeValue, id) {
    cleanMain();
    displayLoader();
    switch (requestTypeValue) {
        // XHR
        case 0:
            console.log('deleteTienda con XHR')
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    hideLoader();
                    getTiendas(requestTypeValue);
                }
            }
            xhr.open('DELETE', tiendas + '/' + id);
            xhr.send();
            break;
    }

}
