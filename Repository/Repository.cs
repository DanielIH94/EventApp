using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EventApp.Database;

namespace EventApp.Repository
{
  public abstract class Repository<T> : IRepository<T> where T : class
  {
    protected Context DatabaseContext { get; set; }
    public Repository(Context context)
    {
      DatabaseContext = context;
    }

    public IQueryable<T> FindAll() => DatabaseContext.Set<T>().AsNoTracking();
    public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression) =>
      DatabaseContext.Set<T>().Where(expression).AsNoTracking();
    public void Create(T entity) => DatabaseContext.Set<T>().Add(entity);
    public void Update(T entity) => DatabaseContext.Set<T>().Update(entity);
    public void Delete(T entity) => DatabaseContext.Set<T>().Remove(entity);
  }
}