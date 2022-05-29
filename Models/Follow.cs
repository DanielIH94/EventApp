using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Models
{
  public sealed class Follow
  {
    [GraphQLIgnore]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }

    [GraphQLIgnore]
    [ForeignKey(nameof(Follow.follower))]
    public string followerId { get; set; }
    public User follower { get; set; }

    [GraphQLIgnore]
    [ForeignKey(nameof(Follow.following))]
    public string followingId { get; set; }
    public User following { get; set; }
  }

  public sealed class FriendInput
  {
    public string friendOne { get; set; }
    public string friendTwo { get; set; }
  }
}