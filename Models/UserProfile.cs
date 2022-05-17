using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EventApp.Database
{
  public sealed class User
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    public string user { get; set; }
    public string first { get; set; }
    public string last { get; set; }
    public string? avatarImage { get; set; }
    public ICollection<Event> events { get; set; }
  }

  public sealed class UserInput
  {
    public string user { get; set; }
    public string first { get; set; }
    public string last { get; set; }
    public string? avatar { get; set; }
  }
}