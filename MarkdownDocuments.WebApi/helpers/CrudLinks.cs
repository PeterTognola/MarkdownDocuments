using System;
using System.Collections.Generic;
using MarkdownDocuments.Models;
using Microsoft.AspNetCore.Mvc;

namespace MarkdownDocuments.WebApi.helpers
{
    public class CrudLinks<TController>
    {
        private readonly IUrlHelper _urlHelper;

        public CrudLinks(IUrlHelper urlHelper)
        {
            _urlHelper = urlHelper;
        }
        
        public IEnumerable<LinkView> GetSingleLinks(Guid id)
        {
            var controllerType = typeof(TController);
            var controllerName = controllerType.Name.ToLower().Split("controller")[0];
            
            return new List<LinkView>
            {
                new LinkView(_urlHelper.Link(controllerType.GetMethod("Get").Name, new {id}),
                    "self",
                    "GET"),
                new LinkView(_urlHelper.Link(controllerType.GetMethod("Delete").Name, new {id}),
                    $"delete_{controllerName}",
                    "DELETE"),
                new LinkView(_urlHelper.Link(controllerType.GetMethod("Post").Name, null),
                    $"create_{controllerName}",
                    "POST"),
                new LinkView(_urlHelper.Link(controllerType.GetMethod("Put").Name, new {id}),
                    $"update_{controllerName}",
                    "PUT")
            };
        }
        
        public List<LinkView> GetPaginationLinks(QueryParameters queryParameters, int totalCount) // todo temp method. Need better solution.
        {
            var controllerType = typeof(TController);
            var controllerGetAllName = controllerType.GetMethod("GetAll").Name;
            
            var links = new List<LinkView>
            {
                new LinkView(_urlHelper.Link(controllerGetAllName, new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page,
                    orderby = queryParameters.OrderBy
                }), "self", "GET"),
                new LinkView(_urlHelper.Link(controllerGetAllName, new
                {
                    pagecount = queryParameters.PageCount,
                    page = 1,
                    orderby = queryParameters.OrderBy
                }), "first", "GET"),
                new LinkView(_urlHelper.Link(controllerGetAllName, new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.GetTotalPages(totalCount),
                    orderby = queryParameters.OrderBy
                }), "last", "GET")
            };

            // self 
            
            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkView(_urlHelper.Link(controllerGetAllName, new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page + 1,
                    orderby = queryParameters.OrderBy
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkView(_urlHelper.Link(controllerGetAllName, new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page - 1,
                    orderby = queryParameters.OrderBy
                }), "previous", "GET"));
            }

            return links;
        }

        public dynamic GeneratePaginationHeader(QueryParameters query, int totalCount)
        {
            return new
            {
                totalCount,
                pageSize = query.PageCount,
                currentPage = query.Page,
                totalPages = query.GetTotalPages(totalCount)
            };
        }
    }
}