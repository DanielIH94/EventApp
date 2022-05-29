using EventApp.Database;
using EventApp.Models;

namespace EventApp.Repository
{
  public class InvitationRepository : Repository<Invitation>, IInvitationRepository
  {
    public InvitationRepository(Context context) : base(context)
    {
    }
  }
}