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
            { "codigo", "Codigo" },
            { "anio", "Anio" },
            { "cuatrimestre", "Cuatrimestre" },
            { "cargaHoraria", "CargaHoraria" },
            { "creditos", "Creditos" },
            { "carrera", "Carrera.Nombre" },
            { "universidad", "Universidad.Siglas" },
            { "fechaCreacion ", "FechaCreacion" },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Asignatura> GetAll()
        {
            return DbSet
                .Include(x => x.AsignaturaCorrelativas)
                .ThenInclude(x => x.Correlativa)
                .Include(x => x.Carrera)
                .ThenInclude(x => x.Universidad)
            ;
        }

        public override IQueryable<Asignatura> FilterQuery(IQueryable<Asignatura> query, AsignaturaFilters filter)
        {
            if (filter != null)
            {
                if (filter.TipoFiltro == AsignaturaFilters.TipoFiltroAsignatura.Asignatura) {
                    if (filter.Id != null)
                    {
                        query = query.Where(x => x.Id == filter.Id);
                    }
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
                    if (filter.UniversidadId != null)
                    {
                        query = query.Where(x => x.Carrera.UniversidadId == filter.UniversidadId);
                    }
                    if (filter.Cuatrimestre != null)
                    {
                        query = query.Where(x => x.Cuatrimestre == filter.Cuatrimestre);
                    }
                }
                if (filter.TipoFiltro == AsignaturaFilters.TipoFiltroAsignatura.Correlativa) {
                    if (filter.Id != null)
                    {
                        query = query.Where(x => x.Id != filter.Id);
                    }
                    if (filter.Cuatrimestre != null)
                    {
                        query = query.Where(x => x.Cuatrimestre <= filter.Cuatrimestre);
                    }
                }
            }

            return query;
        }
	}
}
