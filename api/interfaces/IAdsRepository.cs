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
        Task<List<Ads>> GetAllAds(AdsQuery query);
        Task<List<Ads>> GetAdsByPlace(int cityid);
        Task<List<Ads>> GetTodaysPosts();
        Task<List<Ads>> GetTopPosts();
        Task<List<Ads>> GetSponsoredPosts();

    }
}