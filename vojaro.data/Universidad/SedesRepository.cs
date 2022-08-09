using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class SedesRepository : FilterableRepository<Sede, UniversidadFilters>, ISedesRepository
    {
        public SedesRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<Sede> DbSet => Context.Sedes;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "nombre", "Nombre" },
            { "fechaCreacion ", "FechaCreacion " },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Sede> GetAll()
        {
            return DbSet;
        }

        public override IQueryable<Sede> FilterQuery(IQueryable<Sede> query, UniversidadFilters filter)
        {
            if (filter != null)
            {
                if (filter.SedeId != null)
                {
                    query = query.Where(x => x.Id == filter.SedeId);
                }
                if (filter.Id != null)
                {
                    query = query.Where(x => x.UniversidadId == filter.Id);
                }
            }

            return query;
        }
	}
}
