using Microsoft.AspNetCore.Mvc;
using RolesAndJWT.Models.Domain;

namespace RolesAndJWT.Repositories.Abstract
{
    public interface ICompanyRepository
    {
        Task<List<Company>> GetCompanies();
        Task<Company> GetCompanyById(int id);
        Task AddCompany(Company company);
        Task UpdateCompany(int id, Company company);
        Task DeleteCompany(int id);
    }
}
