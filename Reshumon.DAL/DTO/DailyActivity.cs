using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    [Table("DailyActivity")]
    public class DailyActivity
    {

        [Key, Column("ActivityID")]
        public int ActivityID { get; set; }

        [Column("UserID")]
        public int UserID { get; set; }

        [Column("ProjectID")]
        public int ProjectID { get; set; }

        [Column("StartDate")]
        public DateTime? StartDate { get; set; }

        [Column("EndDate")]
        public DateTime? EndDate { get; set; }


        [Column("Note")]
        public string Note { get; set; }


    }

}
