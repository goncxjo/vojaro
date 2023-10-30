using System;
using AutoMapper;
using vojaro.api.Models;
using vojaro.api.Models.Asignatura;
using vojaro.domain;
using vojaro.filters;
using vojaro.parameters;

namespace vojaro.api.Config.AutoMapper
{
	public class AsignaturaModelProfile : Profile
    {
        public AsignaturaModelProfile()
        {
            MapAsignaturas();
            MapCorrelativas();
        }

        private void MapAsignaturas()
		{
            this.CreateMap<Asignatura, AsignaturaListModel>()
                .ForMember(dest => dest.Universidad, opt => opt.MapFrom(src => src.Carrera.Universidad))
            ;
            this.CreateMap<Asignatura, AsignaturaModel>()
                .ForMember(dest => dest.Carrera, opt => opt.MapFrom(src => src.Carrera))
                .ForMember(dest => dest.Universidad, opt => opt.MapFrom(src => src.Carrera.Universidad))
            ;

            this.CreateMap<AsignaturaCreateModel, Asignatura>();

            this.CreateMap<AsignaturaParameters, AsignaturaFilters>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
                .ForMember(dest => dest.CarreraId, opt => opt.MapFrom(src => src.CarreraId))
                .ForMember(dest => dest.UniversidadId, opt => opt.MapFrom(src => src.UniversidadId))
            ;
		}

        private void MapCorrelativas()
        {
            this.CreateMap<CorrelativaModel, Correlativa>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.AsignaturaId, opt => opt.MapFrom(src => src.AsignaturaId))
                .ForMember(dest => dest.Condicion, opt => opt.MapFrom(src => (AsignaturaCorrelativaCondicion)src.Condicion.Id))
            ;

            // this.CreateMap<Correlativa, CorrelativaModel>()
            //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //     .ForMember(dest => dest.AsignaturaId, opt => opt.MapFrom(src => src.AsignaturaId))
            //     .ForMember(dest => dest, opt => opt.MapFrom(src => Correlativa.GetCondicionMiniList((long)src.Condicion)))
            // ;
        }
	}
}
