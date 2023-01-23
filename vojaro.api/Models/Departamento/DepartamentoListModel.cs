using System;

namespace vojaro.api.Models.Departamento
{
    public class DepartamentoListModel : DepartamentoMiniListModel
    {
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
