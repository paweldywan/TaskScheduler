using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.DAL
{
    public class TaskSchedulerContext(DbContextOptions options) : IdentityDbContext(options), IDataProtectionKeyContext
    {
        public virtual DbSet<Event> Events { get; set; }

        public virtual DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
