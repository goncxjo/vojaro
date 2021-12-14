using AutoMapper;
using Newtonsoft.Json;
using vojaro.domain;
using vojaro.parameters;

namespace vojaro.api.Config.Automapper
{
	public class CommonModelProfile : Profile
	{
		public CommonModelProfile()
		{
			this.CreateMap(typeof(PagedData<>), typeof(PagedData<>));
			this.CreateMap<QueryStringParameters, PageSort[]>()
				.ConstructUsing(src => ParseJsonSort(src.Sort));
		}

		private PageSort[] ParseJsonSort(string sort)
		{
			if (!string.IsNullOrEmpty(sort))
			{
				return JsonConvert.DeserializeObject<PageSort[]>(sort);
			}
			return null;
		}
	}
}
