using System;

namespace MarkdownDocuments.Models.ViewModels
{
    public class AccountViewModel
    {
        public Guid Id { get; set; }
        
        public string Email { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
    }

    public class AccountCreateViewModel
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
        
        public string ConfirmPassword { get; set; }
    }

    public class AccountLoginViewModel
    {
        public string Email { get; set; }
        
        public string Password { get; set; }
    }
}