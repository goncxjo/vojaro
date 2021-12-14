using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using vojaro.domain;

namespace vojaro.data
{
    public abstract class BaseRepository<TEntity> where TEntity : Entity
    {
        protected abstract DbSet<TEntity> DbSet { get; }
        protected VojaroDbContext Context { get; private set; }

        public BaseRepository(VojaroDbContext context)
        {
            this.Context = context;
        }

        public virtual IQueryable<TEntity> GetAll()
        {
            return this.DbSet;
        }

        public virtual TEntity Add(TEntity model)
        {
            return this.DbSet.Add(model).Entity;
        }

        public void Remove(TEntity entity)
        {
            Context.Entry(entity).State = EntityState.Deleted;
        }

        public PagedData<TEntity> GetPaged(int pageNumber, int pageSize)
        {
            var query = this.GetAll();
            return GetPaged(query, pageNumber, pageSize);
        }

        public virtual TEntity GetById(long id)
        {
            return this.GetAll()
                .SingleOrDefault(x => x.Id == id);
        }

        public PagedData<TEntity> GetPaged(IQueryable<TEntity> query, int pageNumber, int pageSize)
        {
            return new PagedData<TEntity>
            {
                Total = query.Count(),
                Data = GetPage(query, pageNumber, pageSize)
            };
        }

        public IEnumerable<TEntity> GetPage(IQueryable<TEntity> query, int pageNumber, int pageSize)
        {
            var skip = (pageNumber - 1) * pageSize;

            return query.Skip(skip)
                .Take(pageSize);
        }
    }
}
