namespace vojaro.data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VojaroDbContext context;
        private IWeatherForecastRepository weatherForecastRepository;

        public UnitOfWork(VojaroDbContext context)
        {
            this.context = context;
        }

        public IWeatherForecastRepository WeatherForecastRepository => weatherForecastRepository ??= new WeatherForecastRepository(context);

        public void Commit()
        {
            this.context.SaveChanges();
        }
    }
}
