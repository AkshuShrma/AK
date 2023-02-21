using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using RolesAndJWT.Models;
using RolesAndJWT.Models.Domain;
using RolesAndJWT.Repositories.Abstract;
using System.Data;

namespace RolesAndJWT.Repositories.Domain
{
    public class CompanyRepository : ICompanyRepository
    {
        private readonly DatabaseContext _context;

        public CompanyRepository(DatabaseContext context)
        {
            _context = context;
        }
        public async Task AddCompany(Company company)
        {
            await _context.Companies.AddAsync(company);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCompany(int id)
        {
            var companyInDb = await _context.Companies.FindAsync(id);
            _context.Companies.Remove(companyInDb);
            await _context.SaveChangesAsync();
        }
        public async Task<List<Company>> GetCompanies()
        {
            return await _context.Companies.ToListAsync();
        }
        public async Task<Company> GetCompanyById(int id)
        {
            return await _context.Companies.FirstOrDefaultAsync(v => v.Id == id);
        }
        public async Task UpdateCompany(int id, Company company)
        {
            _context.Companies.Update(company);
            await _context.SaveChangesAsync();
        }
    }
}
