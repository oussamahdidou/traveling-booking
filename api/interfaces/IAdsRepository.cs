using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ads;
using api.helpers;
using api.Model;

namespace api.interfaces
{
    public interface IAdsRepository
    {
        Task<Ads> CreateAd(CreateAdDto createAdDto);
        Task<List<Ads>> GetAllAds(int page);

    }
}