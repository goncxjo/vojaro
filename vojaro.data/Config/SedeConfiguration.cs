using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class SedeConfiguration : IEntityTypeConfiguration<Sede>
    {
        public void Configure(EntityTypeBuilder<Sede> entity)
        {
            entity.ToTable("sedes");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired();
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);

        }
    }
}
