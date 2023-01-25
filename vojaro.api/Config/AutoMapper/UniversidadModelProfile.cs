using System;
using AutoMapper;
using vojaro.api.Models.Departamento;
using vojaro.api.Models.Sede;
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
            MapUniversidades();
            MapDepartamentos();
            MapSedes();
        }

		private void MapUniversidades()
		{
            this.CreateMap<Universidad, UniversidadMiniListModel>();
            this.CreateMap<Universidad, UniversidadListModel>();
            this.CreateMap<Universidad, UniversidadModel>();

            this.CreateMap<CreateUniversidadModel, Universidad>();

            this.CreateMap<UniversidadParameters, UniversidadFilters>()
                .ForMember(dest => dest.ParteNombreSiglas, opt => opt.MapFrom(src => src.ParteNombreSiglas))
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id ?? src.UniversidadId));
		}
        
		private void MapDepartamentos()
		{
            this.CreateMap<Departamento, DepartamentoMiniListModel>();
            this.CreateMap<Departamento, DepartamentoListModel>();
            this.CreateMap<Departamento, DepartamentoModel>();

            this.CreateMap<CreateDepartamentoModel, Departamento>();
		}
        
		private void MapSedes()
		{
            this.CreateMap<Sede, SedeListModel>();
            this.CreateMap<Sede, SedeModel>();

            this.CreateMap<CreateSedeModel, Sede>();
		}
	}
}
