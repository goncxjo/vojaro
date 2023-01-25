using System.Collections.Generic;
using System.Security.Claims;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface IDepartamentosService
    {
        PagedData<Departamento> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        Departamento GetById(long id);
		Departamento Create(Departamento model, ClaimsPrincipal claimsPrincipal);
		Departamento Update(Departamento model, ClaimsPrincipal claimsPrincipal);
		IEnumerable<Departamento> Find(UniversidadFilters filters);
	}
}
