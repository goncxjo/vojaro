using System.Collections.Generic;
using System.Security.Claims;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface ICarreraOrientacionesService
    {
        PagedData<CarreraOrientacion> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter);
        CarreraOrientacion GetById(long id);
		OperationResult<CarreraOrientacion> Create(CarreraOrientacion model, ClaimsPrincipal claimsPrincipal);
		OperationResult<CarreraOrientacion> Update(CarreraOrientacion model, ClaimsPrincipal claimsPrincipal);
		IEnumerable<CarreraOrientacion> Find(CarreraFilters filters);
	}
}
