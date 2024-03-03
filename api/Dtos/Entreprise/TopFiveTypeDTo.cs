using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;

namespace api.Dtos.Entreprise
{
    public class TopFiveTypeDTo
    {
        public List<Model.Entreprise> Hotels { get; set; }
        public List<Model.Entreprise> Restaurant { get; set; }
        public List<Model.Entreprise> Activities { get; set; }

    }
}