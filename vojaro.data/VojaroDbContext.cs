using Microsoft.EntityFrameworkCore;

namespace vojaro.data
{
    public partial class VojaroDbContext : DbContext
    {
        public VojaroDbContext(DbContextOptions<VojaroDbContext> options)
            : base(options)
        {
        }
    }
}
