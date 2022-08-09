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
    public class SedesService : ISedesService
    {
        private readonly IUnitOfWork unitOfWork;
        private ISedesRepository GetRepository() => this.unitOfWork.SedesRepository;

        public SedesService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<Sede> GetPaged(int pageNumber, int pageSize, PageSort[] sort, UniversidadFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        public Sede GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public Sede Create(Sede model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

			var filters = new UniversidadFilters
			{
				// UserId = userId,
                SedeId = model.Id,
				Nombre = model.Nombre,
                Id = model.UniversidadId
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe una sede con ese nombre");
			}

            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);

            this.unitOfWork.Commit();
            
            return result;
        }

        public Sede Update(Sede model, ClaimsPrincipal claimsPrincipal)
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
	}
}
