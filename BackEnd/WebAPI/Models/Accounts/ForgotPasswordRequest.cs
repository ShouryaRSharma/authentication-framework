using System.ComponentModel.DataAnnotations;

namespace WebAPI.Models.Accounts
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}