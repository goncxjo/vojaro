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

        [HttpGet("correlativas/disponibles")]
        [ProducesResponseType(typeof(PagedData<AsignaturaListModel>), 200)]
        public ActionResult<PagedData<AsignaturaListModel>> GetPagedCorrelativasDisponibles([FromQuery] AsignaturaParameters asignaturaParameters)
        {
            var filter = this.Mapper.Map<AsignaturaFilters>(asignaturaParameters);
            var sort = this.Mapper.Map<PageSort[]>(asignaturaParameters);

            filter.TipoFiltro = AsignaturaFilters.TipoFiltroAsignatura.Correlativa;

            var data = this.service.GetPaged(asignaturaParameters.PageNumber, asignaturaParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<AsignaturaListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("{id}/correlativas")]
        [ProducesResponseType(typeof(IEnumerable<AsignaturaListModel>), 200)]
        public ActionResult<IEnumerable<AsignaturaListModel>> GetListCorrelativas(long id)
        {
            var data = this.service.GetListCorrelativas(id);
            var vm = this.Mapper.Map<IEnumerable<AsignaturaListModel>>(data);
            return Ok(vm);
        }

        [HttpPost("correlativas/actualizar")]
        [ProducesResponseType(typeof(AsignaturaModel), 200)]
        public ActionResult<AsignaturaModel> ActualizarCorrelativas([FromBody] AsignaturaAgregarCorrelativasModel model)
        {
            var correlativas = this.Mapper.Map<IEnumerable<Correlativa>>(model.Correlativas);
            
            var result = this.service.ActualizarCorrelativas(model.Id, correlativas);
            var vm = this.Mapper.Map<AsignaturaModel>(result);
            return Ok(vm);
        }
    }
}
