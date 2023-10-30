namespace vojaro.parameters
{
    public class AsignaturaParameters : QueryStringParameters
    {
        public long? Id { get; set; }
        public string Nombre { get; set; }
        public int? Anio { get; set; }
        public int? Cuatrimestre { get; set; }
        public long? UniversidadId { get; set; }
        public long? CarreraId { get; set; }
        public long? CarreraOrientacionId { get; set; }
    }
}
