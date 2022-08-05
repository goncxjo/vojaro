using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vojaro.filters;
using vojaro.domain;
using vojaro.parameters;
using vojaro.services;
using vojaro.api.Models;
using vojaro.api.Models.Universidad;
using vojaro.api.Models.Departamento;
using vojaro.api.Models.Sede;

namespace vojaro.api.Controllers
{
    [ProducesResponseType(typeof(ErrorModel), 400)]
    [ProducesResponseType(typeof(ErrorModel), 500)]
    [Produces("application/json")]
    public class UniversidadesController : ApiController
    {
        private readonly IUniversidadesService service;
        private readonly ISedesService sedesService;
        private readonly IDepartamentosService departamentosService;

        public UniversidadesController(ILogger<UniversidadesController> logger, IMapper mapper, IUniversidadesService service, ISedesService sedesService, IDepartamentosService departamentosService)
            : base(logger, mapper)
        {
            this.service = service;
            this.sedesService = sedesService;
            this.departamentosService = departamentosService;
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

		[HttpPost]
		[ProducesResponseType(typeof(UniversidadModel), 200)]
		public ActionResult<Universidad> Create([FromBody] CreateUniversidadModel model)
		{
			var entity = this.Mapper.Map<Universidad>(model);
			var result = this.service.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<UniversidadModel>(result));
		}

		[HttpPut]
		[ProducesResponseType(typeof(UniversidadModel), 200)]
		public ActionResult<Universidad> Update([FromBody] CreateUniversidadModel model)
		{
			var entity = this.Mapper.Map<Universidad>(model);
			var result = this.service.Update(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<UniversidadModel>(result));
		}

        [HttpGet("departamentos")]
        [ProducesResponseType(typeof(PagedData<DepartamentoListModel>), 200)]
        public ActionResult<PagedData<DepartamentoListModel>> GetPagedDepartamentos([FromQuery] UniversidadParameters universidadParameters)
        {
            var filter = this.Mapper.Map<UniversidadFilters>(universidadParameters);
            var sort = this.Mapper.Map<PageSort[]>(universidadParameters);

            var data = this.departamentosService.GetPaged(universidadParameters.PageNumber, universidadParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<DepartamentoListModel>>(data);
            return Ok(vm);
        }

        [HttpGet("sedes")]
        [ProducesResponseType(typeof(PagedData<SedeListModel>), 200)]
        public ActionResult<PagedData<SedeListModel>> GetPagedSedes([FromQuery] UniversidadParameters universidadParameters)
        {
            var filter = this.Mapper.Map<UniversidadFilters>(universidadParameters);
            var sort = this.Mapper.Map<PageSort[]>(universidadParameters);

            var data = this.sedesService.GetPaged(universidadParameters.PageNumber, universidadParameters.PageSize, sort, filter);
            var vm = this.Mapper.Map<PagedData<SedeListModel>>(data);
            return Ok(vm);
        }
    }
}
