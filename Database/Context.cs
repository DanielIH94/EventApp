using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace EventApp.Database
{
  public class Context : DbContext
  {
    public Context() { }

    public Context(DbContextOptions<Context> options)
      : base(options)
    {
      if (Database.EnsureCreated())
      {
        Users.Add(new User
        {
          first = "Carlos",
          last = "Ibarra",
          user = "cih2",
          avatarImage = "image.jpg"
        });

        SaveChanges();
      }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
      var connectionString = "DataSource=eventappdb;mode=memory;cache=shared";
      var connection = new SqliteConnection(connectionString);

      connection.Open();
      options.UseSqlite(connection);
    }

    public DbSet<Event> Events { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Invitation> Invitations { get; set; }
  }
}