using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Ads;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : ControllerBase
    {
        private readonly IAdsRepository adsRepository;
        public AdsController(IAdsRepository adsRepository)
        {
            this.adsRepository = adsRepository;
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateAsync([FromForm] CreateAdDto createAdDto)
        {
            Ads? ads = await adsRepository.CreateAd(createAdDto);
            if (ads == null) return BadRequest();
            return Ok(ads);
        }
    }
}