﻿namespace vojaro.data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VojaroDbContext context;
        private IWeatherForecastRepository weatherForecastRepository;
        private IUniversidadesRepository universidadesRepository;
        private IDepartamentosRepository departamentosRepository;
        private ISedesRepository sedesRepository;
        private ICarrerasRepository carrerasRepository;
        private ICarreraOrientacionesRepository carreraOrientacionesRepository;

        public UnitOfWork(VojaroDbContext context)
        {
            this.context = context;
        }

        public IWeatherForecastRepository WeatherForecastRepository => weatherForecastRepository ??= new WeatherForecastRepository(context);
        public IUniversidadesRepository UniversidadesRepository => universidadesRepository ??= new UniversidadesRepository(context);
        public IDepartamentosRepository DepartamentosRepository => departamentosRepository ??= new DepartamentosRepository(context);
        public ISedesRepository SedesRepository => sedesRepository ??= new SedesRepository(context);
        public ICarrerasRepository CarrerasRepository => carrerasRepository ??= new CarrerasRepository(context);
        public ICarreraOrientacionesRepository CarreraOrientacionesRepository => carreraOrientacionesRepository ??= new CarreraOrientacionesRepository(context);

        public void Commit()
        {
            this.context.SaveChanges();
        }
    }
}
