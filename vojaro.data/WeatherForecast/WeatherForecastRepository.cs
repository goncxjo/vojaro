using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class WeatherForecastRepository : FilterableRepository<WeatherForecast, WeatherForecastFilters>, IWeatherForecastRepository
    {
        public WeatherForecastRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<WeatherForecast> DbSet => null;


        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public override IQueryable<WeatherForecast> GetAll()
        {
            var rng = new Random();
            return Enumerable.Range(1, 15).Select(index => new WeatherForecast
            {
                Id = index,
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .AsQueryable();
        }

        public override IQueryable<WeatherForecast> FilterQuery(IQueryable<WeatherForecast> query, WeatherForecastFilters filter)
        {
            if (filter != null)
            {
                if (filter.TemperatureC_From != null)
                {
                    query = query.Where(x => x.TemperatureC >= filter.TemperatureC_To);
                }
                if (filter.TemperatureC_To != null)
                {
                    query = query.Where(x => x.TemperatureC <= filter.TemperatureC_From);
                }
            }

            return query;
        }
    }
}
