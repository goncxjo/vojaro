using System;
using System.Collections.Generic;

namespace vojaro.domain
{
    public class ValidationResult
    {
        #region Factory

        public static ValidationResult Success()
        {
            return new ValidationResult();
        }

        public static ValidationResult Failed(params string[] errors)
        {
            return new ValidationResult(errors);
        }

        public static ValidationResult Failed(IEnumerable<string> errors)
        {
            return new ValidationResult(errors);
        }

        public static ValidationResult Failed(Exception ex)
        {
            return Failed(ex.Message);
        }

        #endregion

        public bool Succeeded { get; private set; }
        public IEnumerable<string> Errors { get; private set; }

        private ValidationResult(IEnumerable<string> errors)
        {
            this.Succeeded = false;
            this.Errors = errors;
        }

        private ValidationResult()
        {
            this.Succeeded = true;
            this.Errors = new string[] { };
        }
    }
}
