using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.License;
using api.Model;

namespace api.Mappers
{
    public static class LicenseMappers
    {
        public static LicenseDtos ToLicenseDto(this License licenseModel)
        {
            return new LicenseDtos()
            {
                Id = licenseModel.id,
                idUser = licenseModel.UserId,
            };
        }
    }


}