using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using MarkdownDocuments.DAL.Repositories;
using MarkdownDocuments.Models;
using MarkdownDocuments.Models.Mappers;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace MarkdownDocuments.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DocumentController : Controller
    {
        private readonly IUrlHelper _urlHelper;
        private readonly IMapper<DocumentModel, DocumentViewModel> _documentMapper;
        private readonly IRepository<DocumentModel> _documentRepository;
        
        public DocumentController(IUrlHelper urlHelper, IRepository<DocumentModel> documentRepository, IMapper<DocumentModel, DocumentViewModel> documentMapper)
        {
            _documentRepository = documentRepository;
            _documentMapper = documentMapper;
            _urlHelper = urlHelper;
        }

        // GET api/documents
        [HttpGet(Name = nameof(GetAll), Order = 1)]
        public IActionResult GetAll([FromQuery] QueryParameters query)
        {
            try
            {
                var allItemCount = _documentRepository.Count();

                var paginationMetadata = new
                {
                    totalCount = allItemCount,
                    pageSize = query.PageCount,
                    currentPage = query.Page,
                    totalPages = query.GetTotalPages(allItemCount)
                }; // todo refactor out.

                Response.Headers.Add("X-Pagination", Newtonsoft.Json.JsonConvert.SerializeObject(paginationMetadata)); // todo refactor out.

                var links = CreateLinksForCollection(query, allItemCount);
                var value = _documentRepository.Get(query).Select(x => _documentMapper.MapToView(x));

                return Ok(new
                {
                    value = value,
                    links = links
                });
            }
            catch (Exception e) // todo log exception
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
            
            var links = GetLinks(id);
            var value = _documentMapper.MapToView(document);

            return Ok(new
            {
                value = value,
                links = links
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
            catch (Exception e) // todo log exception
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
        
        private List<LinkView> CreateLinksForCollection(QueryParameters queryParameters, int totalCount) // todo temp method. Need better solution.
        {
            var links = new List<LinkView>();

            // self 
            links.Add(
                new LinkView(_urlHelper.Link(nameof(GetAll), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page,
                    orderby = queryParameters.OrderBy
                }), "self", "GET"));

            links.Add(new LinkView(_urlHelper.Link(nameof(GetAll), new
            {
                pagecount = queryParameters.PageCount,
                page = 1,
                orderby = queryParameters.OrderBy
            }), "first", "GET"));

            links.Add(new LinkView(_urlHelper.Link(nameof(GetAll), new
            {
                pagecount = queryParameters.PageCount,
                page = queryParameters.GetTotalPages(totalCount),
                orderby = queryParameters.OrderBy
            }), "last", "GET"));

            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkView(_urlHelper.Link(nameof(GetAll), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page + 1,
                    orderby = queryParameters.OrderBy
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkView(_urlHelper.Link(nameof(GetAll), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page - 1,
                    orderby = queryParameters.OrderBy
                }), "previous", "GET"));
            }

            return links;
        }
        
        private IEnumerable<LinkView> GetLinks(Guid id) // todo temp method. Need better solution.
        {
            var links = new List<LinkView>();

            links.Add(
                new LinkView(_urlHelper.Link(nameof(Get), new { id = id }),
                    "self",
                    "GET"));

            links.Add(
                new LinkView(_urlHelper.Link(nameof(Delete), new { id = id }),
                    "delete_food",
                    "DELETE"));

            links.Add(
                new LinkView(_urlHelper.Link(nameof(Post), null),
                    "create_food",
                    "POST"));

            links.Add(
                new LinkView(_urlHelper.Link(nameof(Put), new { id = id }),
                    "update_food",
                    "PUT"));

            return links;
        }
    }
}