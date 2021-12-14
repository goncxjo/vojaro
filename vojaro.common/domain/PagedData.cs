using System.Collections.Generic;

namespace vojaro.domain
{
    public class PagedData<T>
    {
        public int Total { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
