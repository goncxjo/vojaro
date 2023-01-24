using System;
using AutoMapper;
using vojaro.api.Models.Departamento;
using vojaro.api.Models.Sede;
using vojaro.api.Models.Carrera;
using vojaro.domain;
using vojaro.filters;
using vojaro.parameters;

namespace vojaro.api.Config.AutoMapper
{
	public class CarreraModelProfile : Profile
    {
        public CarreraModelProfile()
        {
            MapCarreras();
        }

		private void MapCarreras()
		{
            this.CreateMap<Carrera, CarreraListModel>();
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
	}
}
