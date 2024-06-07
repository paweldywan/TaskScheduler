namespace TaskScheduler.DAL.Entities
{
    public class Event
    {
        public int Id { get; set; }

        public string? Title { get; set; }

        public DateTime? Start { get; set; }

        public DateTime? End { get; set; }

        public bool AllDay { get; set; }
    }
}
