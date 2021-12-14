﻿namespace vojaro.parameters
{
    public abstract class QueryStringParameters
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10000;
        public string Sort { get; set; }
    }
}