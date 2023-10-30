using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace vojaro.domain
{
	public class Correlativa : Entity
    {
        public long AsignaturaId { get; set; }
        public AsignaturaCorrelativaCondicion Condicion { get; set; }
        public virtual ICollection<AsignaturaCorrelativa> AsignaturaCorrelativas { get; }

        public static List<ItemList> GetListCondicionMiniList() {
            var condiciones = new List<ItemList>
            {
                new() { Id = (long)AsignaturaCorrelativaCondicion.Cursada,      Descripcion = "Cursada" },
                new() { Id = (long)AsignaturaCorrelativaCondicion.Regularizada, Descripcion = "Regularizada" },
                new() { Id = (long)AsignaturaCorrelativaCondicion.Aprobada,     Descripcion = "Aprobada" },
                new() { Id = (long)AsignaturaCorrelativaCondicion.SinDatos,     Descripcion = "-" }
            };
            return condiciones;
        }

        public static ItemList GetCondicionMiniList(long id) {
            return GetListCondicionMiniList().First(x => x.Id == id);
        }
    }

    public enum AsignaturaCorrelativaCondicion
    {
        [Display(Name = "Cursada")]
        Cursada = 1,
        [Display(Name = "Regularizada")]
        Regularizada,
        [Display(Name = "Aprobada")]
        Aprobada,
        [Display(Name = "SinDatos")]
        SinDatos,
    }
}
