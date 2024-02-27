using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentDto
    {
        public string? Content { get; set; }
        public int EntrepriseId { get; set; }
        public string? AppUserId { get; set; }
    }
}