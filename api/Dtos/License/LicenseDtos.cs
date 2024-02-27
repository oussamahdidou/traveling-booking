using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.License
{
    public class LicenseDtos
    {
        public int Id { get; set; }
        public int idUser { get; set; }
        public string Key { get; set; } = "";
    }
}