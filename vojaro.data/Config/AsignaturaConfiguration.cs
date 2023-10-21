using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class AsignaturaConfiguration : IEntityTypeConfiguration<Asignatura>
    {
        public void Configure(EntityTypeBuilder<Asignatura> entity)
        {
            entity.ToTable("asignaturas");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired();
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);

            entity.HasOne(e => e.Carrera)
            .WithMany(e => e.Asignaturas)
            .HasForeignKey(e => e.CarreraId)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.CarreraOrientacion)
            .WithMany(e => e.Asignaturas)
            .HasForeignKey(e => e.CarreraOrientacionId)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany(e => e.Correlativas)
            .WithMany(e => e.Asignaturas)
            .UsingEntity<AsignaturaCorrelativa>(
                l => l.HasOne<Correlativa>().WithMany().HasForeignKey(e => e.CorrelativaId),
                r => r.HasOne<Asignatura>().WithMany().HasForeignKey(e => e.AsignaturaId)
            );
        }
    }
}
