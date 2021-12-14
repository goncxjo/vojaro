using System.Collections.Generic;

namespace vojaro.api.Models
{
	public class ValidationErrorModel
	{
		public string FieldName { get; set; }
		public IEnumerable<string> Errors { get; set; }
	}
}
