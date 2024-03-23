using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Ads;
using api.helpers;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;

namespace api.Repository
{
    public class AdsRepository : IAdsRepository
    {
        private readonly apiDbContext apiDbContext;
        private readonly IWebHostEnvironment IWebHostEnvironment;
        public AdsRepository(apiDbContext apiDbContext, IWebHostEnvironment IWebHostEnvironment)
        {

            this.apiDbContext = apiDbContext;
            this.IWebHostEnvironment = IWebHostEnvironment;
        }

        public async Task<Ads> CreateAd(CreateAdDto createAdDto)
        {
            var file = createAdDto.Image;
            if (file == null || file.Length == 0)
                return null;

            try
            {
                // Ensure wwwroot folder exists
                string uploadsFolder = Path.Combine(IWebHostEnvironment.WebRootPath, "uploads/ads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                // Generate a unique filename
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

                // Save the file to wwwroot/uploads folder
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                Ads ads = new Ads()
                {
                    Content = createAdDto.Content,
                    EntrepriseId = createAdDto.EntrepriseId,
                    Image = "http://localhost:5163/uploads/ads/" + uniqueFileName,
                    Title = createAdDto.Title,


                };
                await apiDbContext.Ads.AddAsync(ads);
                await apiDbContext.SaveChangesAsync();
                return ads;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public async Task<List<Ads>> GetAdsByPlace(int cityid)
        {
            List<Ads> ads = await apiDbContext.Ads.Where(x => x.EntrepriseId == cityid).ToListAsync();
            return ads;
        }

        public Task<List<Ads>> GetAllAds(AdsQuery adsQuery)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Ads>> GetSponsoredPosts()
        {
            List<Ads> ads = await apiDbContext.Ads
                 .Include(x => x.Entreprise)
                 .Where(x => x.Entreprise.Supported == true)
                 .OrderByDescending(ad => ad.Clicks)
                 .Take(4)
                 .ToListAsync();
            return ads;
        }

        public async Task<List<Ads>> GetTodaysPosts()
        {
            List<Ads> ads = await apiDbContext.Ads
                            .Where(x => x.CreatedAt.Date == DateTime.Today)
                            .OrderByDescending(ad => ad.Clicks)
                            .Include(x => x.Entreprise)
                            .Take(4)
                            .ToListAsync();
            return ads;
        }

        public async Task<List<Ads>> GetTopPosts()
        {
            List<Ads> ads = await apiDbContext.Ads
                .OrderByDescending(ad => ad.Clicks)
                .Include(x => x.Entreprise)
                .Take(4)
                .ToListAsync();
            return ads;
        }
    }
}