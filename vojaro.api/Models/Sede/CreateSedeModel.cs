using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Sede
{
	public class CreateSedeModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "La universidad es requerida")]
        public int UniversidadId { get; set; }
    }
}
