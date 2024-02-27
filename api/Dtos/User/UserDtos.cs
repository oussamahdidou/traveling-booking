using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class UserDtos
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";
    }
}