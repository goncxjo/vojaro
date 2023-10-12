using System.ComponentModel.DataAnnotations;

namespace vojaro.domain
{
	public class AsignaturaCorrelativa : Entity
    {
        public int AsignaturaId { get; set; }
        public int CorrelativaId { get; set; }
        public AsignaturaCorrelativaCondicion Condicion { get;set;}

        public virtual Asignatura Asignatura { get; set; }
        public virtual Asignatura Correlativa { get; set; }
    }

    public enum AsignaturaCorrelativaCondicion
    {
        [Display(Name = "Regularizada")]
        Regularizada = 1,

        [Display(Name = "Aprobada")]
        Aprobada
    }
}
