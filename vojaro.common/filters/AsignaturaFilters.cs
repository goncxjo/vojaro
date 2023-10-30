namespace vojaro.filters
{
    public class AsignaturaFilters
    {
        public long? Id { get; set; }
        public string Nombre { get; set; }
        public int? Anio { get; set; }
        public int? Cuatrimestre { get; set; }
        public long? UniversidadId { get; set; }
        public long? CarreraId { get; set; }
        public long? CarreraOrientacionId { get; set; }
        public TipoFiltroAsignatura TipoFiltro { get; set; } = TipoFiltroAsignatura.Asignatura;


        public enum TipoFiltroAsignatura
        {
            Asignatura = 0,
            Correlativa = 1
        }
    }
}
