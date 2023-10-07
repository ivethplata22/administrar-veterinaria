import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import DB from './classes/DB.js';

import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
} from './selectores.js';

// Variables
let editando = false;

// Objeto Prinicial con Informacion
const citaObj = {
    id: '',
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Instanciar
export const ui = new UI();
const administrarCitas = new Citas();
export const db = new DB();

// Agregar Datos al Objeto
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Registar nueva cita
export function nuevaCita(e) {

    e.preventDefault();

    // Extraer informacion objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(!editando) {
        crearCita();
    } else {
        editarCita();
    }

    // Reiniciar Objeto
    reiniciarObjeto();

    // Resetear Formulario
    formulario.reset();

    // Mostrar el HTML
    ui.imprimirCitas();

}

// Crear la Cita
function crearCita() {
    // ID Unico
    citaObj.id = Date.now();

    // Insertar Registro en DB
    insertarRegistroDB({...citaObj});

    // Mensaje
    ui.imprimirAlerta('Cita creada', 'exito');
}

// Editar la Cita
function editarCita() {

    // Editar Cita en DB
    editarCitaDB({...citaObj});

}

// Reinicia el Objeto de informacion de formulario
function reiniciarObjeto() {
    citaObj.id = '';
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

// Eliminar la cita
export function eliminarCita(id) {
    
    // Elimina Cita DB
    eliminarCitaDB(id);
}

// Cargar datos y modo edicion
export function cargarEdicion(cita) {
    
    editando = true;

    const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cita;

    // Llenar los input HTML
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenar el citaObj
    citaObj.id = id;
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;

    // Editar Boton
    const btnSubmit = formulario.querySelector('button[type="submit"]');
    btnSubmit.textContent = 'Guardar Cita';
    btnSubmit.classList.add('btn-info');
}

// Insertar Registro DB
function insertarRegistroDB(citaObj) {
    const transaction = db.data.transaction(['citas'], 'readwrite');

    // Obtener objetos de almacenamiento
    const objectStore = transaction.objectStore('citas');

    // Agregar Cita DB
    objectStore.add(citaObj);

    // Si funciono bien
    transaction.oncomplete = function() {
        ui.imprimirAlerta('Se agrego correctamente', 'exito');
    }

    // Error
    transaction.onerror = function() {
        ui.imprimirAlerta('Error al agregar la cita', 'error');
    }
}

// Editar Cita DB
function editarCitaDB(citaObj) {
    const transaction = db.data.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');

    objectStore.put(citaObj);

    transaction.oncomplete = () => {
        // Mensaje
        ui.imprimirAlerta('Cita guardada', 'exito');

        // Editar Boton
        const btnSubmit = formulario.querySelector('button[type="submit"]');
        btnSubmit.textContent = 'Crear Cita';
        btnSubmit.classList.remove('btn-info');

        // Modo Editar
        editando = false;
    }

    transaction.onerror = () => {
        ui.imprimirAlerta('Hubo un error', 'error');
    }
}

// Eliminar CIta DB
function eliminarCitaDB(id) {
    const transaction = db.data.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');

    objectStore.delete(id);

    transaction.oncomplete = () => {
        // Muestre un mensaje
        ui.imprimirAlerta('Cita eliminada', 'exito');

        // Refrescar las citas
        ui.imprimirCitas();
    }

    transaction.onerror = () => {
        ui.imprimirAlerta('Hubo un error', 'error');
    }
}