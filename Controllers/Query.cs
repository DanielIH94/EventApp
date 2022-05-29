using System.Security.Claims;
using EventApp.Database;
using EventApp.Models;
using EventApp.Repository;
using HotChocolate.AspNetCore.Authorization;

namespace EventApp.GraphQL
{
  [Authorize(Roles = new[] { "Api.ReadWrite" })]
  public class Query
  {
    public bool GetMe(ClaimsPrincipal claims)
    {
      var userId = claims.FindFirstValue(ClaimTypes.NameIdentifier);

      Console.WriteLine(ClaimTypes.NameIdentifier);

      return true;
    }

    [UseProjection]
    public IEnumerable<User> GetAllUsers([Service] IRepositoryWrapper repo, [Service] Context db)
    {
      return repo.User.GetAll();
    }

    [UseProjection]
    public IQueryable<User> GetUser(string userName, [Service] IRepositoryWrapper repo)
    {
      return repo.User.GetUser(userName);
    }

    [UseProjection]
    public IQueryable<Event> GetUserFeed(string userName, [Service] IRepositoryWrapper repo)
    {
      return repo.User.GetFeed(userName);
    }

    [UseProjection]
    public IQueryable<User> GetUserFriends(string userName, [Service] IRepositoryWrapper repo)
    {
      return repo.User.GetFriends(userName);
    }

    // [UseSingleOrDefault]
    // [UseProjection]
    // public IQueryable<Event> GetEvent(int eventId, [Service] Context db, [Service] IRepositoryWrapper repo)
    // {
    //   return from post in db.Events where post.id == eventId select post;      
    // }
  }
}