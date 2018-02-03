using MarkdownDocuments.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace MarkdownDocuments.DAL
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // move out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(
                    @"Server=.\SQLEXPRESS;Integrated Security=True;Initial Catalog=PrivyyDocumentStore;");
            }
        }

        public DbSet<DocumentModel> Documents { get; set; }
    }
}