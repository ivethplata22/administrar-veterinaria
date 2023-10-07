import { cargarEdicion, eliminarCita, db } from '../funciones.js';
import { contenedorCitas } from '../selectores.js';

class UI {

    imprimirAlerta(mensaje, tipo) {

        this.eliminarRepetidos();

        const divMensaje = document.createElement('DIV');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'mensaje-error-success');
        divMensaje.textContent = mensaje;

        // Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Agregar al DOM
        const contenido = document.querySelector('#contenido');
        contenido.insertBefore(divMensaje, contenido.querySelector('.agregar-cita'));

        // Eliminar alerta despues de 2 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 2000);
    }

    eliminarRepetidos() {
        const mensajes = document.querySelectorAll('.mensaje-error-success');

        for(const mensaje of mensajes) {
            mensaje.remove();
        }
    }

    imprimirCitas() {

        // Limpiar HTML
        this.eliminarCitasRepetidas();

        // Leer de la DB
        this.leerDB();

    }

    textoHeading(indicador) {
        document.querySelector('#administra').textContent = indicador > 0 ? 'Administra tus Citas' : 'No hay Citas Disponibles';
    }

    eliminarCitasRepetidas() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

    leerDB() {
        // Leer contenido DB
        const objectStore = db.data.transaction('citas').objectStore('citas');

        // Obtener Elementos Totales
        const total = objectStore.count();
        total.onsuccess = () => {
            this.textoHeading(total.result);
        }

        // Recorremos loe elementos de la DB
        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;

            if(cursor) {
                const { id, mascota, propietario, telefono, fecha, hora, sintomas } = cursor.value;

                const divCita = document.createElement('DIV');
                divCita.classList.add('cita', 'p-3');
                divCita.dataset.id = id;

                // Scrripting de los elementos de la cita
                const mascotaParrafo = document.createElement('h2');
                mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
                mascotaParrafo.textContent = mascota;

                const propietarioParrafo = document.createElement('P');
                propietarioParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Propietario: </span> ${propietario}
                `;

                const telefonoParrafo = document.createElement('P');
                telefonoParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Telefono: </span> ${telefono}
                `;

                const fechaParrafo = document.createElement('P');
                fechaParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Fecha: </span> ${fecha}
                `;

                const horaParrafo = document.createElement('P');
                horaParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Hora: </span> ${hora}
                `;

                const sintomasParrafo = document.createElement('P');
                sintomasParrafo.innerHTML = `
                    <span class="font-weight-bolder"> Sintomas: </span> ${sintomas}
                `;

                // Boton Eliminar Cita
                const btnEliminar = document.createElement('BUTTON');
                btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
                btnEliminar.innerHTML = `Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>`;
                btnEliminar.onclick = () => eliminarCita(id);
                
                // Boton Editar CIta
                const btnEditar = document.createElement('BUTTON');
                btnEditar.classList.add('btn', 'btn-info');
                btnEditar.innerHTML = `Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                </svg>`;
                // Para que tome el valor especifico de la cita a la que nos referimos
                const cita = cursor.value;
                btnEditar.onclick = () => cargarEdicion(cita);

                // Agregar los parrafos al divCita
                divCita.appendChild(mascotaParrafo);
                divCita.appendChild(propietarioParrafo);
                divCita.appendChild(telefonoParrafo);
                divCita.appendChild(fechaParrafo);
                divCita.appendChild(horaParrafo);
                divCita.appendChild(sintomasParrafo);

                // Agregar Botones
                divCita.appendChild(btnEliminar);
                divCita.appendChild(btnEditar);

                // Agregar al DOM
                contenedorCitas.appendChild(divCita);

                // Indicar ir al siguiente elemento
                cursor.continue();
            }
        }
    }

}

export default UI;