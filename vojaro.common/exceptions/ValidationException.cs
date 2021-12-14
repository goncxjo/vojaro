using System;

namespace vojaro.api.exceptions
{
	public class ValidationException : ApplicationException
	{
		public ValidationException(string message) : base(message)
		{
		}
	}
}
