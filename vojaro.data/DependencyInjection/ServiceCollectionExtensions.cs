
using vojaro.data;

namespace Microsoft.Extensions.DependencyInjection
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddAppUnitOfWork(this IServiceCollection services, string connectionString)
		{
			services.AddDbContext<VojaroDbContext>(
				//x => x.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
			);
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			return services;
		}
	}
}
