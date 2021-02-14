import { requestTypeValue, inputError, inputSuccess } from './functions.js';
import { postTienda, putTienda } from './requests.js';

export function checkShopName() {
    let input = document.getElementById('nombreTienda');
    let helper = document.getElementById('nombreTiendaHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'El nombre puede estar compuesto por letras, números y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkEditShopName() {
    let input = document.getElementById('editNombreTienda');
    let helper = document.getElementById('editNombreTiendaHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'El nombre puede estar compuesto por letras, números y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkShopAdress() {
    let input = document.getElementById('direccion');
    let helper = document.getElementById('direccionHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'La dirección puede estar compuesta por letras, números y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkEditShopAdress() {
    let input = document.getElementById('editDireccion');
    let helper = document.getElementById('editDireccionHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'La dirección puede estar compuesta por letras, números y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkShopLocation() {
    let input = document.getElementById('localidad');
    let helper = document.getElementById('localidadHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'La localidad puede estar por letras y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}


export function checkEditShopLocation() {
    let input = document.getElementById('editLocalidad');
    let helper = document.getElementById('editLocalidadHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'La localidad puede estar por letras y espacios. No puede terminar en espacios.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkShopPhoneNumber() {
    let input = document.getElementById('telefono');
    let helper = document.getElementById('telefonoHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'El número de telefono ha de empezar por 6, 8 o 9. Solo puede tener números.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkEditShopPhoneNumber() {
    let input = document.getElementById('editTelefono');
    let helper = document.getElementById('editTelefonoHelper');
    if (input.validity.valueMissing) {
        inputError(input, helper, 'Campo obligatorio');
    } else if (input.validity.patternMismatch) {
        inputError(input, helper, 'El número de telefono ha de empezar por 6, 8 o 9. Solo puede tener números.');
    } else {
        inputSuccess(input, helper, '-');
    }
}

export function checkFormSubmit(e) {
    e.preventDefault();
    let form = document.getElementById('newShopForm');
    if (form.checkValidity()) {
        let formData = {
            "nombreTienda": document.getElementById('nombreTienda').value,
            "direccion": document.getElementById('direccion').value,
            "localidad": document.getElementById('localidad').value,
            "telefono": document.getElementById('telefono').value
        };
        postTienda(requestTypeValue, formData);
        form.reset();
    } else {
        checkShopName();
        checkShopAdress();
        checkShopLocation();
        checkShopPhoneNumber();
    }
}

export function checkEditFormSubmit(e, idTienda) {
    e.preventDefault();
    let form = document.getElementById('editShopForm');
    if (form.checkValidity()) {
        let formData = {
            "idTienda": idTienda,
            "nombreTienda": document.getElementById('editNombreTienda').value,
            "direccion": document.getElementById('editDireccion').value,
            "localidad": document.getElementById('editLocalidad').value,
            "telefono": document.getElementById('editTelefono').value
        };
        putTienda(requestTypeValue, formData);
        form.reset();
    } else {
        console.log(e)
        checkEditShopName();
        checkEditShopAdress();
        checkEditShopLocation();
        checkEditShopPhoneNumber();
    }
}
