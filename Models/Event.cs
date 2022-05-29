using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Models
{
  public sealed class Event
  {
    [GraphQLIgnore]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Event.user))]
    public string userId { get; set; }
    public User user { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public long date { get; set; }
    public ICollection<Comment> comments { get; set; }
  }

  public sealed class EventInput
  {
    public string userId { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public long date { get; set; }
  }
}
