using Microsoft.EntityFrameworkCore;
using vojaro.data.Config;
using vojaro.domain;

namespace vojaro.data
{
    public partial class VojaroDbContext : DbContext
    {
        public VojaroDbContext(DbContextOptions<VojaroDbContext> options)
            : base(options)
        {
        }

        public DbSet<Universidad> Universidades { get; set; }
        public DbSet<Departamento> Departamentos { get; set; }
        public DbSet<Sede> Sedes { get; set; }
        public DbSet<Carrera> Carreras { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new UniversidadConfiguration());
            modelBuilder.ApplyConfiguration(new DepartamentoConfiguration());
            modelBuilder.ApplyConfiguration(new SedeConfiguration());
            modelBuilder.ApplyConfiguration(new CarreraConfiguration());
        }
    }
}
