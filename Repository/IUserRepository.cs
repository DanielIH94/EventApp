using EventApp.Models;

namespace EventApp.Repository
{
  public interface IUserRepository : IRepository<User>
  {
    IEnumerable<User> GetAll();
    IEnumerable<Event> GetEvents(string user);
    IQueryable<Event> GetFeed(string user);
    IQueryable<User> GetFriends(string user);
    IQueryable<User> GetUser(string user);
  }
}