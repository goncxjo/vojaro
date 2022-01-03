using System.Security.Claims;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface ISedesService
    {
        PagedData<Sede> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        Sede GetById(long id);
		Sede Create(Sede model, ClaimsPrincipal claimsPrincipal);
		Sede Update(Sede model, ClaimsPrincipal claimsPrincipal);
	}
}
