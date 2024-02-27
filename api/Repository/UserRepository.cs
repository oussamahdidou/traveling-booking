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
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly apiDbContext apiDbContext;
        public UserRepository(apiDbContext apiDbContext)
        {
            this.apiDbContext = apiDbContext;

        }

        public async Task<User> Create(UserCreateDto userCreateDto)
        {
            var usermodel = userCreateDto.ToUserFromCreateDto();
            await apiDbContext.users.AddAsync(usermodel);
            await apiDbContext.SaveChangesAsync();
            return usermodel;
        }

        public async Task<User> DeleteAsync(int id)
        {
            var model = await apiDbContext.users.FirstOrDefaultAsync(x => x.Id == id);
            if (model is null)
            {
                return model;
            }
            apiDbContext.users.Remove(model);
            await apiDbContext.SaveChangesAsync();
            return model;
        }

        public async Task<List<User>> GetAllAsync(QueryObject query)
        {

            var users = apiDbContext.users.AsQueryable();

            return await users.Skip(10 * (query.PageNumber - 1)).Take(10).ToListAsync();
        }

        public async Task<User> GetUserById(int id)
        {
            User? user = await apiDbContext.users.Include(x => x.Licences).FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        public async Task<User> UpdateAsync(int id, UserUpdateDto userUpdateDto)
        {
            User? model = await apiDbContext.users.FirstOrDefaultAsync(x => x.Id == id);
            if (model == null)
            {
                return model;

            }
            model.Name = userUpdateDto.Name;
            await apiDbContext.SaveChangesAsync();
            return model;

        }

        public async Task<bool> UserExists(int id)
        {
            return await apiDbContext.users.AnyAsync(e => e.Id == id);
        }
    }
}