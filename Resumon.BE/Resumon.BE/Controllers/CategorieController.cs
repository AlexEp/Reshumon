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
    [Authorize]
    [RoutePrefix("api/v1/categories")]

    public class CategoriesController : ApiController
    {

        // GET: api/Categories
        [HttpGet, Route("")]
        public IEnumerable<Category> GetCategory()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.Categories.GetAll(); 
                return ans.ToList();
            }
            catch (Exception)
            {

                throw;
            }
           
        }


        [HttpGet, Route("active")]
        public IEnumerable<Category> GetAcriveCategories()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.Categories.GetAll().Where(p => p.IsActive);
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