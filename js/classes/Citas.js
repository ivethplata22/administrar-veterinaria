class Citas {

    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas.push(cita);
    }

    editarCita(citaModificar) {
        this.citas = this.citas.map( cita => cita.id === citaModificar.id ? citaModificar : cita);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id );
    }
}

export default Citas;