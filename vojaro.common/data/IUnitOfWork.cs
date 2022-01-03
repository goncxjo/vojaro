namespace vojaro.data
{
    public interface IUnitOfWork
    {
        IWeatherForecastRepository WeatherForecastRepository { get; }
        IUniversidadesRepository UniversidadesRepository { get; }
        IDepartamentosRepository DepartamentosRepository { get; }
        ISedesRepository SedesRepository { get; }

        void Commit();
    }
}
