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

        protected override DbSet<Universidad> DbSet => null;

		protected override IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>() 
        {
            { "id", "Id" },
            { "siglas", "Siglas" },
            { "nombre", "Nombre" },
            { "fechaIns", "fechaIns" },
            { "fechaMod", "fechaMod" },
        };

        private static readonly string[] Siglas = new[] { "UNDAV", "UNAJ", "UNQ", "UBA", "UTN", "UNLZ", "UNLa" };
        private static readonly string[] Nombres = new[] { "Universidad Nacional de Avellaneda", "Universidad Nacional Arturo Jauretche", "Universidad Nacional de Quilmes", "Universidad Nacional de Buenos Aires", "Universidad Tecnológica Nacional", "Universidad Nacional de Lomas de Zamora", "Universidad Nacional de Lanús" };

        public override IQueryable<Universidad> GetAll()
        {
            return Enumerable.Range(1, 7).Select(index => new Universidad
            {
                Id = index,
                Siglas = Siglas[index - 1],
                Nombre = Nombres[index - 1],
                FechaIns = DateTime.Now,
            })
            .AsQueryable();
        }

        public override IQueryable<Universidad> FilterQuery(IQueryable<Universidad> query, UniversidadFilters filter)
        {
            if (filter != null)
            {
                if (filter.Nombre != null)
                {
                    StringComparison comp = StringComparison.OrdinalIgnoreCase;
                    query = query.Where(x => x.Nombre.Contains(filter.Nombre, comp) || x.Siglas.Contains(filter.Nombre, comp));
                }
            }

            return query;
        }
    }
}
