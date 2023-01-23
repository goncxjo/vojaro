using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class CarrerasRepository : FilterableRepository<Carrera, CarreraFilters>, ICarrerasRepository
    {
        public CarrerasRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<Carrera> DbSet => Context.Carreras;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "nombre", "Nombre" },
            { "fechaCreacion ", "FechaCreacion " },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Carrera> GetAll()
        {
            return DbSet;
        }

        public override IQueryable<Carrera> FilterQuery(IQueryable<Carrera> query, CarreraFilters filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.Nombre))
                {
                    query = query.Where(x => x.Nombre.ToLower() == filter.Nombre.ToLower());
                }
            }

            return query;
        }
	}
}
