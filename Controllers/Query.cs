using EventApp.Database;

namespace EventApp.GraphQL
{
  public class Query
  {
    [UseSingleOrDefault]
    [UseProjection]
    public IQueryable<User> GetUser(int userId, [Service] Context db)
    {
      return from user in db.Users where user.id == userId select user;
    }

    [UseSingleOrDefault]
    [UseProjection]
    public IQueryable<Event> GetEvent(int eventId, [Service] Context db)
    {
      return from post in db.Events where post.id == eventId select post;
    }
  }
}