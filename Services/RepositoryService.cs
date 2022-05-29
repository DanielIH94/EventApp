using EventApp.Repository;

namespace EventApp.Services
{
  public static class RepositoryService
  {
    public static IServiceCollection AddRepository(this IServiceCollection services)
    {
      services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
      
      return services;
    }
  }
}