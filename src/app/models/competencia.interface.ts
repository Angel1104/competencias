export interface CompetenciaEditI {
    nombre : string;
    descripcion : string;
    fechaIni : string;
    fechaFin : string;
    requisitos : string;
    encargado: string;
    email : string;
    lugar : string;
    costo : Number;
    id_tipoCompetencia : Number;
    estado: string;
    horarios: string;
    imagen: File;
}