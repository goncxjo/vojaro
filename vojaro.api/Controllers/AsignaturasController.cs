using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vojaro.domain;
using vojaro.services;
using vojaro.api.Models;
using vojaro.api.Models.Asignatura;
using vojaro.filters;
using vojaro.parameters;
using System.Collections.Generic;

namespace vojaro.api.Controllers
{
	[ProducesResponseType(typeof(ErrorModel), 400)]
    [ProducesResponseType(typeof(ErrorModel), 500)]
    [Produces("application/json")]
    public class AsignaturasController : ApiController
    {
        private readonly IAsignaturasService service;

        public AsignaturasController(ILogger<AsignaturasController> logger, IMapper mapper, IAsignaturasService service)
            : base(logger, mapper)
        {
            this.service = service;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PagedData<AsignaturaListModel>), 200)]
        public ActionResult<PagedData<AsignaturaListModel>> GetPaged([FromQuery] AsignaturaParameters asignaturaParameters)
        {
            var filter = this.Mapper.Map<AsignaturaFilters>(asignaturaParameters);
            var sort = this.Mapper.Map<PageSort[]>(asignaturaParameters);

            var data = this.service.GetPaged(asignaturaParameters.PageNumber, asignaturaParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<AsignaturaListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(AsignaturaModel), 200)]
        public ActionResult<AsignaturaModel> GetById(long id)
        {
            var entity = this.service.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<AsignaturaModel>(entity));
            }
            return NotFound();
        }

		[HttpPost]
		[ProducesResponseType(typeof(AsignaturaModel), 200)]
		public ActionResult<Asignatura> Create([FromBody] AsignaturaCreateModel model)
		{
			var entity = this.Mapper.Map<Asignatura>(model);
			var result = this.service.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<AsignaturaModel>(result));
		}

		[HttpPut]
		[ProducesResponseType(typeof(AsignaturaModel), 200)]
		public ActionResult<Asignatura> Update([FromBody] AsignaturaCreateModel model)
		{
			var entity = this.Mapper.Map<Asignatura>(model);
			var result = this.service.Update(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<AsignaturaModel>(result));
		}

        [HttpGet("mini-list")]
        [ProducesResponseType(typeof(IEnumerable<AsignaturaMiniListModel>), 200)]
        public ActionResult<IEnumerable<AsignaturaMiniListModel>> GetAllMiniAsignaturas([FromQuery] AsignaturaParameters asignaturaParameters)
        {
            var filter = this.Mapper.Map<AsignaturaFilters>(asignaturaParameters);
            var data = this.service.Find(filter);
            return Ok(this.Mapper.Map<IEnumerable<AsignaturaMiniListModel>>(data));
        }

        // [HttpGet("correlativas")]
        // [ProducesResponseType(typeof(PagedData<AsignaturaListModel>), 200)]
        // public ActionResult<PagedData<AsignaturaListModel>> GetPagedCorrelativas([FromQuery] AsignaturaParameters asignaturaParameters)
        // {
        //     var filter = this.Mapper.Map<AsignaturaFilters>(asignaturaParameters);
        //     var sort = this.Mapper.Map<PageSort[]>(asignaturaParameters);

        //     var data = this.service.GetPagedCorrelativas(asignaturaParameters.PageNumber, asignaturaParameters.PageSize, sort, filter);
        //     var vm = this.Mapper.Map<PagedData<AsignaturaListModel>>(data);
        //     return Ok(vm);
        // }
    }
}
