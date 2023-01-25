namespace vojaro.parameters
{
    public class UniversidadParameters : QueryStringParameters
    {
        public long? Id { get; set; }
        public string ParteNombreSiglas { get; set; }
        public long? UniversidadId { get; set; }
        public long? DepartamentoId { get; set; }
        public long? SedeId { get; set; }
    }
}
