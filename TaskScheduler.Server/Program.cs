using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskScheduler.BLL.Interfaces;
using TaskScheduler.BLL.Services;
using TaskScheduler.DAL;
using TaskScheduler.DAL.SampleData;

namespace TaskScheduler.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var services = builder.Services;

            var configuration = builder.Configuration;

            var environment = builder.Environment;

            AddServices(services, configuration, environment);

            var app = builder.Build();

            SeedDatabase(app);

            AddMiddlewares(app);

            app.MapControllers();

            app.MapRazorPages();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }

        private static void AddServices(IServiceCollection services, ConfigurationManager configuration, IWebHostEnvironment webHostEnvironment)
        {
            services.AddControllers();

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

            services.AddHttpContextAccessor();

            ConfigureDatabase(services, configuration, webHostEnvironment);

            ConfigureIdentity(services);

            services.AddScoped<TaskSchedulerSeeder>();

            services.AddScoped<IEventService, EventService>();
        }

        private static void AddMiddlewares(WebApplication app)
        {
            app.UseDefaultFiles();

            app.UseStaticFiles();

            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseMigrationsEndPoint();

                app.UseSwagger();

                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();

            app.UseAuthorization();
        }

        private static void ConfigureDatabase(IServiceCollection services, ConfigurationManager configuration, IWebHostEnvironment webHostEnvironment)
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddNpgsql<TaskSchedulerContext>(connectionString);

            var isDevelopment = webHostEnvironment.IsDevelopment();

            if (isDevelopment)
                services.AddDatabaseDeveloperPageExceptionFilter();
        }

        private static void SeedDatabase(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var seeder = scope.ServiceProvider.GetRequiredService<TaskSchedulerSeeder>();

            seeder.Seed().Wait();
        }

        private static void ConfigureIdentity(IServiceCollection services)
        {
            services.AddDefaultIdentity<IdentityUser>()
                .AddEntityFrameworkStores<TaskSchedulerContext>();

            services.AddDataProtection()
                .PersistKeysToDbContext<TaskSchedulerContext>();

            services.AddAuthorization();

            services.ConfigureApplicationCookie(options =>
            {
                options.Events.OnRedirectToAccessDenied = context =>
                {
                    if (!context.Request.Path.StartsWithSegments("/Identity"))
                    {
                        context.Response.StatusCode = 403;
                    }
                    else
                    {
                        context.Response.Redirect(options.AccessDeniedPath);
                    }

                    return Task.CompletedTask;
                };

                options.Events.OnRedirectToLogin = context =>
                {
                    if (!context.Request.Path.StartsWithSegments("/Identity"))
                    {
                        context.Response.StatusCode = 401;
                    }
                    else
                    {
                        context.Response.Redirect(options.LoginPath);
                    }

                    return Task.CompletedTask;
                };
            });
        }
    }
}
