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
    public class CarrerasService : ICarrerasService
    {
        private readonly IUnitOfWork unitOfWork;
        private ICarrerasRepository GetRepository() => this.unitOfWork.CarrerasRepository;

        public CarrerasService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<Carrera> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        public Carrera GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public Carrera Create(Carrera model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

			var filters = new CarreraFilters
			{
				// UserId = userId,
				Nombre = model.Nombre,
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe una carrera con ese nombre");
			}

            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);

            this.unitOfWork.Commit();
            
            return result;
        }

        public Carrera Update(Carrera model, ClaimsPrincipal claimsPrincipal)
        {
			// string userId = user.GetUserId();

            var dbEntity = GetRepository().GetById(model.Id);

            dbEntity.Nombre = model.Nombre;
            dbEntity.FechaUltimaModificacion = DateTime.Now;
            // dbEntity.UserIdUltimaModificacion = userId;


            this.unitOfWork.Commit();

            return dbEntity;
        }

        public IEnumerable<Carrera> Find(CarreraFilters filters)
        {
            return this.GetRepository().Find(filters);
        }
	}
}
