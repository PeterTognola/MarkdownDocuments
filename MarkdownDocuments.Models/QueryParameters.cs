using System;
using System.Linq;

namespace MarkdownDocuments.Models
{
    public class QueryParameters
    {
        private const int MaxPageCount = 10;
        
        public int Page { get; set; } = 1;

        private int _pageCount = MaxPageCount;
        
        public int PageCount
        {
            get => _pageCount;
            set => _pageCount = (value > MaxPageCount) ? MaxPageCount : value;
        }
        
        public string Query { get; set; }

        public string OrderBy { get; set; } = "Title";
    }
    
    public static class QueryParametersExtensions
    {
        public static bool HasPrevious(this QueryParameters queryParameters)
        {
            return (queryParameters.Page > 1);
        }

        public static bool HasNext(this QueryParameters queryParameters, int totalCount)
        {
            return (queryParameters.Page < (int)GetTotalPages(queryParameters, totalCount));
        }

        public static double GetTotalPages(this QueryParameters queryParameters, int totalCount)
        {
            return Math.Ceiling(totalCount / (double)queryParameters.PageCount);
        }

        public static bool HasQuery(this QueryParameters queryParameters)
        {
            return !string.IsNullOrEmpty(queryParameters.Query);
        }

        public static bool IsDescending(this QueryParameters queryParameters)
        {
            return !string.IsNullOrEmpty(queryParameters.OrderBy) && queryParameters.OrderBy.Split(' ').Last().ToLowerInvariant().StartsWith("desc");
        }
    }
}