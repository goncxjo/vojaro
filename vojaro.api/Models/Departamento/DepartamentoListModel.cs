using System;

namespace vojaro.api.Models.Departamento
{
    public class DepartamentoListModel
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
