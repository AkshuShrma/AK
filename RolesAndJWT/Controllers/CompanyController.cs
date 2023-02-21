using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RolesAndJWT.Models.Domain;
using RolesAndJWT.Repositories.Abstract;

namespace RolesAndJWT.Controllers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private ICompanyRepository _customerService;

        public CompanyController(ICompanyRepository customerService)
        {
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<IEnumerable<Company>> Get()
        {
            var compnies = await _customerService.GetCompanies();
            return compnies;
        }
        [HttpGet("{id}")]
        public async Task<Company> GetById(int id)
        {
            return await _customerService.GetCompanyById(id);
        }
        [HttpPost]
        public async Task Post([FromBody] Company company)
        {
            await _customerService.AddCompany(company);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Company company)
        {
            await _customerService.UpdateCompany(id, company);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _customerService.DeleteCompany(id);
        }
    }
}