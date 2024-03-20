using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;

namespace api.Data
{
    public class SeedData
    {

        public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                //Roles
                var usermanager = serviceScope.ServiceProvider.GetService<UserManager<AppUser>>();
                //Users
                var RoleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                //Admins
                //admin1
                if (!await RoleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                }
                string admin1Email = "oussamahdidou15@gmail.com";
                var admin1 = await usermanager.FindByEmailAsync(admin1Email);
                if (admin1 == null)
                {
                    var newadmin1 = new AppUser()
                    {
                        UserName = "oussamahdidou",
                        Email = admin1Email,
                        EmailConfirmed = true,
                    };
                    await usermanager.CreateAsync(newadmin1, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newadmin1, UserRoles.Admin);
                }
                //admin2
                if (!await RoleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                }
                string admin2Email = "oussamahdidou15@gmail.com";
                var admin2 = await usermanager.FindByEmailAsync(admin2Email);
                if (admin2 == null)
                {
                    var newadmin2 = new AppUser()
                    {
                        UserName = "oussamahdidou",
                        Email = admin2Email,
                        EmailConfirmed = true,
                    };
                    await usermanager.CreateAsync(newadmin2, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newadmin2, UserRoles.Admin);
                }
                //admin3
                if (!await RoleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                }
                string admin3Email = "oussamahdidou15@gmail.com";
                var admin3 = await usermanager.FindByEmailAsync(admin3Email);
                if (admin3 == null)
                {
                    var newadmin3 = new AppUser()
                    {
                        UserName = "oussamahdidou",
                        Email = admin3Email,
                        EmailConfirmed = true,

                    };
                    await usermanager.CreateAsync(newadmin3, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newadmin3, UserRoles.Admin);
                }
                //admin4
                if (!await RoleManager.RoleExistsAsync(UserRoles.Admin))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
                }
                string admin4Email = "oussamahdidou15@gmail.com";
                var admin4 = await usermanager.FindByEmailAsync(admin4Email);
                if (admin4 == null)
                {
                    var newadmin4 = new AppUser()
                    {
                        UserName = "oussamahdidou",
                        Email = admin4Email,
                        EmailConfirmed = true,
                    };
                    await usermanager.CreateAsync(newadmin4, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newadmin4, UserRoles.Admin);
                }
                List<Entreprise> entreprises = new List<Entreprise>()
                {
                    new Entreprise(){

                    }

                };
                //Tourists
                if (!await RoleManager.RoleExistsAsync(UserRoles.Student))
                {
                    await RoleManager.CreateAsync(new IdentityRole(UserRoles.Student));
                }
                string studentuserEmail = "oussamahdidou223@gmail.com";
                var studentUser = await usermanager.FindByEmailAsync(studentuserEmail);
                if (studentUser == null)
                {
                    var newstudentUser = new AppUser()
                    {
                        UserName = "oussamahdidou2",
                        Email = studentuserEmail,
                        EmailConfirmed = true,

                    };
                    await usermanager.CreateAsync(newstudentUser, "Coding@1234?");
                    await usermanager.AddToRoleAsync(newstudentUser, UserRoles.Student);
                }
            }
        }

    }
}