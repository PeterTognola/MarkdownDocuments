using System;
using System.Collections.Generic;
using System.Linq;
using MarkdownDocuments.Models;
using MarkdownDocuments.Models.Models;

namespace MarkdownDocuments.DAL.Repositories
{
    public class DocumentRepository : IRepository<DocumentModel>
    {
        private DbContext _context = new DbContext();
        
        public IEnumerable<DocumentModel> Get(QueryParameters query)
        {
            IQueryable<DocumentModel> allItems = _context.Documents.AsQueryable().OrderBy(x => x.Title); //.OrderBy(query.OrderBy, query.IsDescending())

            if (query.HasQuery())
            {
                allItems = allItems
                    .Where(x => x.Title.ToString().Contains(query.Query.ToLowerInvariant())
                                || x.Body.ToLowerInvariant().Contains(query.Query.ToLowerInvariant()));
            }

            return allItems
                .Skip(query.PageCount * (query.Page - 1))
                .Take(query.PageCount);
        }

        public DocumentModel Get(Guid id)
        {
            throw new NotImplementedException();
        }

        public DocumentModel Add(DocumentModel model)
        {
            _context.Add(model);
            _context.SaveChanges();
            return model;
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