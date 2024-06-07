using Microsoft.EntityFrameworkCore;

namespace TaskScheduler.DAL.SampleData
{
    public class TaskSchedulerSeeder(TaskSchedulerContext context)
    {
        public async Task Migrate()
        {
            var canMigrate = (await context.Database.GetPendingMigrationsAsync()).Any();

            if (canMigrate)
                await context.Database.MigrateAsync();
        }
    }
}
