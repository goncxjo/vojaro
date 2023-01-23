using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using vojaro.domain;
using vojaro.services;
using vojaro.api.Models;
using vojaro.api.Models.Carrera;
using vojaro.filters;
using vojaro.parameters;

namespace vojaro.api.Controllers
{
	[ProducesResponseType(typeof(ErrorModel), 400)]
    [ProducesResponseType(typeof(ErrorModel), 500)]
    [Produces("application/json")]
    public class CarrerasController : ApiController
    {
        private readonly ICarrerasService service;

        public CarrerasController(ILogger<CarrerasController> logger, IMapper mapper, ICarrerasService service)
            : base(logger, mapper)
        {
            this.service = service;
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
    }
}
