using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.License;
using api.interfaces;
using api.Mappers;
using api.Model;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class LicenseController : ControllerBase
    {
        private readonly ILicenseRepository licenseRepository;
        private readonly IUserRepository userRepository;
        public LicenseController(ILicenseRepository licenseRepository, IUserRepository userRepository)
        {
            this.licenseRepository = licenseRepository;
            this.userRepository = userRepository;

        }
        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            List<License> licenses = await licenseRepository.GetLicensesAsync();
            var licensesdto = licenses.Select(x => x.ToLicenseDto());
            return Ok(licenses);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetlicensebyId([FromRoute] int id)
        {
            License? license = await licenseRepository.GetLicenseAsync(id);
            if (license is null)
            {
                return Ok("not found");
            }
            return Ok(license.ToLicenseDto());
        }
        [HttpPost("{id:int}")]
        public async Task<IActionResult> CreateLicenseAsync([FromRoute] int id, [FromBody] CreateLicenseDto createLicenseDto)
        {
            if (!await userRepository.UserExists(id))
            {


                return NotFound("no such user with this id");
            }
            License Model = await licenseRepository.CreateLicenseAsync(id, createLicenseDto);
            return CreatedAtAction(nameof(GetlicensebyId), new { id = Model.UserId }, Model.ToLicenseDto());
        }
        [HttpGet("users/{id:int}")]
        public async Task<IActionResult> GetLicensesbyUsersAsync([FromRoute] int id)
        {
            List<License> licenses = await licenseRepository.GetLicensesByUserAsync(id);
            return Ok(licenses);
        }

    }
}