using System;

namespace vojaro.domain
{
    public class Universidad : Entity
    {
        public string Siglas { get; set; }
        public string Nombre { get; set; }
        public DateTime FechaIns { get; set; }
        public Nullable<DateTime> FechaMod { get; set; }
    }
}
