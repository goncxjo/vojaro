using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using vojaro.domain;

namespace vojaro.data
{
    public abstract class FilterableRepository<TEntity, TFilter> : BaseRepository<TEntity> where TEntity : Entity where TFilter : class
	{


		protected virtual PageSort[] defaultSort => new PageSort[0];

		protected virtual IDictionary<string, string> sortPropertyMappings => new Dictionary<string, string>();

		public FilterableRepository(VojaroDbContext context)
			: base(context)
		{
		}

		public abstract IQueryable<TEntity> FilterQuery(IQueryable<TEntity> query, TFilter filter);

		public PagedData<TEntity> GetPaged(int pageNumber, int pageSize, PageSort[] sort, TFilter filter)
		{
			var query = this.Find(filter);
			var sorted = this.SortQuery(query, sort, this.GetSortPropertyMappings());
			return GetPaged(sorted, pageNumber, pageSize);
		}

		public IQueryable<TEntity> Find(TFilter filter)
		{
			return FilterQuery(GetAll(), filter);
		}

		protected virtual IDictionary<string, string> GetSortPropertyMappings()
		{
			return this.sortPropertyMappings;
		}

		public virtual IQueryable<TEntity> SortQuery(IQueryable<TEntity> query, PageSort[] sort, IDictionary<string, string> sortingOptions)
		{
			var availableSortings = this.GetAvailableSortings(sort, sortingOptions);
			if ((availableSortings?.Length ?? 0) == 0 && (this.defaultSort?.Length ?? 0) > 0)
			{
				availableSortings = this.GetAvailableSortings(this.defaultSort, sortingOptions);
			}

			if ((availableSortings?.Length ?? 0) > 0)
			{
				var rawSorting = String.Join(", ", availableSortings);
				return query.OrderBy(rawSorting);
			}

			return query.OrderBy(e => e.Id);
		}

		protected string[] GetAvailableSortings(PageSort[] sort, IDictionary<string, string> sortingOptions)
		{
			if (sort != null && sort.Length > 0 && sortingOptions.Count > 0)
			{
				return sort.Where(s => sortingOptions.Keys.Any(x => x == s.Name)).Select(s => sortingOptions[s.Name] + " " + s.Direction).ToArray();
			}
			return new string[0];
		}
	}
}
