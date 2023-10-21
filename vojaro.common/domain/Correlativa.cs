using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace vojaro.domain
{
	public class Correlativa : Entity
    {
        public AsignaturaCorrelativaCondicion Condicion { get; set; }
        public virtual ICollection<Asignatura> Asignaturas { get; set; }
    }

    public enum AsignaturaCorrelativaCondicion
    {
        [Display(Name = "Regularizada")]
        Regularizada = 1,

        [Display(Name = "Aprobada")]
        Aprobada
    }
}
