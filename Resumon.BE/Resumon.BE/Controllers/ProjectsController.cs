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
    public class ProjectsController : ApiController
    {
        // GET: api/Categories
        public IEnumerable<Project> GetProjects()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.Projects.GetAll();
                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }

        }

        // GET: api/Categories/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult GetProjects(int id)
        {
            Project Projects = ServiceProvider.EntityContext.Projects.Get(id);
            if (Projects == null)
            {
                return NotFound();
            }

            return Ok(Projects);
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        [HttpPut]
        public IHttpActionResult PutProjects(int id, [FromBody] Project Projects)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Projects.ProjectID)
            {
                return BadRequest();
            }


            try
            {
                ServiceProvider.EntityContext.Projects.Edit(Projects);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(Projects);
        }

        // POST: api/Categories

        [HttpPut]
        public IHttpActionResult PostProjects([FromBody]Project Projects)
        {
            if (!ModelState.IsValid || 
                Projects.Name == null )
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.Projects.Add(Projects);
            }
            catch (DbUpdateException)
            {
                if (ProjectsExists(Projects.ProjectID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(Projects);
            //return Content(HttpStatusCode.Created, Projects);
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult DeleteProjects(int id)
        {

            Project Projects = ServiceProvider.EntityContext.Projects.Get(id);
            if (Projects == null)
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.Projects.Remove(Projects);

            return Ok(Projects);
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    db.Dispose();
            //}
            //base.Dispose(disposing);
        }

        private bool ProjectsExists(int id)
        {
            var Projects = ServiceProvider.EntityContext.Categories.Get(id);
            return Projects != null;
        }
    }
}