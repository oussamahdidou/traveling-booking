using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Dtos.User;
using api.Model;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static UserDtos ToUserDto(this User userModel)
        {
            return new UserDtos()
            {
                Id = userModel.Id,
                Name = userModel.Name,
            };
        }
        public static User ToUserFromCreateDto(this UserCreateDto userCreateDto)
        {
            return new User()
            {
                Name = userCreateDto.Name,
            };
        }
    }
}