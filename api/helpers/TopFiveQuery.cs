using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.helpers
{
    public class TopFiveQuery
    {
        public string? Query { get; set; }
        public int CityId { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
    }
}