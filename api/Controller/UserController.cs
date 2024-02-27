using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Dtos.User;
using api.helpers;
using api.interfaces;
using api.Mappers;
using api.Model;
using api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;
        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetUserAsync([FromQuery] QueryObject query)
        {
            List<User> users = await userRepository.GetAllAsync(query);
            return Ok(users);
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            User? user = await userRepository.GetUserById(id);
            if (user == null)
                return Ok("nothing found");
            return Ok(user);

        }
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserCreateDto userCreateDto)
        {
            var usermodel = await userRepository.Create(userCreateDto);
            return CreatedAtAction(nameof(GetUserById), new { id = usermodel.Id }, usermodel.ToUserDto());
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UserUpdateDto userUpdateDto)
        {
            var model = await userRepository.UpdateAsync(id, userUpdateDto);
            if (model == null)
            {
                return NotFound("No such user exists in the database.");
            }
            return Ok(model);
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var model = await userRepository.DeleteAsync(id);
            if (model is null)
            {
                return NotFound("This user does not exist.");
            }
            return Ok("The user has been deleted from the database.");
        }


    }
}