using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class License
    {
        //one-to-many user license
        [Key]
        public int id { get; set; }
        public int UserId { get; set; }
        public string Key { get; set; } = string.Empty;
        public User? User { get; set; }

    }
}