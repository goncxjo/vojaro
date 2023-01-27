using System;
using System.Collections.Generic;

namespace vojaro.domain
{
    public class OperationResult<TResult>
    {
        #region Factory

        public static OperationResult<TResult> Success(TResult result)
        {
            return new OperationResult<TResult>(result);
        }

        public static OperationResult<TResult> Failed(params string[] errors)
        {
            return new OperationResult<TResult>(errors);
        }

        public static OperationResult<TResult> Failed(IEnumerable<string> errors)
        {
            return new OperationResult<TResult>(errors);
        }

        public static OperationResult<TResult> Failed(Exception ex)
        {
            return Failed(ex.Message);
        }

        public static OperationResult<TResult> NotFound()
        {
            return Failed("El registro no existe o fue eliminado");
        }

        #endregion

        public bool Succeeded { get; private set; }
        public IEnumerable<string> Errors { get; private set; }

        public TResult Result { get; private set; }

        private OperationResult(IEnumerable<string> errors)
        {
            this.Succeeded = false;
            this.Errors = errors;
        }

        private OperationResult(TResult result)
        {
            this.Succeeded = true;
            this.Result = result;
            this.Errors = new string[] { };
        }

        public string GetErrorMessage()
        {
            return string.Join(". ", this.Errors);
        }
    }
}
