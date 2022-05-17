using EventApp.Database;

namespace EventApp.GraphQL
{
  public class Subscription
  {
    [Subscribe]
    public List<Event> NewEvents(int userId, [EventMessage] Event post, [Service] Context db) =>
      db.Events.ToList();
  }
}