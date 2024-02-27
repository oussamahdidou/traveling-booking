using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.User;
using api.helpers;
using api.Model;

namespace api.interfaces
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllAsync(QueryObject query);
        Task<User> GetUserById(int id);
        Task<User> Create(UserCreateDto userDtos);
        Task<User> UpdateAsync(int id, UserUpdateDto userUpdateDto);
        Task<User> DeleteAsync(int id);
        Task<bool> UserExists(int id);
    }
}