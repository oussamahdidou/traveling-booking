using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Entreprise
{
    public class CreateEntreprise
    {
        public string? Bio { get; set; }
        public string? Name { get; set; }
        public string? Adress { get; set; }
        public string? Type { get; set; }
        public bool? Supported { get; set; } = false;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int VilleId { get; set; }
        public string? AppUserId { get; set; }
        public IFormFile? Image { get; set; }
    }
}