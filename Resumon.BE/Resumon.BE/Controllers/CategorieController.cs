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
using Reshumon.DAL.DTO;
using Resumon.BE.Models;

namespace Resumon.BE.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/categories")]

    public class CategoriesController : BaseAPI
    {

        // GET: api/Categories
        [HttpGet, Route("")]
        public IEnumerable<Category> GetAllCategory()
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
                    var ans = ServiceProvider.EntityContext.Categories.GetAll();
                    return ans.ToList();
                }
                else
                {
                    return GetRelevantCategories().ToList();
                }

            }
            catch (Exception)
            {

                throw;
            }
           
        }

        [HttpGet, Route("relevant")]
        public IEnumerable<Category> GetRelevantCategories()
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
                var relevantCategory = ServiceProvider.EntityContext.Categories.GetAll().Where(c => relevantProjects.Count(p => p.CategoryID == c.CategoryID) > 0);

                return relevantCategory;
            }
            catch (Exception)
            {

                throw;
            }
        }


        [HttpGet, Route("active")]
        public IEnumerable<Category> GetActiveProjects()
        {
            try
            {
                var ans = GetAllCategory().Where(p => p.IsActive);
                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }



        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
        [HttpGet, Route("{id:int}")]
        public IHttpActionResult GetCategory(int id)
        {
            Category category  = ServiceProvider.EntityContext.Categories.Get(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // PUT: api/Categories/5
        [ResponseType(typeof(void))]
        [HttpPost, Route("{id:int}")]
        public IHttpActionResult PutCategory(int id,[FromBody] Category category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != category.CategoryID)
            {
                return BadRequest();
            }

           
            try
            {
                ServiceProvider.EntityContext.Categories.Edit(category);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(category);
        }

        // POST: api/Categories

        [HttpPost, Route("")]
        public IHttpActionResult PostCategory([FromBody]Category category)
        {
            if (!ModelState.IsValid || category.Name == null)
            {
                return BadRequest(ModelState);
            }

            try
            {
                ServiceProvider.EntityContext.Categories.Add(category);
            }
            catch (DbUpdateException)
            {
                if (CategoryExists(category.CategoryID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            return Ok(category);
            //return Content(HttpStatusCode.Created, category);
        }

        [HttpPut, Route("")]
        public IHttpActionResult PostProjects([FromBody] IEnumerable<Category> categories)
        {
            if (!ModelState.IsValid ||
                categories.Count(p => String.IsNullOrWhiteSpace(p.Name)) > 0 ||
                categories.Count(p => p.CategoryID < 1) > 0)
            {
                return BadRequest(ModelState);
            }

            IList<Category> categoriesuccessfulUpdated = new List<Category>();
            try
            {
                foreach (var category in categories)
                {
                    try
                    {
                        ServiceProvider.EntityContext.Categories.Edit(category);
                    }
                    catch (Exception)
                    {
                        //Do nothing ..
                    }
                    categoriesuccessfulUpdated.Add(category);

                }

            }
            catch (DbUpdateException)
            {
                throw;
            }
            return Ok(categoriesuccessfulUpdated);
            //return Content(HttpStatusCode.Created, Projects);
        }

        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        [HttpDelete, Route("")]
        public IHttpActionResult DeleteCategory([FromUri]int id)
        {
            
            Category category = ServiceProvider.EntityContext.Categories.Get(id);
            if (category == null)
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.Categories.Remove(category);

            return Ok(category);
        }

        protected override void Dispose(bool disposing)
        {
            //if (disposing)
            //{
            //    db.Dispose();
            //}
            //base.Dispose(disposing);
        }

        private bool CategoryExists(int id)
        {
            var category = ServiceProvider.EntityContext.Categories.Get(id);
            return category != null;
        }

    
    }
}