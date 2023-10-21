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
            entity.HasNoKey();
        }
    }
}
