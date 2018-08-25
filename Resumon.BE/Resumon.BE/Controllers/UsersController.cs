using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Reshumon.DAL.DTO;
using Resumon.BE.Models;

namespace Resumon.BE.Controllers
{

    public class UsersController : ApiController
    {

        // GET: api/Users
        public IEnumerable<User> GetUser()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.Users.GetAll(); 
                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }
           
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(int id)
        {
            User User  = ServiceProvider.EntityContext.Users.Get(id);
            if (User == null)
            {
                return NotFound();
            }

            return Ok(User);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult PutUser(int id,[FromBody] User User)
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

        [HttpPut]
        public IHttpActionResult PostUser([FromBody]User User)
        {
            if (!ModelState.IsValid || User.Name == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.Users.Add(User);
            }
            catch (DbUpdateException)
            {
                if (UserExists(User.UserID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(User);
            //return Content(HttpStatusCode.Created, User);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
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