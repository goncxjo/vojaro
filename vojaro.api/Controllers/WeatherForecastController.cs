using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using vojaro.api.Models.WeatherForescast;
using vojaro.filters;
using vojaro.domain;
using vojaro.parameters;
using vojaro.services;
using vojaro.api.Models;

namespace vojaro.api.Controllers
{
    [ProducesResponseType(typeof(ErrorModel), 400)]
    [ProducesResponseType(typeof(ErrorModel), 500)]
    [Produces("application/json")]
    public class WeatherForecastController : ApiController
    {
        private readonly IWeatherForecastService service;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IMapper mapper, IWeatherForecastService service)
            : base(logger, mapper)
        {
            this.service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedData<WeatherForecastListModel>), 200)]
        public ActionResult<PagedData<WeatherForecastListModel>> GetPaged([FromQuery] WeatherForecastParameters agendaParameters)
        {
            var filter = this.Mapper.Map<WeatherForecastFilters>(agendaParameters);
            var sort = this.Mapper.Map<PageSort[]>(agendaParameters);

            var data = this.service.GetPaged(agendaParameters.PageNumber, agendaParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<WeatherForecastListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(WeatherForecastModel), 200)]
        public ActionResult<WeatherForecastModel> GetById(long id)
        {
            var entity = this.service.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<WeatherForecastModel>(entity));
            }
            return NotFound();
        }

    }
}
