using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface IWeatherForecastRepository
    {
        PagedData<WeatherForecast> GetPaged(int pageNumber, int pageSize, PageSort[] sort, WeatherForecastFilters filter);
        IQueryable<WeatherForecast> Find(WeatherForecastFilters filters);
        //WeatherForecast Add(WeatherForecast model);
        WeatherForecast GetById(long id);
    }
}
