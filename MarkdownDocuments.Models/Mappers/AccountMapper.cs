using System;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;

namespace MarkdownDocuments.Models.Mappers
{
    public class AccountMapper : IMapper<AccountModel, AccountViewModel>
    {
        public AccountViewModel MapToView(AccountModel model)
        {
            throw new NotImplementedException();
        }

        public AccountModel MapToModel(AccountViewModel view)
        {
            throw new NotImplementedException();
        }
    }
}