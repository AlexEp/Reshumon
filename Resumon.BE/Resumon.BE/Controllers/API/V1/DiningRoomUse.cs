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
    [RoutePrefix("api/v1/dining-room")]
    public class DiningRoomUseController : BaseAPI
    {
        [HttpGet, Route("")]
        public IEnumerable<DiningRoomUse> Get()
        {
            try
            {
                var ans = ServiceProvider.EntityContext.DiningRoomUse.GetAll();
                return ans.ToList();
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet, Route("")]
        public IEnumerable<DiningRoomUse> Get([FromUri] string from, [FromUri] string to)
        {
            try
            {
                CultureInfo provider = CultureInfo.InvariantCulture;

                DateTime toDate = DateTime.Now;
                DateTime fromDate = toDate.AddMonths(-1);

                DateTime.TryParse(from, out fromDate);
                DateTime.TryParse(to,out toDate);

                var ans = ServiceProvider.EntityContext.DiningRoomUse.GetByDate(fromDate.Date, toDate.AddDays(1).Date);
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
            DiningRoomUse entety = ServiceProvider.EntityContext.DiningRoomUse.Get(id);
            if (entety == null)
            {
                return NotFound();
            }

            return Ok(entety);
        }

        // PUT: api/Categories/5
        [HttpPut, Route("")]
        public IHttpActionResult Put([FromBody] DiningRoomUse entity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DiningRoomUse existEntity = null;
            IList<DiningRoomUse> existEntitiesByDate = ServiceProvider.EntityContext.DiningRoomUse.GetByDate(entity.Date, entity.Date.AddDays(1)).ToList();

            if (existEntitiesByDate != null && existEntitiesByDate.Count() >0)
            {
                existEntity = existEntitiesByDate.FirstOrDefault(d => d.UserID == this.GetUserID());
            }

     

            try
            {
                if (existEntity == null)
                {
                    entity.UserID = this.GetUserID();
                    ServiceProvider.EntityContext.DiningRoomUse.Add(entity);
                }
                else
                {
                    existEntity.IsDiningRoomUse = entity.IsDiningRoomUse;
                    ServiceProvider.EntityContext.DiningRoomUse.Edit(existEntity);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IsExists(entity.DiningRoomUseID))
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
        public IHttpActionResult Post([FromBody]DiningRoomUse entity)
        {
           
            if (!ModelState.IsValid )
            {
                return BadRequest(ModelState);
            }
            entity.UserID = this.GetUserID();

            try
            {
                ServiceProvider.EntityContext.DiningRoomUse.Add(entity);
            }
            catch (DbUpdateException)
            {
                if (IsExists(entity.DiningRoomUseID))
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

            DiningRoomUse entity = ServiceProvider.EntityContext.DiningRoomUse.Get(id);
            if (entity == null || entity.UserID != this.GetUserID())
            {
                return NotFound();
            }

            ServiceProvider.EntityContext.DiningRoomUse.Remove(entity);

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