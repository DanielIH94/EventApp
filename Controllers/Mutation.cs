using HotChocolate.Subscriptions;
using EventApp.Database;
using EventApp.Models;

namespace EventApp.GraphQL
{
  public class Mutation
  {
    public async Task<User?> LoginUser(UserInput input, [Service] Context db)
    {
      if (db.Users.Find(input.userId) is var user)
      {
        var newUser = new User()
        {
          first = input.first,
          last = input.last,
          user = input.user,
          avatarImage = input.avatar
        };

        await db.Users.AddAsync(newUser);
        await db.SaveChangesAsync();

        return newUser;
      }

      return user;
    }

    public async Task<Event> CreateEvent(EventInput post, [Service] ITopicEventSender sender, [Service] Context db)
    {
      var newEvent = new Event()
      {
        title = post.title,
        description = post.description,
        userId = post.userId,
        date = post.date
      };

      await db.Events.AddAsync(newEvent);
      await db.SaveChangesAsync();
      await sender.SendAsync(nameof(Subscription.NewEvents), newEvent);

      return newEvent;
    }

    public async Task<Comment> CreateComment(CommentInput comment, [Service] Context db)
    {
      var newComment = new Comment()
      {
        content = comment.content,
        date = comment.date,
        eventId = comment.eventId,
        userId = comment.userId
      };

      await db.Comments.AddAsync(newComment);
      await db.SaveChangesAsync();

      return newComment;
    }

    public async Task<bool> CreateFriendship(FriendInput input, [Service] Context db)
    {
      await db.Friends.AddAsync(new Follow()
      {
        followerId = input.friendOne,
        followingId = input.friendTwo
      });

      await db.Friends.AddAsync(new Follow()
      {
        followerId = input.friendTwo,
        followingId = input.friendOne
      });

      db.SaveChanges();

      return true;
    }
  }
}