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
    public class UniversidadesController : ApiController
    {
        private readonly IUniversidadesService service;

        public UniversidadesController(ILogger<UniversidadesController> logger, IMapper mapper, IUniversidadesService service)
            : base(logger, mapper)
        {
            this.service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedData<UniversidadListModel>), 200)]
        public ActionResult<PagedData<UniversidadListModel>> GetPaged([FromQuery] UniversidadParameters universidadParameters)
        {
            var filter = this.Mapper.Map<UniversidadFilters>(universidadParameters);
            var sort = this.Mapper.Map<PageSort[]>(universidadParameters);

            var data = this.service.GetPaged(universidadParameters.PageNumber, universidadParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<UniversidadListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(UniversidadModel), 200)]
        public ActionResult<UniversidadModel> GetById(long id)
        {
            var entity = this.service.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<UniversidadModel>(entity));
            }
            return NotFound();
        }

    }
}
