import { displayLoader, hideLoader, listShops as listShops, cleanMain, singleShop } from './functions.js';

const tiendas = 'http://192.168.1.38:8080/EmprInfRs_ArteagaAiram/api/tiendas';
const xhr = new XMLHttpRequest();
//const request = new Request(tiendas);

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
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    listShops(JSON.parse(xhr.response));
                    hideLoader();
                }
            }
            xhr.timeout = 5000;
            xhr.ontimeout = function (e) {
                console.log(e)
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
    displayLoader();
    let id = document.getElementById('searchInput').value;
    switch (requestTypeValue) {
        // XHR
        case 0:
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    singleShop(JSON.parse(xhr.response));
                    hideLoader();
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
                }
            })
            break;
    }
}

export function postTienda(requestTypeValue, formData) {
    cleanMain();
    displayLoader();
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
            xhr.send(JSON.stringify(formData));
            break;
        // FETCH
        case 1:
            fetch(tiendas, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(formData)
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
                data: JSON.stringify(formData),
                success: function () {
                    hideLoader()
                    getTiendas(requestTypeValue)
                }
            })
            break;
    }
}

export function putTienda(requestTypeValue, formData) {
    cleanMain();
    displayLoader();
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

export function deleteTienda(requestTypeValue, id) {
    cleanMain();
    displayLoader();
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
