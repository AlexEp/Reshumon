using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Globalization;
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
    [RoutePrefix("api/v1/daily-activity")]
    public class DailyActivityController : ApiController
    {
        [HttpGet, Route("")]
        public IEnumerable<DailyActivity> Get()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.DailyActivity.GetAll();
                return ans.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet, Route("")]
        public IEnumerable<DailyActivity> Get([FromUri] string from, [FromUri] string to)
        {
            try
            {
                CultureInfo provider = CultureInfo.InvariantCulture;

                DateTime toDate = DateTime.Now;
                DateTime fromDate = toDate.AddMonths(-1);

                DateTime.TryParseExact(from, "yyyy-MM-dd", provider, DateTimeStyles.None, out fromDate);
                DateTime.TryParseExact(to, "yyyy-MM-dd", provider, DateTimeStyles.None ,out toDate);

                var ans = ServiceProvider.EntityContext.DailyActivity.GetByDate(fromDate, toDate);
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
            DailyActivity entety = ServiceProvider.EntityContext.DailyActivity.Get(id);
            if (entety == null)
            {
                return NotFound();
            }

            return Ok(entety);
        }

        // PUT: api/Categories/5
        [HttpPut]
        public IHttpActionResult Put(int id, [FromBody] DailyActivity entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != entity.ActivityID)
            {
                return BadRequest();
            }


            try
            {
                ServiceProvider.EntityContext.DailyActivity.Edit(entity);
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