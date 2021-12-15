using System;
using System.Collections.Generic;
using vojaro.data;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public class UniversidadesService : IUniversidadesService
    {
        private readonly IUnitOfWork unitOfWork;

        public UniversidadesService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public Universidad GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public PagedData<Universidad> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        private IUniversidadesRepository GetRepository() => this.unitOfWork.UniversidadesRepository;
    }
}
