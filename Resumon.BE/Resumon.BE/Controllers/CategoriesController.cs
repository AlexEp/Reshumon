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

    public class CategoriesController : ApiController
    {

        // GET: api/Categories
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

        // GET: api/Categories/5
        [ResponseType(typeof(Category))]
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
        [HttpPut]
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
                ServiceProvider.EntityContext.Categories.Add(category);
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

        // DELETE: api/Categories/5
        [ResponseType(typeof(Category))]
        public IHttpActionResult DeleteCategory(int id)
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