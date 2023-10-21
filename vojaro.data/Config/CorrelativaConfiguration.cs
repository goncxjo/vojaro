using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class CorrelativaConfiguration : IEntityTypeConfiguration<Correlativa>
    {
        public void Configure(EntityTypeBuilder<Correlativa> entity)
        {
            entity.ToTable("correlativas");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);
        }
    }
}
