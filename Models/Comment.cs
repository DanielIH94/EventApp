using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Models
{
  public sealed class Comment
  {
    [GraphQLIgnore]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Comment.user))]
    public string userId { get; set; }
    public User user { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Comment.postedEvent))]
    public int eventId { get; set; }
    public Event postedEvent { get; set; }
    public string content { get; set; }
    public long date { get; set; }
  }

  public sealed class CommentInput
  {
    public string userId { get; set; }
    public int eventId { get; set; }
    public string content { get; set; }
    public int date { get; set; }
  }
}