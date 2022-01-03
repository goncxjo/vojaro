using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface ISedesRepository
    {
        PagedData<Sede> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        IQueryable<Sede> Find(UniversidadFilters filters);
        Sede GetById(long id);
		Sede Add(Sede entity);
	}
}
