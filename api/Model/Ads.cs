using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Ads
    {
        [Key]
        public int Id { get; set; }
        public string? Image { get; set; }
        public string? Content { get; set; }
        public string? Title { get; set; }
        public int Clicks { get; set; } = 0;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int EntrepriseId { get; set; }
        public Entreprise? Entreprise { get; set; }
    }
}