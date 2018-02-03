using System;
using System.Collections.Generic;
using MarkdownDocuments.DAL.Repositories;
using MarkdownDocuments.Models.Mappers;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MarkdownDocuments.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentsController : Controller
    {
        private readonly IMapper<DocumentModel, DocumentViewModel> _documentMapper;
        private readonly IRepository<DocumentRepository> _documentRepository;

        public DocumentsController(IRepository<DocumentRepository> documentRepository, IMapper<DocumentModel, DocumentViewModel> documentMapper)
        {
            _documentRepository = documentRepository;
            _documentMapper = documentMapper;
        }

        // GET api/documents
        [HttpGet]
        public IEnumerable<string> Get()
        {
            throw new NotImplementedException();
        }

        // GET api/documents/{id}
        [HttpGet("{id}")]
        public string Get(Guid id)
        {
            throw new NotImplementedException();
        }

        // POST api/documents
        [HttpPost]
        public void Post([FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // PUT api/documents/{id}
        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] string value)
        {
            throw new NotImplementedException();
        }

        // DELETE api/documents/{id}
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}