using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TaskScheduler.BLL.Interfaces;
using TaskScheduler.DAL;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.BLL.Services
{
    public class EventService(TaskSchedulerContext context, IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> userManager) : IEventService
    {
        private string? UserId => userManager.GetUserId(httpContextAccessor.HttpContext.User);

        public Task<List<Event>> Get() => context.Events
            .Where(e => e.UserId == UserId)
            .ToListAsync();

        public Task Add(Event entity)
        {
            entity.UserId = UserId;

            context.Events.Add(entity);

            return context.SaveChangesAsync();
        }

        public Task Update(Event entity)
        {
            entity.UserId = UserId;

            context.Events.Update(entity);

            return context.SaveChangesAsync();
        }

        public Task Delete(int id) => context.Events
            .Where(e =>
                e.Id == id &&
                e.UserId == UserId
            )
            .ExecuteDeleteAsync();
    }
}
