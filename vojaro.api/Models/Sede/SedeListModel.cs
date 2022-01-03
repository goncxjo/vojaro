using System;

namespace vojaro.api.Models.Sede
{
    public class SedeListModel
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
