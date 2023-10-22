﻿using vojaro.services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IWeatherForecastService, WeatherForecastService>();
            services.AddScoped<IUniversidadesService, UniversidadesService>();
            services.AddScoped<IDepartamentosService, DepartamentosService>();
            services.AddScoped<ISedesService, SedesService>();
            services.AddScoped<ICarrerasService, CarrerasService>();
            services.AddScoped<ICarreraOrientacionesService, CarreraOrientacionesService>();
            services.AddScoped<IAsignaturasService, AsignaturasService>();

            return services;
        }
    }
}
