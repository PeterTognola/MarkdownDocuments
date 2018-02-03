using System;
using System.Collections.Generic;
using MarkdownDocuments.Models.Models;

namespace MarkdownDocuments.DAL.Repositories
{
    public class DocumentRepository : IRepository<DocumentModel>
    {
        public IEnumerable<DocumentModel> Get()
        {
            throw new NotImplementedException();
        }

        public DocumentModel Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public DocumentModel Add(DocumentModel modal)
        {
            throw new NotImplementedException();
        }

        public DocumentModel Update(DocumentModel model)
        {
            throw new NotImplementedException();
        }

        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}