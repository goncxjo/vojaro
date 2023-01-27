using System;

namespace vojaro.api.Models.Carrera.Orientacion
{
    public class CarreraOrientacionListModel : CarreraOrientacionMiniListModel
    {
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
    }
}
