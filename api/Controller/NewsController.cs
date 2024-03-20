using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ads;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using api.Extensions;
using api.Data;
namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly IAdsRepository adsRepository;
        private readonly IEntrepriseRepository entrepriseRepository;
        private readonly UserManager<AppUser> userManager;
        public NewsController(IEntrepriseRepository entrepriseRepository, UserManager<AppUser> userManager, IAdsRepository adsRepository)
        {
            this.adsRepository = adsRepository;
            this.entrepriseRepository = entrepriseRepository;
            this.userManager = userManager;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetAdsByPlaceAsync([FromRoute] int id)
        {
            List<Ads> ads = await adsRepository.GetAdsByPlace(id);
            return Ok(ads);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAsync([FromForm] CreateAdDto createAdDto)
        {
            string username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);
            createAdDto.EntrepriseId = await entrepriseRepository.GetAdminEntreprise(user.Id);
            Ads? ads = await adsRepository.CreateAd(createAdDto);
            if (ads == null) return BadRequest();
            return Ok(ads);
        }
        [HttpGet]
        public async Task<IActionResult> GetTodaysPosts()
        {
            List<Ads> ads = await adsRepository.GetTodaysPosts();
            return Ok(ads);
        }
        [HttpGet]
        public async Task<IActionResult> GetTopsPosts()
        {
            List<Ads> ads = await adsRepository.GetTopPosts();
            return Ok(ads);
        }
        [HttpGet]
        public async Task<IActionResult> GetSponsoredPosts()
        {
            List<Ads> ads = await adsRepository.GetSponsoredPosts();
            return Ok(ads);
        }
    }
}
