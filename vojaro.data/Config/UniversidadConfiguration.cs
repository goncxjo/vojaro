using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class UniversidadConfiguration : IEntityTypeConfiguration<Universidad>
    {
        public void Configure(EntityTypeBuilder<Universidad> entity)
        {
            entity.ToTable("universidades");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Siglas).HasColumnType("nvarchar(10)").IsRequired();
            entity.Property(e => e.Nombre).IsRequired();
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);
            
            entity.HasMany<Sede>(e => e.Sedes)
            .WithOne(e => e.Universidad)
            .HasForeignKey(e => e.UniversidadId)
            .OnDelete(DeleteBehavior.Cascade);

            entity.HasMany<Departamento>(e => e.Departamentos)
            .WithOne(e => e.Universidad)
            .HasForeignKey(e => e.UniversidadId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
