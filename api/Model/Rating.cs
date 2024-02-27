using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }
        public int Rate { get; set; }
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        public int? EntrepriseId { get; set; }
        public Entreprise? Entreprise { get; set; }
    }
}