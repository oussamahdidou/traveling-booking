using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.Comment;
using api.Model;

namespace api.interfaces
{
    public interface ISocialRepository
    {
        Task<Comment> AddCommentAsync(CreateCommentDto createCommentDto);
        Task<Rating> AddRatingAsync(RateDto rateDto);
        Task<List<Comment>> GetCommentsByPlace(int placeid);
        Task<Rating> GetUsersRating(string userid, int id);
    }
}