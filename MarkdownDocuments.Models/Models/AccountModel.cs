using System;
using Microsoft.AspNetCore.Identity;

namespace MarkdownDocuments.Models.Models
{
    public class AccountModel : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
        
        public class AccountRoleModel : IdentityRole<Guid>
        {
        }
    }
}