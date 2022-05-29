using EventApp.Database;
using EventApp.Models;

namespace EventApp.Repository
{
  public class CommentRepository : Repository<Comment>, ICommentRepository
  {
    public CommentRepository(Context context) : base(context)
    {
    }
  }
}