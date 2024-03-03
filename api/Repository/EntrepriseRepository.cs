using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Entreprise;
using api.Dtos.Search;
using api.Extensions;
using api.helpers;
using api.interfaces;
using api.Model;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Repository
{
    public class EntrepriseRepository : IEntrepriseRepository
    {
        private readonly apiDbContext apiDbContext;
        public EntrepriseRepository(apiDbContext apiDbContext)
        {
            this.apiDbContext = apiDbContext;
        }

        public async Task<Entreprise> CreateEntrepriseAsync(CreateEntreprise createEntreprise)
        {
            var entreprise = new Entreprise()
            {
                Name = createEntreprise.Name,
                Bio = createEntreprise.Bio,
                Adress = createEntreprise.Adress,
                Type = createEntreprise.Type,
                Supported = createEntreprise.Supported,
                Latitude = createEntreprise.Latitude,
                Longitude = createEntreprise.Longitude,
                VilleId = createEntreprise.VilleId,
                AppUserId = createEntreprise.AppUserId
            };
            await apiDbContext.Entreprises.AddAsync(entreprise);
            await apiDbContext.SaveChangesAsync();
            return entreprise;
        }

        public async Task<Entreprise> GetEntrepriseByIdAsync(int id)
        {
            Entreprise? entreprise = await apiDbContext.Entreprises.Include(x => x.Ratings).FirstOrDefaultAsync(x => x.Id == id);
            return entreprise;
        }

        public async Task<List<Entreprise>> GetEntreprisesAsync(QueryObject query)
        {
            var entreprises = apiDbContext.Entreprises.AsQueryable();
            if (!string.IsNullOrWhiteSpace(query.Search))
            {
                entreprises = entreprises.Where(x => x.Name.ToLower().Contains(query.Search.ToLower()) ||
                x.Bio.ToLower().Contains(query.Search.ToLower()) ||
                x.Adress.ToLower().Contains(query.Search.ToLower())
                );
            }


            List<Entreprise> entreprisesresult = await entreprises.Include(c => c.Ratings).ToListAsync();


            return entreprisesresult;
        }

        public async Task<List<Entreprise>> GetEntreprisesBYLocation(double lat, double lng)
        {
            double radiusInDegrees = 50 / 111.12; // Approximate conversion: 1 km = 1/111.12 degrees

            // Calculate bounds
            double minLatitude = lat - radiusInDegrees;
            double maxLatitude = lat + radiusInDegrees;
            double minLongitude = lng - radiusInDegrees;
            double maxLongitude = lng + radiusInDegrees;
            List<Entreprise> entreprises = await apiDbContext.Entreprises.Where(v =>
                      v.Latitude >= minLatitude &&
                      v.Latitude <= maxLatitude &&
                      v.Longitude >= minLongitude &&
                      v.Longitude <= maxLongitude).Include(c => c.Ratings).ToListAsync();
            return entreprises;
        }

        public async Task<List<Entreprise>> GetEntreprisesByVille(int id)
        {
            List<Entreprise> entreprises = await apiDbContext.Entreprises.Where(x => x.VilleId == id).Include(c => c.Ratings).ToListAsync();
            return entreprises;
        }

        public async Task<TopFiveTypeDTo> GetTopFiveBytypeyEntreprises()
        {
            List<Entreprise> hotels = await apiDbContext.Entreprises
                .Include(e => e.Ratings) // Include Ratings navigation property
                .Where(x => x.Type.Equals("Hotel"))
                .OrderByDescending(x => x.Supported)
                .Take(4)
                .ToListAsync();

            List<Entreprise> restaurants = await apiDbContext.Entreprises
                .Include(e => e.Ratings) // Include Ratings navigation property
                .Where(x => x.Type.Equals("Restaurant"))
                .OrderByDescending(x => x.Supported)
                .Take(4)
                .ToListAsync();

            List<Entreprise> activities = await apiDbContext.Entreprises
                .Include(e => e.Ratings) // Include Ratings navigation property
                .Where(x => x.Type.Equals("Activity"))
                .OrderByDescending(x => x.Supported)
                .Take(4)
                .ToListAsync();

            return new TopFiveTypeDTo()
            {
                Hotels = hotels,
                Restaurant = restaurants,
                Activities = activities
            };
        }


        public async Task<List<Entreprise>> GetTopFiveEntreprises(TopFiveQuery topFiveQuery)
        {
            var promoted = apiDbContext.Entreprises.AsQueryable();
            if (topFiveQuery.CityId != 0)
            {
                promoted = promoted.Where(x => x.VilleId == topFiveQuery.CityId);
            }
            if (!topFiveQuery.Query.IsNullOrEmpty())
            {
                promoted = promoted.Where(x => x.Name.ToLower().Contains(topFiveQuery.Query.ToLower()) ||
                x.Bio.ToLower().Contains(topFiveQuery.Query.ToLower()) ||
                x.Adress.ToLower().Contains(topFiveQuery.Query.ToLower())
                );
            }
            if (topFiveQuery.Lng != 0.0 && topFiveQuery.Lat != 0.0)
            {
                double radiusInDegrees = 50 / 111.12; // Approximate conversion: 1 km = 1/111.12 degrees

                // Calculate bounds
                double minLatitude = topFiveQuery.Lat - radiusInDegrees;
                double maxLatitude = topFiveQuery.Lat + radiusInDegrees;
                double minLongitude = topFiveQuery.Lng - radiusInDegrees;
                double maxLongitude = topFiveQuery.Lng + radiusInDegrees;
                promoted = promoted.Where(v =>
                       v.Latitude >= minLatitude &&
                       v.Latitude <= maxLatitude &&
                       v.Longitude >= minLongitude &&
                       v.Longitude <= maxLongitude);

            }
            return await promoted.OrderByDescending(x => x.Supported).Take(5).ToListAsync();
        }

        public async Task<SearchDto> Search(string query)
        {
            List<Entreprise> entreprises = await apiDbContext.Entreprises.ToListAsync();
            entreprises = entreprises.Where(x => x.Adress.HasCommonPart(query) ||
                 x.Name.HasCommonPart(query) ||
                 x.Bio.HasCommonPart(query)).Take(5).ToList();


            List<Ville> villes = await apiDbContext.Villes.ToListAsync();
            villes = villes.Where(x => x.Name.HasCommonPart(query)).Take(5).ToList();
            return new SearchDto()
            {
                Entreprises = entreprises,
                Villes = villes
            };
        }

        public Task<Entreprise> UpdateAsync(UpdateEntrepriseDto updateEntrepriseDto)
        {
            throw new NotImplementedException();
        }
    }
}