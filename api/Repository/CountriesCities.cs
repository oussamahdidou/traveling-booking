using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Model;
using Microsoft.EntityFrameworkCore;

namespace api.interfaces
{
    public class CountriesCities : ICountriesCities
    {
        private readonly apiDbContext apiDbContext;
        public CountriesCities(apiDbContext apiDbContext)
        {
            this.apiDbContext = apiDbContext;
        }
        public async Task<Ville> CreateCityAsync(int id, string Name)
        {
            Ville Ville = new Ville()
            {
                Name = Name,
                CountryId = id
            };
            await apiDbContext.Villes.AddAsync(Ville);
            await apiDbContext.SaveChangesAsync();
            return Ville;
        }

        public async Task<Country> CreateCountry(string Name)
        {
            Country country = new Country()
            {
                Name = Name
            };
            await apiDbContext.Countries.AddAsync(country);
            await apiDbContext.SaveChangesAsync();
            return country;
        }

        public async Task<List<Country>> GetAllCountries()
        {
            List<Country> countries = await apiDbContext.Countries.ToListAsync();
            return countries;
        }

        public async Task<Country> GetCountry(int id)
        {
            Country? country = await apiDbContext.Countries.Include(x => x.Villes).FirstOrDefaultAsync(x => x.Id == id);
            return country;
        }
    }
}