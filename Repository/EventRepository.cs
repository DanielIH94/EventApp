using EventApp.Database;
using EventApp.Models;

namespace EventApp.Repository
{
  public class EventRepository : Repository<Event>, IEventRepository
  {
    public EventRepository(Context context) : base(context)
    {
    }
  }
}