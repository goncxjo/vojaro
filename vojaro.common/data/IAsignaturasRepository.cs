using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface IAsignaturasRepository
    {
        PagedData<Asignatura> GetPaged(int pageNumber, int pageSize, PageSort[] sort, AsignaturaFilters filter);
        IQueryable<Asignatura> Find(AsignaturaFilters filters);
        Asignatura GetById(long id);
		Asignatura Add(Asignatura entity);
	}
}
