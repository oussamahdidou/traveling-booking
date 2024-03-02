using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string? Content { get; set; } = "";
        public DateTime date { get; set; } = DateTime.Now;
        public string? AppUserId { get; set; }
        public AppUser? AppUser { get; set; }
        public int? EntrepriseId { get; set; }
        public Entreprise? Entreprise { get; set; }

    }
}