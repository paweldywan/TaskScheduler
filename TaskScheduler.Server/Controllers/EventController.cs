using Microsoft.AspNetCore.Mvc;
using TaskScheduler.BLL.Interfaces;
using TaskScheduler.DAL.Entities;

namespace TaskScheduler.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController(IEventService eventService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var events = await eventService.Get();

            return Ok(events);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Event entity)
        {
            await eventService.Add(entity);

            return Ok();
        }
    }
}
