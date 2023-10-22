using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class AsignaturasRepository : FilterableRepository<Asignatura, AsignaturaFilters>, IAsignaturasRepository
    {
        public AsignaturasRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<Asignatura> DbSet => Context.Asignaturas;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "nombre", "Nombre" },
            { "carrera", "Carrera.Nombre" },
            { "universidad", "Universidad.Siglas" },
            { "fechaCreacion ", "FechaCreacion" },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Asignatura> GetAll()
        {
            return DbSet
                .Include(x => x.Carrera)
                .ThenInclude(x => x.Universidad)
            ;
        }

        public override IQueryable<Asignatura> FilterQuery(IQueryable<Asignatura> query, AsignaturaFilters filter)
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
                if (filter.UniversidadId != null)
                {
                    query = query.Where(x => x.Carrera.UniversidadId == filter.UniversidadId);
                }
            }

            return query;
        }
	}
}
