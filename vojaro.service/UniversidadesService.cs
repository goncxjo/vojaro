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
    public class UniversidadesService : IUniversidadesService
    {
        private readonly IUnitOfWork unitOfWork;
        private IUniversidadesRepository GetRepository() => this.unitOfWork.UniversidadesRepository;

        public UniversidadesService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<Universidad> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }
        public Universidad GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public Universidad Create(Universidad model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

			var filters = new UniversidadFilters
			{
				// UserId = userId,
				Siglas = model.Siglas,
				Nombre = model.Nombre,
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe una universidad con ese nombre y/o siglas");
			}

            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);

            this.unitOfWork.Commit();
            
            return result;
        }

        public Universidad Update(Universidad model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

            var dbEntity = GetRepository().GetById(model.Id);

            dbEntity.Siglas = model.Siglas;
            dbEntity.Nombre = model.Nombre;
            dbEntity.FechaUltimaModificacion = DateTime.Now;
            // dbEntity.UserIdUltimaModificacion = userId;


            this.unitOfWork.Commit();

            return dbEntity;
        }
    }
}
