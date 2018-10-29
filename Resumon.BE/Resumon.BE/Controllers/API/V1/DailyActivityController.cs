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
    public class DailyActivityController : BaseAPI
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

                DateTime.TryParse(from, out fromDate);
                DateTime.TryParse(to,out toDate);

                var ans = ServiceProvider.EntityContext.DailyActivity.GetByDate(fromDate.Date, toDate.AddDays(1).Date);
                return ans.Where(a => a.UserID == this.GetUserID()).ToList();
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
        [HttpPut, Route("")]
        public IHttpActionResult Put([FromBody] DailyActivity entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            DailyActivity existEntity = ServiceProvider.EntityContext.DailyActivity.Get(entity.ActivityID);
            if (existEntity == null || existEntity.UserID != this.GetUserID())
            {
                return NotFound();
            }

            existEntity.StartDate = entity.StartDate;
            existEntity.EndDate = entity.EndDate;
            existEntity.Note = entity.Note;

            try
            {
                ServiceProvider.EntityContext.DailyActivity.Edit(existEntity);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IsExists(entity.ActivityID))
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

        [HttpPost, Route("")]
        public IHttpActionResult Post([FromBody]DailyActivity entity)
        {
           
            if (!ModelState.IsValid )
            {
                return BadRequest(ModelState);
            }
            entity.UserID = this.GetUserID();

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
        [HttpDelete, Route("")]
        public IHttpActionResult Delete([FromUri]int id)
        {

            DailyActivity entity = ServiceProvider.EntityContext.DailyActivity.Get(id);
            if (entity == null || entity.UserID != this.GetUserID())
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