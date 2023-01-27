namespace vojaro.data
{
    public interface IUnitOfWork
    {
        IWeatherForecastRepository WeatherForecastRepository { get; }
        IUniversidadesRepository UniversidadesRepository { get; }
        IDepartamentosRepository DepartamentosRepository { get; }
        ISedesRepository SedesRepository { get; }
        ICarrerasRepository CarrerasRepository { get; }
        ICarreraOrientacionesRepository CarreraOrientacionesRepository { get; }

        void Commit();
    }
}
