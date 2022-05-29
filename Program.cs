using Microsoft.AspNetCore.Authentication.JwtBearer;
using EventApp.Services;
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
  .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddMicrosoftIdentityWebApi(builder.Configuration);
builder.Services.AddAuthorization();
builder.Services
  .AddCors()
  .AddDbContext<EventApp.Database.Context>()
  .AddRepository()
  .AddGraphQLServer()
  .AddAuthorization()
  .AddProjections()
  .AddQueryType<EventApp.GraphQL.Query>()
  .AddMutationType<EventApp.GraphQL.Mutation>()
  .AddSubscriptionType<EventApp.GraphQL.Subscription>()
  // .AddErrorFilter<EventApp.GraphQL.GraphQLErrorFilter>()
  .AddInMemorySubscriptions();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseWebSockets();
app.UseCors(config => config
  .AllowAnyOrigin()
  .AllowAnyMethod()
  .AllowAnyHeader()
);

app.UseAuthentication();
app.UseAuthorization();
app.MapGraphQL();
app.MapFallbackToFile("index.html");

app.Run();