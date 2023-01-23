using System;
using vojaro.api.Models.Departamento;
using vojaro.api.Models.Universidad;

namespace vojaro.api.Models.Carrera
{
    public class CarreraListModel : CarreraMiniListModel
    {
        public UniversidadMiniListModel Universidad { get; set; }
        public DepartamentoMiniListModel Departmento { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
