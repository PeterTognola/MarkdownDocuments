using MarkdownDocuments.Models.Mappers;
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
        /// Will setup Mappers for when requested.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            // Mapper Instantiation
            services.AddTransient<IDocumentMapper, DocumentMapper>();
            
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