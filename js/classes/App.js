import { datosCita, nuevaCita, db, ui } from '../funciones.js'; 
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario
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
            db.crearDB();

            setTimeout(() => {
                // Cargamos Citas
                ui.imprimirCitas();
            }, 10);
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

}

export default App;