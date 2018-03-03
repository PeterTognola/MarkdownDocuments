using Microsoft.AspNetCore.Identity;

namespace MarkdownDocuments.Models.Models
{
    public class AccountModel : IdentityUser
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
    }
}