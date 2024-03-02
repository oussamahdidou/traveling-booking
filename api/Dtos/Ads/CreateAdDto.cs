using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Ads
{
    public class CreateAdDto
    {
        public string? Content { get; set; }
        public string? Title { get; set; }
        public int EntrepriseId { get; set; }
        public IFormFile? Image { get; set; }
    }
}