using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface ICarrerasRepository
    {
        PagedData<Carrera> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter);
        IQueryable<Carrera> Find(CarreraFilters filters);
        Carrera GetById(long id);
		Carrera Add(Carrera entity);
	}
}
