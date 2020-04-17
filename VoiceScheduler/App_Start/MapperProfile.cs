using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using VoiceScheduler.Models;
using VoiceScheduler.Dto;

namespace MovieRent.App_Start
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            Mapper.CreateMap<Event, EventDto>();
            
        }
    }
}