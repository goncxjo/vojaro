using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface ICarreraOrientacionesRepository
    {
        PagedData<CarreraOrientacion> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter);
        IQueryable<CarreraOrientacion> Find(CarreraFilters filters);
        CarreraOrientacion GetById(long id);
		CarreraOrientacion Add(CarreraOrientacion entity);
	}
}
