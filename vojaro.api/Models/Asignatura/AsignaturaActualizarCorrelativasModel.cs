using System.Collections.Generic;

namespace vojaro.api.Models.Asignatura
{
    public class AsignaturaAgregarCorrelativasModel
    {
        public long Id { get; set; }
        public IEnumerable<CorrelativaModel> Correlativas { get; set; }
    }
}
