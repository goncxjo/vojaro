using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;
using vojaro.filters;

namespace vojaro.data
{
    public class UniversidadesRepository : FilterableRepository<Universidad, UniversidadFilters>, IUniversidadesRepository
    {
        public UniversidadesRepository(VojaroDbContext context)
            : base(context)
        {
        }

        protected override DbSet<Universidad> DbSet => Context.Universidades;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "siglas", "Siglas" },
            { "nombre", "Nombre" },
            { "fechaCreacion ", "FechaCreacion " },
            { "fechaUltimaModificacion", "FechaUltimaModificacion" },
        };

        public override IQueryable<Universidad> GetAll()
        {
            return DbSet;
        }

        public override IQueryable<Universidad> FilterQuery(IQueryable<Universidad> query, UniversidadFilters filter)
        {
            if (filter != null)
            {
                if (!String.IsNullOrEmpty(filter.Siglas))
                {
                    query = query.Where(x => x.Siglas.ToLower() == filter.Siglas.ToLower());
                }
                if (!String.IsNullOrEmpty(filter.Nombre))
                {
                    query = query.Where(x => x.Nombre.ToLower() == filter.Nombre.ToLower());
                }
                if (!String.IsNullOrEmpty(filter.ParteNombreSiglas))
                {
                    var pattern = String.Format("%{0}%", filter.ParteNombreSiglas.ToLower());
                    query = query.Where(x => 
                        EF.Functions.Like(x.Nombre, pattern) ||
                        EF.Functions.Like(x.Siglas, pattern)
                    );
                }
            }

            return query;
        }
	}
}
