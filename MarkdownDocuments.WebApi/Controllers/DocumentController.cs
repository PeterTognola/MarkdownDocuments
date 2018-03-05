using System;
using System.Linq;
using System.Net;
using MarkdownDocuments.DAL.Repositories;
using MarkdownDocuments.Models;
using MarkdownDocuments.Models.Mappers;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;
using MarkdownDocuments.WebApi.helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace MarkdownDocuments.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentController : Controller
    {
        private readonly IMapper<DocumentModel, DocumentViewModel> _documentMapper;
        private readonly IRepository<DocumentModel> _documentRepository;

        private readonly CrudLinks<DocumentController> _crudLinks;
        
        public DocumentController(IUrlHelper urlHelper, IRepository<DocumentModel> documentRepository, IMapper<DocumentModel, DocumentViewModel> documentMapper)
        {
            _documentRepository = documentRepository;
            _documentMapper = documentMapper;

            _crudLinks = new CrudLinks<DocumentController>(urlHelper);
        }

        // GET api/documents
        [HttpGet(Name = nameof(GetAll), Order = 1)]
        public IActionResult GetAll([FromQuery] QueryParameters query)
        {
            try
            {
                var totalCount = _documentRepository.Count();
                
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(_crudLinks.GeneratePaginationHeader(query, totalCount)));

                return Ok(new
                {
                    value = _documentRepository.Get(query).Select(x => _documentMapper.MapToView(x)),
                    links = _crudLinks.GetPaginationLinks(query, totalCount)
                });
            }
            catch (Exception) // todo log exception
            {
                return StatusCode((int) HttpStatusCode.InternalServerError);
            }
        }

        // GET api/documents/{id}
        [HttpGet("{id}", Name = nameof(Get), Order = 2)]
        public IActionResult Get(Guid id)
        {
            if (id == Guid.Empty) return BadRequest();
            
            var document = _documentRepository.Get(id);

            return Ok(new
            {
                value = _documentMapper.MapToView(document),
                links = _crudLinks.GetSingleLinks(id)
            });
        }

        // POST api/documents
        [HttpPost(Name = nameof(Post))]
        public IActionResult Post([FromBody] DocumentViewModel view)
        {
            if (view == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            view.Id = Guid.NewGuid();
            
            try
            {
                _documentRepository.Add(_documentMapper.MapToModel(view));

                if (!_documentRepository.Save()) throw new Exception("Unable to save changes");
                
                return CreatedAtRoute(nameof(Get), new { id = view.Id });
            }
            catch (Exception) // todo log exception
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        // PUT api/documents/{id}
        [HttpPut("{id}", Name = nameof(Put))]
        public IActionResult Put(Guid id, [FromBody] DocumentViewModel view)
        {
            if (view == null) return BadRequest();

            var model = _documentRepository.Get(id);

            if (model == null) return NotFound();

            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updatedItem = _documentRepository.Update(_documentMapper.MapToModel(view));

            if (!_documentRepository.Save()) throw new Exception("Unable to save changes");

            return Ok(_documentMapper.MapToView(updatedItem));
        }

        // DELETE api/documents/{id}
        [HttpDelete("{id}", Name = nameof(Delete))]
        public IActionResult Delete(Guid id)
        {
            if (id == Guid.Empty) return BadRequest();

            if (_documentRepository.Get(id) == null) return NotFound();

            _documentRepository.Delete(id);

            if (!_documentRepository.Save()) throw new Exception("Unable to save changes");

            return NoContent();
        }
    }
}