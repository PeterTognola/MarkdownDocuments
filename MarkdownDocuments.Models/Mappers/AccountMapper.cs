using System;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;

namespace MarkdownDocuments.Models.Mappers
{
    public class AccountMapper : IMapper<AccountModel, AccountViewModel>
    {
        public AccountViewModel MapToView(AccountModel model)
        {
            return new AccountViewModel
            {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email
            };
        }

        public AccountModel MapToModel(AccountViewModel view)
        {
            throw new NotImplementedException();
        }
    }
}