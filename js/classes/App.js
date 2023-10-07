import { datosCita, nuevaCita } from '../funciones.js'; 
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario,
} from '../selectores.js';

class App {

    constructor() {
        this.initApp();
    }

    initApp() {
        // Se ejecuta cuando cargue el documento
        window.onload = () => {
            // Ejecutamos los eventos
            this.eventListeners();

            // Crear DB
            this.crearDB();
        }
    }

    eventListeners() {
        // Inputs
        mascotaInput.addEventListener('input', datosCita);
        propietarioInput.addEventListener('input', datosCita);
        telefonoInput.addEventListener('input', datosCita);
        fechaInput.addEventListener('input', datosCita);
        horaInput.addEventListener('input', datosCita);
        sintomasInput.addEventListener('input', datosCita);

        // Formulario
        formulario.addEventListener('submit', nuevaCita);
    }

    crearDB() {
        // Crear DB en version 1.0
        const crearDB = window.indexedDB.open('citas', 1);

        // Si hay error
        crearDB.onerror = function() {
            console.log('Error al crear DB');
        }

        // Si se creo bien
        crearDB.onsuccess = function() {
            console.log('DB Creada');
        }

        // Configuracion de DB
        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            // Crear tablae y id
            const objectStore = db.createObjectStore('citas', {
                keyPath: 'id',
                autoIncrement: true
            });

            // Definir todas las columnas
            objectStore.createIndex('mascota', 'mascota', {unique: false});
            objectStore.createIndex('propietario', 'propietario', {unique: false});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('fecha', 'fecha', {unique: false});
            objectStore.createIndex('hora', 'hora', {unique: false});
            objectStore.createIndex('sintomas', 'sintomas', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('Columnas creadas');
        }
    }

}

export default App;