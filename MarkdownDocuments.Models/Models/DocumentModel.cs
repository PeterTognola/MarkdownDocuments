using System;

namespace MarkdownDocuments.Models.Models
{
    public class DocumentModel
    {
        public Guid Id { get; set; }
        
        public string Title { get; set; }
        
        public string Body { get; set; }
        
        public DateTime CreationDate { get; set; }
    }
}