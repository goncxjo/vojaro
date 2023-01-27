namespace vojaro.domain
{
	public class CarreraOrientacion : Entity
    {
        public string Nombre { get; set; }
        public long CarreraId { get; set; }

        public virtual Carrera Carrera { get; set; }
    }
}
