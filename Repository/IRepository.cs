using System.Linq.Expressions;

namespace EventApp.Repository
{
  public interface IRepository<T>
  {
    IQueryable<T> FindAll();
    IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression);
    void Create(T entity);
    void Update(T entity);
    void Delete(T entity);
  }
}