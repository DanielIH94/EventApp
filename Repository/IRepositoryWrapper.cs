namespace EventApp.Repository
{
  public interface IRepositoryWrapper
  {
    ICommentRepository Comment { get; }
    IEventRepository Event { get; }
    IFriendRepository Friend { get; }
    IInvitationRepository Invitation { get; }
    IUserRepository User { get; }
    void Save();
  }
}