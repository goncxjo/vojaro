using System;

namespace vojaro.api.Models.Universidad
{
    public class UniversidadListModel : UniversidadMiniListModel
    {
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
