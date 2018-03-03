using System;
using MarkdownDocuments.Models.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MarkdownDocuments.DAL
{
    public class DbContext : IdentityDbContext<AccountModel, AccountModel.AccountRoleModel, Guid>
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // move out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(
                    @"Server=.\SQLEXPRESS;Integrated Security=True;Initial Catalog=MarkdownDocuments;");
            }
        }

        public DbSet<DocumentModel> Documents { get; set; }
    }
}