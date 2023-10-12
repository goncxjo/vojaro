using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Asignatura.Correlativa
{
	public class AsignaturaCorrelativaCreateModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "La carrera es requerida")]
        public int AsignaturaId { get; set; }
    }
}
