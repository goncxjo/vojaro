using System;

namespace vojaro.api.Models.Asignatura
{
    public class AsignaturaMiniListModel
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public int Cuatrimestre { get; set; }
        public int Creditos { get; set; }
        public string Codigo { get; set; }
        public int Anio { get; set; }
        public int CargaHoraria { get; set; }
        public bool EsInterdisciplinaria { get; set; }

    }
}
