using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class AsignaturaCorrelativaConfiguration : IEntityTypeConfiguration<AsignaturaCorrelativa>
    {
        public void Configure(EntityTypeBuilder<AsignaturaCorrelativa> entity)
        {
            entity.ToTable("asignaturas_correlativas");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);
        }
    }
}
