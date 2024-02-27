using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.License;
using api.Model;

namespace api.interfaces
{
    public interface ILicenseRepository
    {
        Task<List<License>> GetLicensesAsync();
        Task<List<License>> GetLicensesByUserAsync(int id);
        Task<License> GetLicenseAsync(int id);
        Task<License> CreateLicenseAsync(int id, CreateLicenseDto createLicenseDto);

    }
}