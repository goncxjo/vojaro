using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Globalization;
using vojaro.api.Extensions;

namespace vojaro.api
{
    public class Startup
    {
        private const string GLOBAL_CORS_POLICY_NAME = "GlobalCorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLocalization();

            services.AddAutoMapper(typeof(Startup));

            services.AddAppServices();
            services.AddAppUnitOfWork(Configuration.GetConnectionString("DefaultConnection"));
            services.AddHttpClient();

            services.AddCors(o => o.AddPolicy(GLOBAL_CORS_POLICY_NAME, builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            ));

            services.AddControllers()
                .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>())
                .AddJsonOptions(options => { });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "vojaro.api", Version = "v1" });
            });

            services.ConfigureApiBehaviorOptions();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            ConfigureCulture(app, Configuration.GetValue<string>("Culture") ?? "en-US");

            app.UseSerilogRequestLogging();

            app.UseAPIExceptionHandler();
            app.UseAPIStatusCodePages();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "vojaro.api v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(GLOBAL_CORS_POLICY_NAME);

            app.UseAuthorization();

            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
        private void ConfigureCulture(IApplicationBuilder app, string cultureName)
        {
            var supportedCultures = new[]{
                new CultureInfo(cultureName)
            };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(cultureName),
                SupportedCultures = supportedCultures,
                FallBackToParentCultures = false
            });
            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.CreateSpecificCulture(cultureName);
        }
    }
}
