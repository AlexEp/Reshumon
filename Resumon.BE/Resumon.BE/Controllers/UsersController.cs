using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Reshumon.DAL.DTO;
using Resumon.BE.Models;
using Resumon.BE.Models.Authentication;
using Resumon.BE.Models.ViewModels;

namespace Resumon.BE.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/users")]
    public class UsersController : BaseAPI
    {

        [HttpGet, Route("")]
        public IEnumerable<User> GetAllUsers()
        {
            IList<User> usersList = new List<User>();

            try
            {
                //user Identity
                var identityClaims = (ClaimsIdentity)User.Identity;
                IEnumerable<Claim> claims = identityClaims.Claims;

                var uerRefID = int.Parse(identityClaims.FindFirst("UserRefID").Value);
                var Role = identityClaims.FindFirst(ClaimTypes.Role).Value;


                var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
                var manager = new UserManager<ApplicationUserIdentity>(userStore);
                var usersAuth = userStore.Users.ToList();

                if (User.IsInRole("Admin")) //filter in case of non Admin
                {
                    //load user list
                    var users = ServiceProvider.EntityContext.Users.GetAll();
                    usersList = users.Select(u => FillWithIdntetyData(u, usersAuth)).ToList();

                }
                else
                {
                    var user = ServiceProvider.EntityContext.Users.Get(uerRefID);
                    user = FillWithIdntetyData(user, usersAuth);

                    usersList.Add(user);
                }

                return usersList;
            }
            catch (Exception)
            {
                throw;
            }

        }

        private User FillWithIdntetyData(User user, List<ApplicationUserIdentity> usersAuth)
        {
            var userAuth = usersAuth.FirstOrDefault(ua => ua.UserRefID == user.UserID);

            if (userAuth != null)
            {
                user = user.CreateFrom(userAuth);
            }

            return user;
        }

        [HttpGet, Route("active")]
        public IEnumerable<User> GetAcriveUsers()
        {
            try
            {
                var ans = this.GetAllUsers().Where(p => p.IsActive);

                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }


        // GET: api/Users/5
        [ResponseType(typeof(User))]
        [HttpGet, Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult GetUser(int id)
        {
            User User = ServiceProvider.EntityContext.Users.Get(id);
            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        [HttpPost, Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutUser(int id, [FromBody] User User)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != User.UserID)
            {
                return BadRequest();
            }


            try
            {
                ServiceProvider.EntityContext.Users.Edit(User);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(User);
        }

        // POST: api/Users

        //[HttpPut, Route("")]
        //[Authorize(Roles = "Admin")]
        //public IHttpActionResult PostUser([FromBody]User User)
        //{
        //    if (!ModelState.IsValid || User.FirstName == null)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    try
        //    {
        //        ServiceProvider.EntityContext.Users.Add(User);
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (UserExists(User.UserID))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }
        //    return Ok(User);
        //    //return Content(HttpStatusCode.Created, User);
        //}

        [HttpPut, Route("")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult PutUsers([FromBody] IEnumerable<User> users)
        {
            if (!ModelState.IsValid ||
                users.Count(p => String.IsNullOrWhiteSpace(p.FirstName)) > 0 ||
                users.Count(p => p.UserID < 1) > 0)
            {
                return BadRequest(ModelState);
            }

            IList<User> usersSuccessfulUpdated = new List<User>();
            try
            {
                foreach (var user in users)
                {
                    try
                    {
                        ServiceProvider.EntityContext.Users.Edit(user);

                        var userStore = new UserStore<ApplicationUserIdentity>(new AuthenticationDbContext());
                        var manager = new UserManager<ApplicationUserIdentity>(userStore);
                        var usersAuth = userStore.Users.ToList();

                        var userAuth = manager.Users.FirstOrDefault(ua => ua.UserRefID == user.UserID);
                     
                        //TODO: should find better why to change this
                        manager.RemoveFromRole(userAuth.Id, "Admin");
                        manager.RemoveFromRole(userAuth.Id, "Employee");

                        if (user.Role == Common.RolesEnum.Admin)
                        {
                            manager.AddToRole(userAuth.Id, "Admin");
                        }
                        else
                        {
                            manager.AddToRole(userAuth.Id, "Employee");
                        }
                       

                    }
                    catch (Exception)
                    {
                        //Do nothing ..
                    }
                    usersSuccessfulUpdated.Add(user);

                }

            }
            catch (DbUpdateException)
            {
                throw;
            }
            return Ok(usersSuccessfulUpdated);
            //return Content(HttpStatusCode.Created, Projects);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        [HttpDelete, Route("")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult DeleteUser(int id)
        {
            
            User User = ServiceProvider.EntityContext.Users.Get(id);
            if (User == null)
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.Users.Remove(User);

            return Ok(User);
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    db.Dispose();
            //}
            //base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            var User = ServiceProvider.EntityContext.Users.Get(id);
            return User != null;
        }

    
    }
}