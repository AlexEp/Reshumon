using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    [Table("UserFavorite")]
    public class UserFavorite
    {
        [Key, Column("UserFavoriteID")]
        public int UsersFavoriteID { get; set; }

        [Column("UserID")]
        public int UserID { get; set; }

        [Column("ProjectID")]
        public int ProjectID { get; set; }
    }

}
