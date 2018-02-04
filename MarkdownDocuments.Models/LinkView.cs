namespace MarkdownDocuments.Models
{
    public class LinkView
    {
        public string Href { get; set; }
        
        public string Rel { get; set; }
        
        public string Method { get; set; }

        public LinkView(string href, string rel, string method)
        {
            Href = href;
            Rel = rel;
            Method = method;
        }
    }
}