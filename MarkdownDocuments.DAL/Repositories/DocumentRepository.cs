using System;
using System.Collections.Generic;
using System.Linq;
using MarkdownDocuments.Models;
using MarkdownDocuments.Models.Models;
using Microsoft.EntityFrameworkCore;

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
                allItems = allItems.Where(x =>
                    x.Title.ToString().Contains(query.Query.ToLowerInvariant()) ||
                    x.Body.ToLowerInvariant().Contains(query.Query.ToLowerInvariant()));
            }

            return allItems
                .Skip(query.PageCount * (query.Page - 1))
                .Take(query.PageCount);
        }

        public DocumentModel Get(Guid id)
        {
            return _context.Documents.Find(id);
        }

        public DocumentModel Add(DocumentModel model)
        {
            _context.Add(model);
            return model;
        }

        public DocumentModel Update(DocumentModel model)
        {
            // Check if entity, model, is being tracked. If so, detach and attach (for changes).
            var attachedEntity = _context.ChangeTracker.Entries<DocumentModel>().FirstOrDefault(e => e.Entity.Id == model.Id);
            if (attachedEntity != null)
            {
                _context.Entry(attachedEntity.Entity).State = EntityState.Detached;
            }
            
            _context.Update(model);
            return model;
        }

        public void Delete(Guid id)
        {
            try
            {
                _context.Documents.Remove(_context.Documents.Find(id));
            }
            catch
            {
                throw new Exception("Unable to delete things..."); // todo error message.
            }
        }
        
        public int Count()
        {
            return _context.Documents.Count();
        }

        public bool Save()
        {
            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}