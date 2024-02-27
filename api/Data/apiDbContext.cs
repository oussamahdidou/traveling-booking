using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class apiDbContext : IdentityDbContext<AppUser>
    {
        public apiDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }
        public DbSet<Entreprise> Entreprises { get; set; }
        public DbSet<Ville> Villes { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Ads> Ads { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<License> licenses { get; set; }
        // public DbSet<Doctor> doctors { get; set; }
        // public DbSet<LicenseDoctor> licenseDoctors { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> Roles = new List<IdentityRole>()
            {
                new IdentityRole()
                {
                    Name="Admin",
                    NormalizedName="ADMIN"
                },
                new IdentityRole()
                {
                    Name="User",
                    NormalizedName="User"
                }
            };
            builder.Entity<Rating>(x => x.HasKey(p => new { p.AppUserId, p.EntrepriseId }));
            builder.Entity<Rating>()
            .HasOne(u => u.AppUser)
            .WithMany(u => u.Ratings)
            .HasForeignKey(p => p.AppUserId);
            builder.Entity<Rating>()
            .HasOne(u => u.Entreprise)
            .WithMany(u => u.Ratings)
            .HasForeignKey(p => p.EntrepriseId);
            builder.Entity<Comment>(x =>
            {
                x.HasKey(p => p.Id); // Set Id as the primary key
                x.Property(p => p.Id).ValueGeneratedOnAdd(); // Configure Id to be auto-generated
                x.HasOne(u => u.AppUser)
                    .WithMany(u => u.Comments)
                    .HasForeignKey(p => p.AppUserId);
                x.HasOne(u => u.Entreprise)
                    .WithMany(u => u.Comments)
                    .HasForeignKey(p => p.EntrepriseId);
            });


            builder.Entity<IdentityRole>().HasData(Roles);
        }
    }
}