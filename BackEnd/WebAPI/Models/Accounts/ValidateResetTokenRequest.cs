using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Accounts
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}