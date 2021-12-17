using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace vojaro.api.Models.Universidad
{
    public class CreateUniversidadModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Las siglas son requeridas")]
        public string Siglas { get; set; }

        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
    }
}
