using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Entreprise
    {
        [Key]
        public int Id { get; set; }
        public string? Bio { get; set; }
        public string? Name { get; set; }
        public string? Adress { get; set; }
        public string? Type { get; set; }
        public bool? Supported { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int VilleId { get; set; }
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        public Ville? Ville { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Rating> Ratings { get; set; } = new List<Rating>();
        public List<Ads> Ads { get; set; } = new List<Ads>();


    }
}