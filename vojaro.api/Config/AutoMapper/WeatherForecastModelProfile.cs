using AutoMapper;
using vojaro.api.Models.WeatherForescast;
using vojaro.domain;
using vojaro.filters;
using vojaro.parameters;

namespace vojaro.api.Config.AutoMapper
{
    public class WeatherForecastModelProfile : Profile
    {
        public WeatherForecastModelProfile()
        {
            this.CreateMap<WeatherForecast, WeatherForecastListModel>();
            this.CreateMap<WeatherForecast, WeatherForecastModel>();

            this.CreateMap<WeatherForecastParameters, WeatherForecastFilters>()
                .ForMember(dest => dest.TemperatureC_From, opt => opt.MapFrom(src => src.TemperatureC_From))
                .ForMember(dest => dest.TemperatureC_To, opt => opt.MapFrom(src => src.TemperatureC_To));
        }
    }
}
