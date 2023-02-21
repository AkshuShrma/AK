using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RolesAndJWT.Models;
using RolesAndJWT.Models.Domain;
using RolesAndJWT.Repositories.Abstract;

namespace RolesAndJWT.Controllers
{
    [Route("api/[controller]/{action}")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        [HttpGet]
        public async Task<IEnumerable<Employee>> Get()
        {
            var employees = await _employeeRepository.GetEmployees();
            return employees;
        }
        [HttpGet("{id}")]
        public async Task<Employee> GetById(int id)
        {
            return await _employeeRepository.GetEmployeeById(id);
        }
        [HttpPost]
        public async Task Post([FromBody] Employee employee)
        {
            await _employeeRepository.AddEmployee(employee);
        }
        [HttpPut("{id}")]
        public async Task Update(int id, [FromBody] Employee employee)
        {
            await _employeeRepository.UpdateEmployee(id, employee);
        }
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employeeRepository.DeleteEmployee(id);
        }
    }
}
