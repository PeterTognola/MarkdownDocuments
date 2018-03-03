using System;

namespace MarkdownDocuments.Models.BusinessModels
{
    public class AccountBusinessModel
    {
        public Guid Id { get; set; }
        
        public string Email { get; set; }
        
        public string FirstName { get; set; }
        
        public string LastName { get; set; }
    }
}