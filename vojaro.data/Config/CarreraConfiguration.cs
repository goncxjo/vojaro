using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class CarreraConfiguration : IEntityTypeConfiguration<Carrera>
    {
        public void Configure(EntityTypeBuilder<Carrera> entity)
        {
            entity.ToTable("carreras");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired();
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);

            entity.HasOne(e => e.Universidad)
            .WithMany(e => e.Carreras)
            .HasForeignKey(e => e.UniversidadId)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Departamento)
            .WithMany(e => e.Carreras)
            .HasForeignKey(e => e.DepartamentoId)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany<CarreraOrientacion>(e => e.Orientaciones)
            .WithOne(e => e.Carrera)
            .HasForeignKey(e => e.CarreraId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
