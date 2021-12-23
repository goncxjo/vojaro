using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace vojaro.data
{
	public class VojaroDbContextFactory : IDesignTimeDbContextFactory<VojaroDbContext>
	{
		public VojaroDbContext CreateDbContext(string[] args)
		{
			var configurationBuilder = new ConfigurationBuilder()
				 .SetBasePath(Directory.GetCurrentDirectory())
				 .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

			IConfigurationRoot configuration = configurationBuilder.Build();
			string connectionString = configuration.GetConnectionString("DefaultConnection");

			var optionsBuilder = new DbContextOptionsBuilder<VojaroDbContext>()
                .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString), options =>
					options
						.EnableStringComparisonTranslations()
						.EnableRetryOnFailure()
				);

			return new VojaroDbContext(optionsBuilder.Options);
		}
	}
}
