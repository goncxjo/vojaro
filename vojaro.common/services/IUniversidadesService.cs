using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public interface IUniversidadesService
    {
        PagedData<Universidad> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        Universidad GetById(long id);
    }
}
