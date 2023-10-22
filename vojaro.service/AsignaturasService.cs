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
    public class AsignaturasService : IAsignaturasService
    {
        private readonly IUnitOfWork unitOfWork;
        private IAsignaturasRepository GetRepository() => this.unitOfWork.AsignaturasRepository;

        public AsignaturasService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<Asignatura> GetPaged(int pageNumber, int pageSize, PageSort[] sort, AsignaturaFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        public Asignatura GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public Asignatura Create(Asignatura model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

			var filters = new AsignaturaFilters
			{
				// UserId = userId,
				Nombre = model.Nombre,
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe una Asignatura con ese nombre");
			}

            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);

            this.unitOfWork.Commit();
            
            return result;
        }

        public Asignatura Update(Asignatura model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

            var dbEntity = GetRepository().GetById(model.Id);

            dbEntity.Nombre = model.Nombre;
            dbEntity.CarreraId = model.CarreraId;
            dbEntity.FechaUltimaModificacion = DateTime.Now;
            // dbEntity.UserIdUltimaModificacion = userId;


            this.unitOfWork.Commit();

            return dbEntity;
        }

        public IEnumerable<Asignatura> Find(AsignaturaFilters filters)
        {
            return this.GetRepository().Find(filters);
        }

        public PagedData<Asignatura> GetPagedCorrelativas(int pageNumber, int pageSize, PageSort[] sort, AsignaturaFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

	}
}
