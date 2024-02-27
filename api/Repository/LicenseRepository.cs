using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.License;
using api.interfaces;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class LicenseRepository : ILicenseRepository
    {
        private readonly apiDbContext apiDbContext;
        public LicenseRepository(apiDbContext apiDbContext)
        {
            this.apiDbContext = apiDbContext;


        }

        public async Task<License> CreateLicenseAsync(int id, CreateLicenseDto createLicenseDto)
        {

            var model = new License()
            {
                UserId = id,
                Key = createLicenseDto.Key
            };
            await apiDbContext.AddAsync(model);
            await apiDbContext.SaveChangesAsync();
            return model;

        }


        public async Task<License> GetLicenseAsync(int id)
        {
            License? license = await apiDbContext.licenses.FindAsync(id);
            return license;
        }

        public async Task<List<License>> GetLicensesAsync()
        {
            return await apiDbContext.licenses.Include(x => x.User).ToListAsync();
        }

        public async Task<List<License>> GetLicensesByUserAsync(int id)
        {
            return await apiDbContext.licenses.Where(x => x.UserId == id).ToListAsync();
        }
    }
}