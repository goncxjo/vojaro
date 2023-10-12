using AutoMapper;
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
        }

		private void MapAsignaturas()
		{
            this.CreateMap<Asignatura, AsignaturaListModel>();
            this.CreateMap<Asignatura, AsignaturaModel>()
            ;

            this.CreateMap<AsignaturaCreateModel, Asignatura>();

            // this.CreateMap<AsignaturaParameters, AsignaturaFilters>()
            //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            //     .ForMember(dest => dest.Nombre, opt => opt.MapFrom(src => src.Nombre))
            //     .ForMember(dest => dest.UniversidadId, opt => opt.MapFrom(src => src.UniversidadId))
            //     .ForMember(dest => dest.DepartamentoId, opt => opt.MapFrom(src => src.DepartamentoId));
		}
	}
}
