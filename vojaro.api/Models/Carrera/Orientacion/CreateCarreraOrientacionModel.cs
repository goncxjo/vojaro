using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Carrera.Orientacion
{
	public class CreateCarreraOrientacionModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "La carrera es requerida")]
        public int CarreraId { get; set; }
    }
}
