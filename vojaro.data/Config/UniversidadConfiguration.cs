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
        }
    }
}
