import { db, ui } from '../funciones.js';
import { formulario } from '../selectores.js';

class Citas {

    constructor() {}

    // Insertar Registro DB
    insertarRegistroDB(citaObj) {
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
    editarCitaDB(citaObj) {
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
        }

        transaction.onerror = () => {
            ui.imprimirAlerta('Hubo un error', 'error');
        }
    }

    // Eliminar CIta DB
    eliminarCitaDB(id) {
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
}

export default Citas;