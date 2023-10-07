class DB {
    
    constructor() {
        this.data = null;
    }

    crearDB() {
        // Crear DB en version 1.0
        const crearDB = window.indexedDB.open('citas', 1);

        // Si hay error
        crearDB.onerror = function() {
            console.log('Error al crear DB');
        }

        // Si se creo bien
        // Array Function para acceder al this
        crearDB.onsuccess = () => {
            console.log('DB Creada');
            this.data = crearDB.result;
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

export default DB;