using AutoMapper;
using vojaro.api.Models.Universidad;
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

            this.CreateMap<CreateUniversidadModel, Universidad>();

            this.CreateMap<UniversidadParameters, UniversidadFilters>()
                .ForMember(dest => dest.ParteNombreSiglas, opt => opt.MapFrom(src => src.ParteNombreSiglas));
        }
    }
}
