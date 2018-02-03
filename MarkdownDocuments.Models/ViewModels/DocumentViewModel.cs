using System;

namespace MarkdownDocuments.Models.ViewModels
{
    public class DocumentViewModel
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        
        public string Body { get; set; }
        
        public DateTime CreationDate { get; set; }
    }
}