using System.Collections.Generic;

namespace vojaro.domain
{
	public class Carrera : Entity
    {
        public string Nombre { get; set; }

        public virtual long? UniversidadId { get; set; }
        public virtual long? DepartamentosId { get; set; }
        public virtual Universidad Universidad { get; set; }
        public virtual Departamento Departamento { get; set; }
    }
}
