using EventApp.Models;
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
          id = "a",
          first = "Carlos",
          last = "Ibarra",
          user = "cih2",
          avatarImage = "image.jpg"
        });

        Users.Add(new User()
        {
          id = "b",
          first = "Pepito",
          last = "Trapo",
          user = "trapo777"
        });

        Users.Add(new User()
        {
          id = "c",
          first = "John",
          last = "Johnsson",
          user = "elyoni"
        });

        Friends.Add(new Follow()
        {
          followerId = "a",
          followingId = "b"
        });


        Friends.Add(new Follow()
        {
          followerId = "a",
          followingId = "c"
        });

        Friends.Add(new Follow()
        {
          followerId = "b",
          followingId = "a"
        });

        Friends.Add(new Follow()
        {
          followerId = "c",
          followingId = "a"
        });

        Events.Add(new Event()
        {
          title = "evento de prueba",
          description = "este es un evento de prueba :p",
          userId = "b"
        });

        Events.Add(new Event()
        {
          title = "otro evento de prueba",
          description = "este es otro evento de prueba :v",
          userId = "b"
        });

        Events.Add(new Event()
        {
          title = "de tin marin de don pingue",
          description = "kukaramacaratiterefue",
          userId = "c"
        });

        Events.Add(new Event()
        {
          title = "Hola mundo!",
          description = "Evento hola mundo, le dice hola al mundo.",
          userId = "a"
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
    public DbSet<Follow> Friends { get; set; }
  }
}