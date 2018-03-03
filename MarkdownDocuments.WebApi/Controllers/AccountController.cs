using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MarkdownDocuments.DAL;
using MarkdownDocuments.Models.Models;
using MarkdownDocuments.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MarkdownDocuments.WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller // todo follow repo pattern.
    {
        private readonly UserManager<AccountModel> _userManager;
        private readonly SignInManager<AccountModel> _signInManager;

        public AccountController(UserManager<AccountModel> userManager, SignInManager<AccountModel> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] AccountLoginViewModel model) // todo injection attack??
        {
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, set lockoutOnFailure: true
            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, true, false);
            
            return result.Succeeded ? NoContent() : StatusCode((int) HttpStatusCode.InternalServerError);
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] AccountCreateViewModel model) // todo injection attack??
        {
            if (model.Password != model.ConfirmPassword || model.Password.Length < 1 || model.ConfirmPassword.Length < 1)
            {
                return StatusCode((int) HttpStatusCode.InternalServerError);
            }

            var user = new AccountModel
            {
                UserName = model.Email,
                Email = model.Email
            };
            
            var result = await _userManager.CreateAsync(user, model.Password); // todo password rules.

            if (!result.Succeeded) return StatusCode((int) HttpStatusCode.InternalServerError);

            await _signInManager.SignInAsync(user, false);

            return NoContent();
        }
        
        [HttpGet]
        public async Task Logout()
        {
            await _signInManager.SignOutAsync();
        }
    }
}