using System.Collections.Generic;
using System.Security.Claims;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface ICarrerasService
    {
        PagedData<Carrera> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter);
        Carrera GetById(long id);
		Carrera Create(Carrera model, ClaimsPrincipal claimsPrincipal);
		Carrera Update(Carrera model, ClaimsPrincipal claimsPrincipal);
        IEnumerable<Carrera> Find(CarreraFilters filters);
	}
}
