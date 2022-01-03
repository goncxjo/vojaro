namespace vojaro.domain
{
	public class Departamento : Entity
    {
        public string Nombre { get; set; }
        public long UniversidadId { get; set; }

        public virtual Universidad Universidad { get; set; }
    }
}
