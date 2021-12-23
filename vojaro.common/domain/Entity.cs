using System;

namespace vojaro.domain
{
    public abstract class Entity
    {
        public long Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
        public long? UsuarioUltimaModificacion { get; set; }
    }
}
