using RolesAndJWT.Models;
using RolesAndJWT.Models.Domain;

namespace RolesAndJWT.Repositories.Abstract
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetEmployees();
        Task<Employee> GetEmployeeById(int id);
        Task AddEmployee(Employee employee);
        Task UpdateEmployee(int id, Employee employee);
        Task DeleteEmployee(int id);
    }
}
