namespace vojaro.data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VojaroDbContext context;
        private IWeatherForecastRepository weatherForecastRepository;
        private IUniversidadesRepository universidadesRepository;

        public UnitOfWork(VojaroDbContext context)
        {
            this.context = context;
        }

        public IWeatherForecastRepository WeatherForecastRepository => weatherForecastRepository ??= new WeatherForecastRepository(context);
        public IUniversidadesRepository UniversidadesRepository => universidadesRepository ??= new UniversidadesRepository(context);

        public void Commit()
        {
            this.context.SaveChanges();
        }
    }
}
