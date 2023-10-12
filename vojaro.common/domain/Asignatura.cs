using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace vojaro.domain
{
	public class Asignatura : Entity
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public int Anio { get; set; }
        public int Cuatrimestre { get; set; }
        public int CargaHoraria { get; set; }
        public int Creditos { get; set; }
        public bool EsInterdisciplinaria { get; set; }

        public virtual int CarreraId { get; set; }
        public virtual int? CarreraOrientacionId { get; set; }

        public virtual Carrera Carrera { get; set; }
        public virtual CarreraOrientacion CarreraOrientacion { get; set; }
        [NotMapped]
        public virtual ICollection<AsignaturaCorrelativa> Correlativas { get; set; }
    }
}
