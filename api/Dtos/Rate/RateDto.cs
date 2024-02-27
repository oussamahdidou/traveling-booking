using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class RateDto
    {
        public string? AppUserId { get; set; }
        [Range(0, 5)]
        public int Rate { get; set; }
        public int EntrepriseId { get; set; }
    }
}