using Microsoft.EntityFrameworkCore;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.DAL
{
    public class TaskSchedulerContext(DbContextOptions options) : DbContext(options)
    {
        public virtual DbSet<Event> Events { get; set; }
    }
}
