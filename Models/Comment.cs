using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Database
{
  public sealed class Comment
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Comment.user))]
    public int userId { get; set; }
    public User user { get; set; }
    [GraphQLIgnore]
    [Required]
    [ForeignKey(nameof(Comment.postedEvent))]
    public int eventId { get; set; }
    public Event postedEvent { get; set; }
    public string content { get; set; }
    public int date { get; set; }
  }

  public sealed class CommentInput
  {
    public int userId { get; set; }
    public int eventId { get; set; }
    public string content { get; set; }
    public int date { get; set; }
  }
}