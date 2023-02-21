using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace RolesAndJWT.Models.Domain
{
    public class Company
    {
        public int Id { get; set; }

        [Display(Name = "Company Name")]
        public string CompanyName { get; set; }

        [Display(Name = "Company Address")]
        public string CompanyAddress { get; set; }

        public string Country { get; set; }

        public int Gst { get; set; }
        public LeaveType Leave { get; set; }
        public string Designation { get; set; }
    
    }
}
