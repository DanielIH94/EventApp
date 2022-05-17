using HotChocolate.Subscriptions;
using EventApp.Database;

namespace EventApp.GraphQL
{
  public class Mutation
  {
    public async Task<User> CreateUser(UserInput input, [Service] Context db)
    {
      var newUser = new User() {
        first = input.first,
        last = input.last,
        user = input.user,
        avatarImage = input.avatar
      };

      await db.Users.AddAsync(newUser);

      return newUser;
    }

    public async Task<Event> CreateEvent(Event post, [Service] ITopicEventSender sender, [Service] Context db)
    {
      await db.Events.AddAsync(post);
      await db.SaveChangesAsync();
      await sender.SendAsync(nameof(Subscription.NewEvents), post);

      return post;
    }
  }
}