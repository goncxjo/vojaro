using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface IWeatherForecastService
    {
        PagedData<WeatherForecast> GetPaged(int pageNumber, int pageSize, PageSort[] sort, WeatherForecastFilters filter);
        WeatherForecast GetById(long id);
    }
}
