using System;
using System.Collections.Generic;
using MarkdownDocuments.Models;

namespace MarkdownDocuments.DAL.Repositories
{
    public interface IRepository<TModel>
    {
        IEnumerable<TModel> Get(QueryParameters query);
        TModel Get(Guid id);
        TModel Add(TModel modal);
        TModel Update(TModel model);
        void Delete(Guid id);
    }
}