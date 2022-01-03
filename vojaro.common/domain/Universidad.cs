using System.Collections.Generic;

namespace vojaro.domain
{
	public class Universidad : Entity
    {
        public string Siglas { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Sede> Sedes { get; set; }
        public virtual ICollection<Departamento> Departamentos { get; set; }
    }
}
