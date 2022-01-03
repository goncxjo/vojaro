using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public interface IDepartamentosRepository
    {
        PagedData<Departamento> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter);
        IQueryable<Departamento> Find(UniversidadFilters filters);
        Departamento GetById(long id);
		Departamento Add(Departamento entity);
	}
}
