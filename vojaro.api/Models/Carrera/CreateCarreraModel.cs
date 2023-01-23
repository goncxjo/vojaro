using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Carrera
{
	public class CreateCarreraModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "La universidad es requerida")]
        public int UniversidadId { get; set; }
        [Required(ErrorMessage = "El departamento es requerido")]
        public int DepartamentoId { get; set; }       
    }
}
