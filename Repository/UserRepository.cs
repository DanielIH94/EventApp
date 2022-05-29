using EventApp.Database;
using EventApp.Models;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Repository
{
  public class UserRepository : Repository<User>, IUserRepository
  {
    public UserRepository(Context context) : base(context)
    {
    }

    public IEnumerable<User> GetAll() => FindAll().ToList();
    public IEnumerable<Event> GetEvents(string user) => GetUser(user).First().events.ToList();
    public IQueryable<Event> GetFeed(string user) => 
      GetFriends(user).SelectMany(friend => friend.events);
    public IQueryable<User> GetFriends(string user) =>
      GetUser(user).SelectMany(usr => usr.followings).Select(f => f.following);
    public IQueryable<User> GetUser(string user) => FindByCondition(u => u.user == user);
  }
}