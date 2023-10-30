using System.Collections.Generic;
using System.Security.Claims;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface IAsignaturasService
    {
        PagedData<Asignatura> GetPaged(int pageNumber, int pageSize, PageSort[] sort, AsignaturaFilters filter);
        Asignatura GetById(long id);
		Asignatura Create(Asignatura model, ClaimsPrincipal claimsPrincipal);
		Asignatura Update(Asignatura model, ClaimsPrincipal claimsPrincipal);
        IEnumerable<Asignatura> Find(AsignaturaFilters filters);
		IEnumerable<Asignatura> GetListCorrelativas(long id);
        Asignatura ActualizarCorrelativas(long id, IEnumerable<Correlativa> correlativas);
    }
}
