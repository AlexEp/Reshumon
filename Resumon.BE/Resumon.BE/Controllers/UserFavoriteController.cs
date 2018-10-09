using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Reshumon.DAL;
using Reshumon.DAL.DTO;
using Resumon.BE.Models;

namespace Resumon.BE.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/user-favorite")]
 
    public class UserFavoriteController : BaseAPI
    {

        [Route("Admin")]
        [HttpGet, Route("")]
        public IEnumerable<UserFavorite> Get()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.UserFavorites.GetAll();
                return ans.ToList();
            }
            catch (Exception)
            {
                throw;
            }

        }


        [HttpGet, Route("relevant")]
        public IEnumerable<UserFavorite> GetRelevant()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.UserFavorites.Get(GetUser());
                return ans.ToList();
            }
            catch (Exception)
            {
                throw;
            }

        }


        // POST: api/Categories

        [HttpPost, Route("")]
        public IHttpActionResult Post([FromBody]Project entity)
        {
            if (!ModelState.IsValid )
            {
                return BadRequest(ModelState);
            }

            UserFavorite userFavorites = new UserFavorite();
            try
            {

                //Validation if project belong to the user

                var user = this.GetUser();
                var projects = ServiceProvider.EntityContext.Projects.Get(user);
               

                if (projects.Count(p => p.ProjectID == entity.ProjectID) < 1)
                {
                    return BadRequest();
                }


              
                userFavorites.ProjectID = entity.ProjectID;
                userFavorites.UserID = user.UserID;

                ServiceProvider.EntityContext.UserFavorites.Add(userFavorites);
            }
            catch (DbUpdateException)
            {

                    throw;
            }
            return Ok(userFavorites);
     
        }

        // DELETE: api/Categories/5
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {

            DailyActivity entity = ServiceProvider.EntityContext.DailyActivity.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.DailyActivity.Remove(entity);

            return Ok(entity);
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    db.Dispose();
            //}
            //base.Dispose(disposing);
        }

        private bool IsExists(int id)
        {
            var entity = ServiceProvider.EntityContext.Categories.Get(id);
            return entity != null;
        }
    }
}