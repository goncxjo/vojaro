using System;

namespace vojaro.domain
{
    public class Universidad : Entity
    {
        public string Siglas { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
