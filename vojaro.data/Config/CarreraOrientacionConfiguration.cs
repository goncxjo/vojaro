using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using vojaro.domain;

namespace vojaro.data.Config
{
    public class CarreraOrientacionConfiguration : IEntityTypeConfiguration<CarreraOrientacion>
    {
        public void Configure(EntityTypeBuilder<CarreraOrientacion> entity)
        {
            entity.ToTable("carreras_orientaciones");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Nombre).IsRequired();
            entity.Property(e => e.FechaCreacion).IsRequired();
            entity.Property(e => e.FechaUltimaModificacion);
            entity.Property(e => e.UsuarioUltimaModificacion);
        }
    }
}
