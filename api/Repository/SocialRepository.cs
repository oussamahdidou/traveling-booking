using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos;
using api.Dtos.Comment;
using api.interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SocialRepository : ISocialRepository
    {
        private readonly apiDbContext apiDbContext;
        public SocialRepository(apiDbContext apiDbContext)
        {
            this.apiDbContext = apiDbContext;

        }
        public async Task<Comment> AddCommentAsync(CreateCommentDto createCommentDto)
        {
            var Model = new Comment()
            {
                AppUserId = createCommentDto.AppUserId,
                Content = createCommentDto.Content,
                EntrepriseId = createCommentDto.EntrepriseId
            };
            await apiDbContext.Comments.AddAsync(Model);
            await apiDbContext.SaveChangesAsync();
            return Model;
        }

        public async Task<Rating> AddRatingAsync(RateDto rateDto)
        {
            Rating? model = await apiDbContext.Ratings.FirstOrDefaultAsync(x => x.EntrepriseId == rateDto.EntrepriseId && x.AppUserId == rateDto.AppUserId);
            if (model != null)
            {
                apiDbContext.Ratings.Remove(model);
            }

            model = new Rating()
            {
                AppUserId = rateDto.AppUserId,
                EntrepriseId = rateDto.EntrepriseId,
                Rate = rateDto.Rate
            };
            await apiDbContext.Ratings.AddAsync(model);


            await apiDbContext.SaveChangesAsync();
            return model;
        }

        public async Task<List<Comment>> GetCommentsByPlace(int placeid)
        {
            List<Comment> comments = await apiDbContext.Comments.Include(x => x.AppUser).Where(x => x.EntrepriseId == placeid).ToListAsync();
            return comments;
        }

        public async Task<Rating> GetUsersRating(string userid, int id)
        {
            Rating? rating = await apiDbContext.Ratings.FirstOrDefaultAsync(x => x.AppUserId == userid && x.EntrepriseId == id);
            return rating;
        }
    }
}