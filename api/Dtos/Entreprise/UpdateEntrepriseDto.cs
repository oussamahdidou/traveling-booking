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
    }
}