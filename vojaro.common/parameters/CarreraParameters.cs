namespace vojaro.parameters
{
    public class CarreraParameters : QueryStringParameters
    {
        public long? Id { get; set; }
        public string Nombre { get; set; }
        public long? UniversidadId { get; set; }
        public long? DepartamentoId { get; set; }
    }
}
