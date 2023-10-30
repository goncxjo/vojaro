namespace vojaro.domain
{
    public class AsignaturaCorrelativa
    {
        public long AsignaturaId { get; set; }
        public long CorrelativaId { get; set; }
        public Asignatura Asignatura { get; set; }
        public Correlativa Correlativa { get; set; }
    }
}
