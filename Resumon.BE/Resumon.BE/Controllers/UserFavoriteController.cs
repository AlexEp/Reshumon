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

    [RoutePrefix("api/v1/user-favorite")]
    public class UserFavoriteController : ApiController
    {
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

        // GET: api/Categories/5
        [Route("{id:int}")]
        [HttpGet]
        public IHttpActionResult Get(int id)
        {
            UserFavorite entety = ServiceProvider.EntityContext.UserFavorites.Get(id);
            if (entety == null)
            {
                return NotFound();
            }

            return Ok(entety);
        }

        // PUT: api/Categories/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] UserFavorite entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.UsersFavoriteID)
            {
                return BadRequest();
            }


            try
            {
                ServiceProvider.EntityContext.UserFavorites.Edit(entity);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(entity);
        }

        // POST: api/Categories

        [HttpPut]
        public IHttpActionResult Post([FromBody]DailyActivity entity)
        {
            if (!ModelState.IsValid )
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.DailyActivity.Add(entity);
            }
            catch (DbUpdateException)
            {
                if (IsExists(entity.ActivityID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(entity);
     
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