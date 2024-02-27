using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Ville
    {

        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int CountryId { get; set; }
        public Country? Country { get; set; }
        public List<Entreprise>? Entreprises { get; set; } = new List<Entreprise>();


    }
}