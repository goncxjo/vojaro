namespace vojaro.data
{
    public interface IUnitOfWork
    {
        IWeatherForecastRepository WeatherForecastRepository { get; }

        void Commit();
    }
}
