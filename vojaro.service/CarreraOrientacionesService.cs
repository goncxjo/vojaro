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
	public class CarreraOrientacionesService : ICarreraOrientacionesService
    {
        private readonly IUnitOfWork unitOfWork;
        private ICarreraOrientacionesRepository GetRepository() => this.unitOfWork.CarreraOrientacionesRepository;

        public CarreraOrientacionesService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public PagedData<CarreraOrientacion> GetPaged(int pageNumber, int pageSize, PageSort[] sort, CarreraFilters filter)
        {
            return this.GetRepository().GetPaged(pageNumber, pageSize, sort, filter);
        }

        public CarreraOrientacion GetById(long id)
        {
            return this.GetRepository().GetById(id);
        }

        public OperationResult<CarreraOrientacion> Create(CarreraOrientacion model, ClaimsPrincipal claimsPrincipal)
        {
            var validationResult = Validar(model);
            if (!validationResult.Succeeded)
            {
                return OperationResult<CarreraOrientacion>.Failed(validationResult.Errors);
            }
            model.FechaCreacion = DateTime.Now;

            var result = GetRepository().Add(model);
            this.unitOfWork.Commit();

            return OperationResult<CarreraOrientacion>.Success(result);

        }

        public OperationResult<CarreraOrientacion> Update(CarreraOrientacion model, ClaimsPrincipal claimsPrincipal)
        {
            var dbEntity = this.GetById(model.Id);
            if (dbEntity == null)
            {
                return OperationResult<CarreraOrientacion>.NotFound();
            }

            var validationResult = Validar(model);
            if (!validationResult.Succeeded)
            {
                return OperationResult<CarreraOrientacion>.Failed(validationResult.Errors);
            }

            dbEntity.Nombre = model.Nombre;
            dbEntity.FechaUltimaModificacion = DateTime.Now;
            // dbEntity.UserIdUltimaModificacion = userId;

            this.unitOfWork.Commit();

            return OperationResult<CarreraOrientacion>.Success(dbEntity);
        }

        public IEnumerable<CarreraOrientacion> Find(CarreraFilters filters)
        {
            return this.GetRepository().Find(filters);
        }


        private ValidationResult Validar(CarreraOrientacion model)
        {
            var errors = new List<string>();

			// string userId = user.GetUserId();

			var filters = new CarreraFilters
			{
				// UserId = userId,
                CarreraId = model.CarreraId,
				Nombre = model.Nombre,
			};

			if (this.GetRepository().Find(filters).Any())
			{
				throw new ValidationException("Ya existe una orientación con ese nombre");
			}

            var carreraFilter = new CarreraFilters()
            {
                Id = model.CarreraId
            };

            var distribucion = this.unitOfWork.CarrerasRepository.Find(carreraFilter).SingleOrDefault();
            if (distribucion == null)
            {
                errors.Add($"La carrera #'{model.CarreraId}' no existe");
            }

            if (errors.Any())
            {
                return ValidationResult.Failed(errors);
            }
            return ValidationResult.Success();
        }
	}
}
