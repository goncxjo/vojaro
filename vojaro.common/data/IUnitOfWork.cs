namespace vojaro.data
{
    public interface IUnitOfWork
    {
        IWeatherForecastRepository WeatherForecastRepository { get; }
        IUniversidadesRepository UniversidadesRepository { get; }

        void Commit();
    }
}
