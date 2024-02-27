using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
namespace api.Dtos.Search
{
    public class SearchDto
    {
        public List<Model.Entreprise> Entreprises { get; set; } = new List<Model.Entreprise>();
        public List<Ville> Villes { get; set; } = new List<Ville>();
    }
}