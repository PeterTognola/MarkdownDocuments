using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;

namespace MarkdownDocuments.Models.Mappers
{
    public interface IDocumentMapper
    {
        DocumentViewModel MapToView(DocumentModel model);
        DocumentModel MapToModel(DocumentViewModel view);
    }
}