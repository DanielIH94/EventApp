using EventApp.Database;
using EventApp.Models;

namespace EventApp.Repository
{
  public class FriendRepository : Repository<Follow>, IFriendRepository
  {
    public FriendRepository(Context context) : base(context)
    {
    }
  }
}