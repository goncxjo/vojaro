using AutoMapper;
using vojaro.api.Models.Carrera;
using vojaro.domain;
using vojaro.filters;
using vojaro.parameters;
using vojaro.api.Models.Carrera.Orientacion;

namespace vojaro.api.Config.AutoMapper
{
	public class CarreraModelProfile : Profile
    {
        public CarreraModelProfile()
        {
            MapCarreras();
            MapOrientaciones();
        }

		private void MapCarreras()
		{
            this.CreateMap<Carrera, CarreraListModel>();
            this.CreateMap<Carrera, CarreraMiniListModel>();
            this.CreateMap<Carrera, CarreraModel>()
                .ForMember(dest => dest.Universidad, opt => opt.MapFrom(src => src.Universidad))
                .ForMember(dest => dest.Departamento, opt => opt.MapFrom(src => src.Departamento))
            ;

            this.CreateMap<CreateCarreraModel, Carrera>();

            this.CreateMap<CarreraParameters, CarreraFilters>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.UniversidadId, opt => opt.MapFrom(src => src.UniversidadId))
                .ForMember(dest => dest.DepartamentoId, opt => opt.MapFrom(src => src.DepartamentoId));
		}

		private void MapOrientaciones()
		{
            this.CreateMap<CarreraOrientacion, CarreraOrientacionMiniListModel>();
            this.CreateMap<CarreraOrientacion, CarreraOrientacionListModel>();
            this.CreateMap<CarreraOrientacion, CarreraOrientacionModel>();

            this.CreateMap<CreateCarreraOrientacionModel, CarreraOrientacion>();
		}
        

	}
}
