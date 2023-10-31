using System;
using System.Collections.Generic;
using vojaro.api.Models.Asignatura.Correlativa;
using vojaro.api.Models.Carrera;
using vojaro.api.Models.Carrera.Orientacion;
using vojaro.api.Models.Universidad;

namespace vojaro.api.Models.Asignatura
{
    public class AsignaturaListModel : AsignaturaMiniListModel
    {

        public virtual int CarreraId { get; set; }
        public virtual int? CarreraOrientacionId { get; set; }

        public virtual UniversidadMiniListModel Universidad { get; set; }
        public virtual CarreraListModel Carrera { get; set; }
        public virtual CarreraOrientacionMiniListModel CarreraOrientacion { get; set; }
        public virtual ICollection<AsignaturaCorrelativaMiniListModel> Correlativas { get; set; }

        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaUltimaModificacion { get; set; }
        public int CantidadCorrelativas { get; set; }
        public ItemListModel CondicionCorrelativa { get; set; }

    }
}
