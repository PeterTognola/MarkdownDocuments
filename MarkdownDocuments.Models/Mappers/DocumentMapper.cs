using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;

namespace MarkdownDocuments.Models.Mappers
{
    public class DocumentMapper : IMapper<DocumentModel, DocumentViewModel>
    {
        public DocumentViewModel MapToView(DocumentModel model)
        {
            return new DocumentViewModel
            {
                Id = model.Id,
                Title = model.Title,
                Body = model.Body,
                CreationDate = model.CreationDate
            };
        }

        public DocumentModel MapToModel(DocumentViewModel view)
        {
            return new DocumentModel
            {
                Id = view.Id,
                Title = view.Title,
                Body = view.Body,
                CreationDate = view.CreationDate
            };
        }
    }
}