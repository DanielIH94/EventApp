using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Database
{
  public enum InvitationStatus
  {
    Responded,
    NoResponded
  }

  public sealed class Invitation
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Invitation.participant))]
    public int partId { get; set; }
    public User participant { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Invitation.eventFrom))]
    public int eventId { get; set; }
    public Event eventFrom;
    public InvitationStatus status { get; set; } = InvitationStatus.NoResponded;
  }

  public sealed class InvitationInput
  {
    public int partId { get; set; }
    public int eventId { get; set; }
    public InvitationStatus? status { get; set; }
  }
}