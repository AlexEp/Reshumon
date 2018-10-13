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
    [RoutePrefix("api/v1/user-project")]
    public class UserProjectController : BaseAPI
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
        [HttpPost, Route("project/{projectID:int}/update")]
        public IHttpActionResult PostByProject(int projectID, [FromBody]IList<User> entities)
        {

            var userProjectList = new List<UserProject>();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
       
            try
            {
                //1. remove old data
                ServiceProvider.EntityContext.UserProject.RemoveRange(new Project() { ProjectID = projectID });

                //2. add new recoreds
                userProjectList = entities.Select(u => new UserProject() { ProjectID = projectID , UserID = u.UserID }).ToList();
                ServiceProvider.EntityContext.UserProject.AddRange(userProjectList);
            }
            catch (DbUpdateException exp)
            {
                Content(HttpStatusCode.InternalServerError, exp.Message);
            }
            return Ok(new { ProjectID = projectID, UserProjectList  = userProjectList });

        }

        [HttpPost,  Route("user/{userID:int}/update")]
        public IHttpActionResult PostByUser(int userID, [FromBody]IList<Project> entities)
        {
            var userProjectList = new List<UserProject>();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                //1. remove old data
                ServiceProvider.EntityContext.UserProject.RemoveRange(new User() { UserID = userID });

                //2. add new recoreds
                userProjectList = entities.Select( p=> new UserProject() { ProjectID = p.ProjectID, UserID = userID }).ToList();
                ServiceProvider.EntityContext.UserProject.AddRange(userProjectList);
            }
            catch (DbUpdateException exp)
            {
                Content(HttpStatusCode.InternalServerError, exp.Message);
            }
            return Ok(new { UserID = userID, UserProjectList = userProjectList });

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