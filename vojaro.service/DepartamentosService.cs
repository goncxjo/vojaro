using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using vojaro.api.exceptions;
using vojaro.data;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.services
{
    public class DepartamentosService : IDepartamentosService
    {
        private readonly IUnitOfWork unitOfWork;
        private IDepartamentosRepository GetRepository() => this.unitOfWork.DepartamentosRepository;

        public DepartamentosService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<Departamento> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        public Departamento GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public Departamento Create(Departamento model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

			var filters = new UniversidadFilters
			{
				// UserId = userId,
                DepartamentoId = model.Id,
				Nombre = model.Nombre,
                Id = model.UniversidadId
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe un departamento con ese nombre");
			}

            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);

            this.unitOfWork.Commit();
            
            return result;
        }

        public Departamento Update(Departamento model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

            var dbEntity = GetRepository().GetById(model.Id);

            dbEntity.Nombre = model.Nombre;
            dbEntity.FechaUltimaModificacion = DateTime.Now;
            dbEntity.UniversidadId = model.UniversidadId;
            // dbEntity.UserIdUltimaModificacion = userId;


            this.unitOfWork.Commit();

            return dbEntity;
        }

        public IEnumerable<Departamento> Find(UniversidadFilters filters)
        {
            return this.GetRepository().Find(filters);
        }
	}
}
