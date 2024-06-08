using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.DAL.Configuration.Entity
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.Property(t => t.UserId)
                .IsRequired();
        }
    }
}
