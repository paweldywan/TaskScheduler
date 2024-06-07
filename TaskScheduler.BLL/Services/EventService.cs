using Microsoft.EntityFrameworkCore;
using TaskScheduler.BLL.Interfaces;
using TaskScheduler.DAL;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.BLL.Services
{
    public class EventService(TaskSchedulerContext context) : IEventService
    {
        public Task<List<Event>> Get() => context.Events.ToListAsync();

        public Task Add(Event entity)
        {
            context.Events.Add(entity);

            return context.SaveChangesAsync();
        }

        public Task Update(Event entity)
        {
            context.Events.Update(entity);

            return context.SaveChangesAsync();
        }
    }
}
