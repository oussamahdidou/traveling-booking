using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class FilesExtensions
    {
        private static readonly IWebHostEnvironment? IWebHostEnvironment;

        public static async Task<(string, string)> uploadfile(this IFormFile file, string path)
        {
            if (file == null || file.Length == 0)
                return (null, null);

            try
            {
                // Ensure wwwroot folder exists
                string uploadsFolder = Path.Combine(IWebHostEnvironment.WebRootPath, path);
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                // Generate a unique filename
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;

                // Save the file to wwwroot/uploads folder
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return (filePath, uniqueFileName);

            }
            catch (Exception)
            {
                return (null, null);
            }
        }
    }
}