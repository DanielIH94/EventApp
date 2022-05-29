using EventApp.Database;

namespace EventApp.Repository
{
  public class RepositoryWrapper : IRepositoryWrapper
  {
    private Context _repoContext;
    private ICommentRepository _comment;
    private IEventRepository _event;
    private IFriendRepository _friend;
    private IInvitationRepository _invitation;
    private IUserRepository _user;

    public ICommentRepository Comment
    {
      get
      {
        if (_comment == null)
        {
          _comment = new CommentRepository(_repoContext);
        }

        return _comment;
      }
    }

    public IEventRepository Event
    {
      get
      {
        if (_event == null)
        {
          _event = new EventRepository(_repoContext);
        }

        return _event;
      }
    }

    public IFriendRepository Friend
    {
      get
      {
        if (_friend == null)
        {
          _friend = new FriendRepository(_repoContext);
        }

        return _friend;
      }
    }

    public IInvitationRepository Invitation
    {
      get
      {
        if (_invitation == null)
        {
          _invitation = new InvitationRepository(_repoContext);
        }

        return _invitation;
      }
    }

    public IUserRepository User
    {
      get
      {
        if (_user == null)
        {
          _user = new UserRepository(_repoContext);
        }

        return _user;
      }
    }

    public RepositoryWrapper(Context repositoryContext)
    {
      _repoContext = repositoryContext;
    }

    public void Save()
    {
      _repoContext.SaveChanges();
    }
  }
}
