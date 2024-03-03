using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Entreprise;
using api.Dtos.Search;
using api.helpers;
using api.Model;

namespace api.interfaces
{
    public interface IEntrepriseRepository
    {
        Task<List<Entreprise>> GetEntreprisesAsync(QueryObject query);
        Task<Entreprise> GetEntrepriseByIdAsync(int id);
        Task<Entreprise> UpdateAsync(UpdateEntrepriseDto updateEntrepriseDto);
        Task<SearchDto> Search(string SearchQuery);
        Task<Entreprise> CreateEntrepriseAsync(CreateEntreprise createEntreprise);
        Task<List<Entreprise>> GetEntreprisesByVille(int id);
        Task<List<Entreprise>> GetTopFiveEntreprises(TopFiveQuery topFiveQuery);
    }
}