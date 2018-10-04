using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Resumon.BE.Models.Authentication;
using Resumon.BE.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Resumon.BE.Models
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            try
            {
                var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
                var manager = new UserManager<ApplicationUserIdentity>(userStore);
                var user = await manager.FindAsync(context.UserName, context.Password);
                if (user != null)
                {
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity.AddClaim(new Claim("Username", user.UserName));
                    identity.AddClaim(new Claim("Email", user.Email));
                    identity.AddClaim(new Claim("UserRefID", user.UserRefID.ToString()));
                    identity.AddClaim(new Claim("LoggedOn", DateTime.Now.ToString()));

                    var userRoles = manager.GetRoles(user.Id);
                    foreach (string roleName in userRoles)
                    {
                        identity.AddClaim(new Claim(ClaimTypes.Role, roleName));
                    }
                    //return data to client
                    var additionalData = new AuthenticationProperties(new Dictionary<string, string>{
                        {
                            "role", Newtonsoft.Json.JsonConvert.SerializeObject(userRoles)
                        },
                          {
                             "userName", context.UserName
                         }
                    });

                    AuthenticationProperties properties = CreateProperties(context.UserName);
                    AuthenticationTicket ticket =new AuthenticationTicket(identity, additionalData);
                    context.Validated(ticket);
                }
                else
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                }
                return;
            }
            catch (Exception ep)
            {

                throw;
            }
        }

        public static AuthenticationProperties CreateProperties(string userName)
        {
            IDictionary<string, string>
            data = new Dictionary<string, string>
            {
                { "userName", userName }
            };
            return new AuthenticationProperties(data);
        }
    }
}