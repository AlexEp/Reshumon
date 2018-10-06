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
using System.Web.Http.Description;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Reshumon.DAL;
using Reshumon.DAL.DTO;
using Resumon.BE.Models;
using Resumon.BE.Models.Authentication;
using Resumon.BE.Models.ViewModels;

namespace Resumon.BE.Controllers
{

    [Authorize]
    [RoutePrefix("api/v1/projects")]
    public class ProjectsController : ApiController
    {
        // GET: api/Categories
        [HttpGet, Route("")]
        public IEnumerable<Project> GetAllProjects()
        {
            try
            {

                //user Identity
                var identityClaims = (ClaimsIdentity)User.Identity;
                IEnumerable<Claim> claims = identityClaims.Claims;

                var uerRefID = int.Parse(identityClaims.FindFirst("UserRefID").Value);
                var Role = identityClaims.FindFirst(ClaimTypes.Role).Value;


                if (User.IsInRole("Admin")) //filter in case of non Admin
                {
                    var ans = ServiceProvider.EntityContext.Projects.GetAll();
                    return ans.ToList();
                }
                else
                {
                    return GetRelevantProjects().ToList();
                }
             
            }
            catch (Exception)
            {

                throw;
            }

        }


        public IEnumerable<Project> GetRelevantProjects()
        {
            //user Identity
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;

            var uerRefID = int.Parse(identityClaims.FindFirst("UserRefID").Value);

            try
            {
                var user = ServiceProvider.EntityContext.Users.Get(uerRefID);
                //TODO : better getby user / project function
                var userProjects = ServiceProvider.EntityContext.UserProject.GetAll().Where(p => p.UserID == user.UserID);

                var relevantProjects = ServiceProvider.EntityContext.Projects.GetAll().Where(p => userProjects.Count(up => up.ProjectID == p.ProjectID) > 0);
                return relevantProjects;
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet, Route("active")]
        public IEnumerable<Project> GetAcriveProjects()
        {
            try
            {
                var ans = GetAllProjects().Where(p => p.IsActive);
                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        

        // GET: api/Categories/5
        [ResponseType(typeof(Project))]
        [HttpGet, Route("{id:int}")]
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
        [HttpPut, Route("{id:int}")]
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

   
        [HttpPut, Route("")]
        public IHttpActionResult PutProjects([FromBody] IEnumerable<Project> projects)
        {
            if (!ModelState.IsValid ||
                projects.Count( p => String.IsNullOrWhiteSpace(p.Name)) > 0 ||
                projects.Count(p => p.ProjectID < 1) > 0)
            {
                return BadRequest(ModelState);
            }

            IList<Project> projectsSuccessfulUpdated = new List<Project>();
            try
            {
                foreach (var project in projects)
                {
                    try
                    {
                        ServiceProvider.EntityContext.Projects.Edit(project);
                    }
                    catch (Exception)
                    {
                        //Do nothing ..
                    }
                    projectsSuccessfulUpdated.Add(project);

                }
             
            }
            catch (DbUpdateException)
            {
                throw;
            }
            return Ok(projectsSuccessfulUpdated);
            //return Content(HttpStatusCode.Created, Projects);
        }


        [HttpPost, Route("")]
        public IHttpActionResult PostProjects([FromBody] Project project)
        {
            if (!ModelState.IsValid || project.Name == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.Projects.Add(project);
            }
            catch (DbUpdateException)
            {
                if (ProjectsExists(project.ProjectID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(project);
            //return Content(HttpStatusCode.Created, category);
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Project))]
        [HttpDelete, Route("")]
        public IHttpActionResult DeleteProjects([FromUri] int id)
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