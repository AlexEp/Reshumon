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

    
    [RoutePrefix("api/v1/user-project")]
    public class UserProjectController : ApiController
    {
        [HttpGet,Route("")]
        public IEnumerable<UserProject> Get()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.UserProject.GetAll();
                return ans.ToList();
            }
            catch (Exception)
            {
                throw;
            }

        }

        // GET: api/Categories/5
   
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            UserProject entety = ServiceProvider.EntityContext.UserProject.Get(id);
            if (entety == null)
            {
                return NotFound();
            }

            return Ok(entety);
        }

        // PUT: api/Categories/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] UserProject entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.ID)
            {
                return BadRequest();
            }


            try
            {
                ServiceProvider.EntityContext.UserProject.Edit(entity);
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

        [HttpPost,  Route("")]
        public IHttpActionResult Post([FromBody]UserProject entity)
        {
            if (!ModelState.IsValid )
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.UserProject.Add(entity);
            }
            catch (DbUpdateException)
            {
                if (IsExists(entity.ID))
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

            UserProject entity = ServiceProvider.EntityContext.UserProject.Get(id);
            if (entity == null)
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.UserProject.Remove(entity);

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