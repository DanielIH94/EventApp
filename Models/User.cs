using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Models
{
  public sealed class User
  {
    [GraphQLIgnore]
    [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string id { get; set; }
    public string user { get; set; }
    public string first { get; set; }
    public string last { get; set; }
    public string? avatarImage { get; set; }
    public ICollection<Event> events { get; set; }
    [InverseProperty(nameof(Follow.follower))]
    public ICollection<Follow> followings { get; set; }
    [InverseProperty(nameof(Follow.following))]
    public ICollection<Follow> followers { get; set; }
  }

  public sealed class UserInput
  {
    public string userId { get; set; }
    public string user { get; set; }
    public string first { get; set; }
    public string last { get; set; }
    public string? avatar { get; set; }
  }
}