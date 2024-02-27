using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class User
    {
        //one-to-many user license

        [Key]
        public int Id { get; set; }
        [MaxLength(200)]
        [Required]
        public string? Name { get; set; }
        public List<License> Licences { get; set; } = new List<License>();

    }
}