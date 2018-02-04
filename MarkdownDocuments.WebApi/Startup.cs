using MarkdownDocuments.DAL;
using MarkdownDocuments.DAL.Repositories;
using MarkdownDocuments.Models.Mappers;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace MarkdownDocuments.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// Called on runtime.
        /// Will setup Mappers and Repositories when requested.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DbContext>();
            
            // Repository Instantiation
            services.AddScoped<IRepository<DocumentModel>, DocumentRepository>();
            
            // Mapper Instantiation
            services.AddTransient<IMapper<DocumentModel, DocumentViewModel>, DocumentMapper>();
            
            services.AddMvc();
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                loggerFactory.AddConsole(Configuration.GetSection("Logging"));
                loggerFactory.AddDebug();
                
                app.UseDeveloperExceptionPage();
            }

            app.UseMvc();
        }
    }
}