using System;
using System.Collections.Generic;
using vojaro.data;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly IUnitOfWork unitOfWork;

        public WeatherForecastService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public WeatherForecast GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public PagedData<WeatherForecast> GetPaged(int pageNumber, int pageSize, PageSort[] sort, WeatherForecastFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        private IWeatherForecastRepository GetRepository() => this.unitOfWork.WeatherForecastRepository;
    }
}
