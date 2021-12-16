using System;

namespace vojaro.api.Models.WeatherForescast
{
    public class UniversidadListModel
    {
        public long Id { get; set; }
        public string Siglas { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
