using System;
using System.Collections.Generic;

namespace MarkdownDocuments.DAL.Repositories
{
    public interface IRepository<TModel>
    {
        IEnumerable<TModel> Get();
        TModel Get(Guid id);
        TModel Add(TModel modal);
        TModel Update(TModel model);
        void Delete(Guid id);
    }
}