using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
 
    [Table("DiningRoomUse")]
    public class DiningRoomUse
    {
        [Key, Column("DiningRoomUseID")]
        public int DiningRoomUseID { get; set; }

        [Column("UserID")]
        public int UserID { get; set; }

        [Column("Date")]
        public DateTime Date { get; set; }
        
        [Column("IsDiningRoomUse")]
        public bool IsDiningRoomUse { get; set; }
    }

}


