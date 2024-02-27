using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class LicenseDoctor
    {
        public int IdDoctor { get; set; }
        public int IdLicense { get; set; }
        public License? license { get; set; }
        public Doctor? doctor { get; set; }
        public DateTime dateTime { get; set; } = DateTime.Now;

    }
}