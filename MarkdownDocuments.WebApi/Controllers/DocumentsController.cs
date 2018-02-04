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
    public class DocumentsController : Controller
    {
        private readonly IUrlHelper _urlHelper;
        private readonly IMapper<DocumentModel, DocumentViewModel> _documentMapper;
        private readonly IRepository<DocumentModel> _documentRepository;
        
        public DocumentsController(IUrlHelper urlHelper, IRepository<DocumentModel> documentRepository, IMapper<DocumentModel, DocumentViewModel> documentMapper)
        {
            _documentRepository = documentRepository;
            _documentMapper = documentMapper;
            _urlHelper = urlHelper;
        }

        // GET api/documents
        [HttpGet(Name = nameof(Get))]
        public IActionResult Get([FromQuery] QueryParameters query)
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
//        [HttpGet("{id}")]
//        public string Get(Guid id)
//        {
//            throw new NotImplementedException();
//        }

        // POST api/documents
        [HttpPost]
        public IActionResult Post([FromBody] DocumentViewModel view)
        {
            if (view == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            
            view.Id = Guid.NewGuid();
            
            try
            {
                _documentRepository.Add(_documentMapper.MapToModel(view));

                if (!_documentRepository.Save()) throw new Exception("Unable to save changes");
                
                return CreatedAtRoute(nameof(Post), new { id = view.Id }, view);
            }
            catch (Exception e) // todo log exception
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
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
        
        private List<LinkView> CreateLinksForCollection(QueryParameters queryParameters, int totalCount) // todo temp method. Need better solution.
        {
            var links = new List<LinkView>();

            // self 
            links.Add(
                new LinkView(_urlHelper.Link(nameof(Get), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page,
                    orderby = queryParameters.OrderBy
                }), "self", "GET"));

            links.Add(new LinkView(_urlHelper.Link(nameof(Get), new
            {
                pagecount = queryParameters.PageCount,
                page = 1,
                orderby = queryParameters.OrderBy
            }), "first", "GET"));

            links.Add(new LinkView(_urlHelper.Link(nameof(Get), new
            {
                pagecount = queryParameters.PageCount,
                page = queryParameters.GetTotalPages(totalCount),
                orderby = queryParameters.OrderBy
            }), "last", "GET"));

            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkView(_urlHelper.Link(nameof(Get), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page + 1,
                    orderby = queryParameters.OrderBy
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkView(_urlHelper.Link(nameof(Get), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page - 1,
                    orderby = queryParameters.OrderBy
                }), "previous", "GET"));
            }

            return links;
        }
    }
}