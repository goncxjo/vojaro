using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace vojaro.api.Controllers
{
    [ApiController]
	[Route("api/[controller]")]
	public abstract class ApiController : ControllerBase
	{
		public ILogger Logger { get; }
		public IMapper Mapper { get; }

		public ApiController(ILogger logger, IMapper mapper)
		{
			Logger = logger;
			Mapper = mapper;
		}
		protected CreatedAtRouteResult Created<TModel>(long id, TModel model)
		{
			return this.CreatedAtRoute(new { id }, model);
		}

		protected ClaimsPrincipal GetCurrentUser()
		{
			return HttpContext.User;
		}
	}
}
