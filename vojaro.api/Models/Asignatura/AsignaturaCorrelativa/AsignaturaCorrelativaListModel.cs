using System;

namespace vojaro.api.Models.Asignatura.Correlativa
{
    public class AsignaturaCorrelativaListModel : AsignaturaCorrelativaMiniListModel
    {
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
