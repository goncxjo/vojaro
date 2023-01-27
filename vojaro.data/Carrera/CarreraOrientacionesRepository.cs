using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class CarreraOrientacionesRepository : FilterableRepository<CarreraOrientacion, CarreraFilters>, ICarreraOrientacionesRepository
    {
        public CarreraOrientacionesRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<CarreraOrientacion> DbSet => Context.CarrerasOrientaciones;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "nombre", "Nombre" },
            { "universidad", "Universidad.Siglas" },
            { "departamento", "Departamento.Nombre" },
            { "fechaCreacion ", "FechaCreacion " },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<CarreraOrientacion> GetAll()
        {
            return DbSet
                .Include(x => x.Carrera)
            ;
        }

        public override IQueryable<CarreraOrientacion> FilterQuery(IQueryable<CarreraOrientacion> query, CarreraFilters filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.Nombre))
                {
                    query = query.Where(x => x.Nombre.ToLower() == filter.Nombre.ToLower());
                }
                if (filter.CarreraId != null)
                {
                    query = query.Where(x => x.CarreraId == filter.CarreraId);
                }
            }

            return query;
        }
	}
}
