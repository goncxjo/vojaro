using AutoMapper;
using vojaro.api.Models.WeatherForescast;
using vojaro.domain;
using vojaro.filters;
using vojaro.parameters;

namespace vojaro.api.Config.AutoMapper
{
    public class UniversidadModelProfile : Profile
    {
        public UniversidadModelProfile()
        {
            this.CreateMap<Universidad, UniversidadListModel>();
            this.CreateMap<Universidad, UniversidadModel>();

            this.CreateMap<UniversidadParameters, UniversidadFilters>()
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre));
        }
    }
}
