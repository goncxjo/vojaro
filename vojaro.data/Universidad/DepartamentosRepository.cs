using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class DepartamentosRepository : FilterableRepository<Departamento, UniversidadFilters>, IDepartamentosRepository
    {
        public DepartamentosRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<Departamento> DbSet => Context.Departamentos;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "nombre", "Nombre" },
            { "fechaCreacion ", "FechaCreacion " },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Departamento> GetAll()
        {
            return DbSet;
        }

        public override IQueryable<Departamento> FilterQuery(IQueryable<Departamento> query, UniversidadFilters filter)
        {
            if (filter != null)
            {
                if (filter.DepartamentoId != null)
                {
                    query = query.Where(x => x.Id == filter.DepartamentoId);
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
