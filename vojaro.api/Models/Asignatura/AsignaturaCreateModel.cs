using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Asignatura
{
    public class AsignaturaCreateModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "El cuatrimestre es requerido")]
        public int Cuatrimestre { get; set; }

        [Required(ErrorMessage = "Los creditos es requerido")]
        public int Creditos { get; set; }
    }
}
