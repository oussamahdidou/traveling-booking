using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;

namespace api.interfaces
{
    public interface ICountriesCities
    {
        Task<Country> GetCountry(int id);
        Task<Country> CreateCountry(string Name);
        Task<Ville> CreateCityAsync(int id, string Name);
        Task<List<Country>> GetAllCountries();
    }
}