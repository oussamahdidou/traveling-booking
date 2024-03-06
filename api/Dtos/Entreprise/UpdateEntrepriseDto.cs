using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Entreprise
{
    public class UpdateEntrepriseDto
    {
        public string? Bio { get; set; }
        public string? Name { get; set; }
        public string? Adress { get; set; }
        public string? Type { get; set; }
        public IFormFile? Image { get; set; }

        public bool? Supported { get; set; }
        public double Latitude { get; set; } = 0.0;
        public double Longitude { get; set; } = 0.0;
    }
}