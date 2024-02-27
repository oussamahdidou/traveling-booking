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
        public string? Images { get; set; }
        public int EntrepriseId { get; set; }
        public Entreprise? Entreprise { get; set; }
    }
}