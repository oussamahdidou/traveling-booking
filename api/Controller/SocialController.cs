using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Comment;
using api.Extensions;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Route("api/[controller]")]

    public class SocialController : ControllerBase
    {
        private readonly ISocialRepository socialRepository;
        private readonly UserManager<AppUser> userManager;
        public SocialController(UserManager<AppUser> userManager, ISocialRepository socialRepository)
        {
            this.socialRepository = socialRepository;
            this.userManager = userManager;
        }
        [Authorize]
        [HttpPost("Comment")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto createCommentDto)
        {
            string username = User.GetUsername();
            AppUser? user = await userManager.FindByNameAsync(username);
            createCommentDto.AppUserId = user.Id;
            var model = await socialRepository.AddCommentAsync(createCommentDto);
            return Ok(model);
        }
        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateComment([FromRoute] int id, [FromBody] string CommentContent)
        {
            return Ok();
        }
        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteComment([FromRoute] int id)
        {
            return Ok();

        }
        [Authorize]
        [HttpGet("rate/{id:int}")]
        public async Task<IActionResult> GetUserRate([FromRoute] int id)
        {
            string username = User.GetUsername();
            AppUser? user = await userManager.FindByNameAsync(username);
            Rating? rating = await socialRepository.GetUsersRating(user.Id, id);
            if (rating != null)
            {
                return Ok(rating);
            }
            return NotFound("No such rate ");
        }
        [Authorize]
        [HttpPost("Rate")]
        public async Task<IActionResult> MakeRating([FromBody] RateDto rateDto)
        {
            string username = User.GetUsername();
            AppUser? user = await userManager.FindByNameAsync(username);
            rateDto.AppUserId = user.Id;
            var model = await socialRepository.AddRatingAsync(rateDto);
            return Ok(model);

        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCommentbyplace([FromRoute] int id)
        {
            List<Comment> comments = await socialRepository.GetCommentsByPlace(id);
            return Ok(comments);
        }
    }
}