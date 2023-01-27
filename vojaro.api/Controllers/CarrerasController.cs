using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vojaro.domain;
using vojaro.services;
using vojaro.api.Models;
using vojaro.api.Models.Carrera;
using vojaro.filters;
using vojaro.parameters;
using vojaro.api.Models.Carrera.Orientacion;
using System.Collections.Generic;

namespace vojaro.api.Controllers
{
	[ProducesResponseType(typeof(ErrorModel), 400)]
    [ProducesResponseType(typeof(ErrorModel), 500)]
    [Produces("application/json")]
    public class CarrerasController : ApiController
    {
        private readonly ICarrerasService service;
        private readonly ICarreraOrientacionesService carreraOrientacionesService;

        public CarrerasController(ILogger<CarrerasController> logger, IMapper mapper, ICarrerasService service, ICarreraOrientacionesService carreraOrientacionesService)
            : base(logger, mapper)
        {
            this.service = service;
            this.carreraOrientacionesService = carreraOrientacionesService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedData<CarreraListModel>), 200)]
        public ActionResult<PagedData<CarreraListModel>> GetPaged([FromQuery] CarreraParameters carreraParameters)
        {
            var filter = this.Mapper.Map<CarreraFilters>(carreraParameters);
            var sort = this.Mapper.Map<PageSort[]>(carreraParameters);

            var data = this.service.GetPaged(carreraParameters.PageNumber, carreraParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<CarreraListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(CarreraModel), 200)]
        public ActionResult<CarreraModel> GetById(long id)
        {
            var entity = this.service.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<CarreraModel>(entity));
            }
            return NotFound();
        }

		[HttpPost]
		[ProducesResponseType(typeof(CarreraModel), 200)]
		public ActionResult<Carrera> Create([FromBody] CreateCarreraModel model)
		{
			var entity = this.Mapper.Map<Carrera>(model);
			var result = this.service.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<CarreraModel>(result));
		}

		[HttpPut]
		[ProducesResponseType(typeof(CarreraModel), 200)]
		public ActionResult<Carrera> Update([FromBody] CreateCarreraModel model)
		{
			var entity = this.Mapper.Map<Carrera>(model);
			var result = this.service.Update(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<CarreraModel>(result));
		}

        [HttpGet("orientaciones")]
        [ProducesResponseType(typeof(PagedData<CarreraOrientacionListModel>), 200)]
        public ActionResult<PagedData<CarreraOrientacionListModel>> GetPagedCarreraOrientacions([FromQuery] CarreraParameters carreraParameters)
        {
            var filter = this.Mapper.Map<CarreraFilters>(carreraParameters);
            var sort = this.Mapper.Map<PageSort[]>(carreraParameters);

            var data = this.carreraOrientacionesService.GetPaged(carreraParameters.PageNumber, carreraParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<CarreraOrientacionListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("orientaciones/{id}")]
        [ProducesResponseType(typeof(CarreraOrientacionModel), 200)]
        public ActionResult<CarreraOrientacionModel> GetCarreraOrientacionById(long id)
        {
            var entity = this.carreraOrientacionesService.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<CarreraOrientacionModel>(entity));
            }
            return NotFound();
        }

        [HttpPost("orientaciones")]
		[ProducesResponseType(typeof(CarreraOrientacionModel), 200)]
		public ActionResult<CarreraOrientacion> CreateCarreraOrientacion([FromBody] CreateCarreraOrientacionModel model)
		{
			var entity = this.Mapper.Map<CarreraOrientacion>(model);
			var result = this.carreraOrientacionesService.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<CarreraOrientacionModel>(result));
		}

		[HttpPut("orientaciones")]
		[ProducesResponseType(typeof(CarreraOrientacionModel), 200)]
		public ActionResult<CarreraOrientacion> UpdateCarreraOrientacion([FromBody] CreateCarreraOrientacionModel model)
		{
			var entity = this.Mapper.Map<CarreraOrientacion>(model);
			var result = this.carreraOrientacionesService.Update(entity, this.GetCurrentUser());
			if (result.Succeeded)
			{
				var vm = this.Mapper.Map<CarreraOrientacionModel>(result.Result);
				return Ok(vm);
			}
			return BadRequest(result.Errors);
		}

        [HttpGet("orientaciones/mini-list")]
        [ProducesResponseType(typeof(IEnumerable<CarreraOrientacionMiniListModel>), 200)]
        public ActionResult<IEnumerable<CarreraOrientacionMiniListModel>> GetAllMiniCarreraOrientacions([FromQuery] CarreraParameters carreraParameters)
        {
            var filter = this.Mapper.Map<CarreraFilters>(carreraParameters);
            var data = this.carreraOrientacionesService.Find(filter);
            return Ok(this.Mapper.Map<IEnumerable<CarreraOrientacionMiniListModel>>(data));
        }

    }
}
