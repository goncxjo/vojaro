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
            entity.HasKey(ac => new { ac.AsignaturaId, ac.CorrelativaId });

            entity.HasOne(ac => ac.Asignatura)
                .WithMany(s => s.AsignaturaCorrelativas)
                .HasForeignKey(ac => ac.AsignaturaId);

            entity.HasOne(ac => ac.Correlativa)
                .WithMany(s => s.AsignaturaCorrelativas)
                .HasForeignKey(ac => ac.CorrelativaId);
        }
    }
}
