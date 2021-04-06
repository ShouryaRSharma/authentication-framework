using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Accounts
{
    public class VerifyEmailRequest
    {
        [Required]
        public string Token { get; set; }
    }
}