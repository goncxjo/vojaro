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
using System.Collections.Generic;

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

        [HttpGet("mini-list")]
        [ProducesResponseType(typeof(IEnumerable<UniversidadMiniListModel>), 200)]
        public ActionResult<IEnumerable<UniversidadMiniListModel>> GetAllMini()
        {
            var data = this.service.GetAll();
            return Ok(this.Mapper.Map<IEnumerable<UniversidadMiniListModel>>(data));
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

        [HttpGet("departamentos/{id}")]
        [ProducesResponseType(typeof(DepartamentoModel), 200)]
        public ActionResult<DepartamentoModel> GetDepartamentoById(long id)
        {
            var entity = this.departamentosService.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<DepartamentoModel>(entity));
            }
            return NotFound();
        }

        [HttpPost("departamentos")]
		[ProducesResponseType(typeof(DepartamentoModel), 200)]
		public ActionResult<Departamento> CreateDepartamento([FromBody] CreateDepartamentoModel model)
		{
			var entity = this.Mapper.Map<Departamento>(model);
			var result = this.departamentosService.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<DepartamentoModel>(result));
		}

		[HttpPut("departamentos")]
		[ProducesResponseType(typeof(DepartamentoModel), 200)]
		public ActionResult<Departamento> UpdateDepartamento([FromBody] CreateDepartamentoModel model)
		{
			var entity = this.Mapper.Map<Departamento>(model);
			var result = this.departamentosService.Update(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<DepartamentoModel>(result));
		}

        [HttpGet("departamentos/mini-list")]
        [ProducesResponseType(typeof(IEnumerable<DepartamentoMiniListModel>), 200)]
        public ActionResult<IEnumerable<DepartamentoMiniListModel>> GetAllMiniDepartamentos()
        {
            var data = this.departamentosService.GetAll();
            return Ok(this.Mapper.Map<IEnumerable<DepartamentoMiniListModel>>(data));
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


        [HttpGet("sedes/{id}")]
        [ProducesResponseType(typeof(SedeModel), 200)]
        public ActionResult<SedeModel> GetSedeById(long id)
        {
            var entity = this.sedesService.GetById(id);
            if (entity != null)
            {
                return Ok(this.Mapper.Map<SedeModel>(entity));
            }
            return NotFound();
        }

        [HttpPost("sedes")]
		[ProducesResponseType(typeof(SedeModel), 200)]
		public ActionResult<Departamento> CreateSede([FromBody] CreateSedeModel model)
		{
			var entity = this.Mapper.Map<Sede>(model);
			var result = this.sedesService.Create(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<SedeModel>(result));
		}

		[HttpPut("sedes")]
		[ProducesResponseType(typeof(SedeModel), 200)]
		public ActionResult<Sede> UpdateSede([FromBody] CreateSedeModel model)
		{
			var entity = this.Mapper.Map<Sede>(model);
			var result = this.sedesService.Update(entity, this.GetCurrentUser());
			return Created(entity.Id, this.Mapper.Map<SedeModel>(result));
		}
    }
}
