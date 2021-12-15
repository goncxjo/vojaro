using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface IUniversidadesRepository
    {
        PagedData<Universidad> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        IQueryable<Universidad> Find(UniversidadFilters filters);
        Universidad GetById(long id);
    }
}
