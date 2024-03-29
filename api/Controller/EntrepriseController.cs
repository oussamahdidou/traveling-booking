using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Entreprise;
using api.Dtos.Search;
using api.Extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntrepriseController : ControllerBase
    {
        private readonly IEntrepriseRepository entrepriseRepository;
        private readonly UserManager<AppUser> userManager;
        public EntrepriseController(IEntrepriseRepository entrepriseRepository, UserManager<AppUser> userManager)
        {
            this.entrepriseRepository = entrepriseRepository;
            this.userManager = userManager;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync([FromQuery] QueryObject query)
        {
            var entreprises = await entrepriseRepository.GetEntreprisesAsync(query);
            return Ok(entreprises);
        }
        [HttpGet("Top")]
        public async Task<IActionResult> GetTopFive([FromQuery] TopFiveQuery topFiveQuery)
        {
            List<Entreprise> entreprises = await entrepriseRepository.GetTopFiveEntreprises(topFiveQuery);
            return Ok(entreprises);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetEntrepriseById([FromRoute] int id)
        {
            Entreprise? entreprise = await entrepriseRepository.GetEntrepriseByIdAsync(id);
            if (entreprise == null)
                return NotFound("notfound");
            return Ok(entreprise);

        }
        [HttpGet("Search/{query}")]

        public async Task<IActionResult> Search([FromRoute] string query)
        {
            SearchDto searchDto = await entrepriseRepository.Search(query);
            return Ok(searchDto);
        }
        [HttpGet("{lat:double}/{lng:double}")]
        public async Task<IActionResult> GetEntreprisesByLoaction([FromRoute] double lat, [FromRoute] double lng)
        {
            List<Entreprise> entreprises = await entrepriseRepository.GetEntreprisesBYLocation(lat, lng);
            return Ok(entreprises);
        }
        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromForm] UpdateEntrepriseDto updateEntrepriseDto)
        {
            Entreprise? entreprise = await entrepriseRepository.UpdateAsync(updateEntrepriseDto, id);
            if (entreprise != null)
            {
                return Ok(entreprise);
            }
            return NotFound("something went wrong ...");
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateEntreprise([FromForm] CreateEntreprise createEntreprise)
        {
            string username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);
            createEntreprise.AppUserId = user.Id;
            Entreprise entreprise = await entrepriseRepository.CreateEntrepriseAsync(createEntreprise);
            if (entreprise == null)
                return NotFound("something went wrong ...");
            return Ok(entreprise);

        }
        [HttpGet("Ville/{id:int}")]
        public async Task<IActionResult> GetEntreprisesByVille([FromRoute] int id)
        {
            List<Entreprise> entreprises = await entrepriseRepository.GetEntreprisesByVille(id);
            return Ok(entreprises);
        }
        [HttpGet("top/type")]
        public async Task<IActionResult> GetTopFiveBytype()
        {
            TopFiveTypeDTo topFiveTypeDTo = await entrepriseRepository.GetTopFiveBytypeyEntreprises();
            return Ok(topFiveTypeDTo);
        }
        [HttpGet("Admin/place")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAdminPlace()
        {
            string username = User.GetUsername();
            var user = await userManager.FindByNameAsync(username);


            int id = await entrepriseRepository.GetAdminEntreprise(user.Id);
            return Ok(id);
        }

    }
}