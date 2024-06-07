
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

            var environment = builder.Environment;

            var configuration = builder.Configuration;

            services.AddControllers();

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddSqlServer<TaskSchedulerContext>(connectionString);

            services.AddScoped<TaskSchedulerSeeder>();

            var app = builder.Build();

            using var scope = app.Services.CreateScope();

            var seeder = scope.ServiceProvider.GetRequiredService<TaskSchedulerSeeder>();

            seeder.Migrate().Wait();

            app.UseDefaultFiles();

            app.UseStaticFiles();

            if (environment.IsDevelopment())
            {
                app.UseSwagger();

                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
