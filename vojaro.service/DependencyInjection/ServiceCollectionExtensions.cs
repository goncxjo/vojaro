using vojaro.services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services)
        {
            services.AddScoped<IWeatherForecastService, WeatherForecastService>();
            services.AddScoped<IUniversidadesService, UniversidadesService>();

            return services;
        }
    }
}
