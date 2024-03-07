using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class VilleController : ControllerBase
    {
        private readonly ICountriesCities countriesCities;
        public VilleController(ICountriesCities countriesCities)
        {
            this.countriesCities = countriesCities;
        }
        [HttpPost("{id}")]
        public async Task<IActionResult> CreateVille([FromRoute] int id, [FromBody] string Name)
        {
            Ville ville = await countriesCities.CreateCityAsync(id, Name);
            return Ok(ville);
        }
        [HttpPost("/Country")]

        public async Task<IActionResult> CreateCountry([FromBody] string Name)
        {
            Country country = await countriesCities.CreateCountry(Name);
            return Ok(country);
        }
        [HttpGet("{id:int}")]
        //    [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCountries([FromRoute] int id)
        {
            Country country = await countriesCities.GetCountry(id);
            return Ok(country.Villes);
        }
        [HttpGet]
        public async Task<IActionResult> getAllCountries()
        {
            var countries = await countriesCities.GetAllCountries();
            return Ok(countries);
        }
        [HttpGet("helloworld")]
        public async Task<IActionResult> Helloworld()
        {
            return Ok("hello world");
        }

    }
}