using System.Text.Json.Serialization;

namespace TaskScheduler.DAL.Entities
{
    public class Event
    {
        [JsonPropertyName("resource")]
        public int Id { get; set; }

        public string? Title { get; set; }

        public DateTimeOffset? Start { get; set; }

        public DateTimeOffset? End { get; set; }

        public bool AllDay { get; set; }

        public string? UserId { get; set; }
    }
}
