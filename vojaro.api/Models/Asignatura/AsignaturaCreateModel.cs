using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Asignatura
{
    public class AsignaturaCreateModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        public string Codigo { get; set; }
        
        [Required(ErrorMessage = "El cuatrimestre es requerido")]
        public int Cuatrimestre { get; set; }

        [Required(ErrorMessage = "La carga horaria es requerida")]
        public int CargaHoraria{ get; set; }

        [Required(ErrorMessage = "La universidad es requerida")]
        public int UniversidadId { get; set; }

        [Required(ErrorMessage = "La carrera es requerida")]
        public int CarreraId { get; set; }       

    }
}
