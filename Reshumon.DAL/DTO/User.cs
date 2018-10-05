using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    [Table("User")]
    public class User
    {
        [Key, Column("UserID")]
        public int UserID { get; set; }

        [Column("FirstName")]
        public string FirstName { get; set; }

        [Column("LastName")]
        public string LastName { get; set; }

        [Column("UserName")]
        public string UserName { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("IsUseDiningRoom")]
        public bool IsUseDiningRoom { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }

        [Column("JoinDate")]
        public DateTime JoinDate { get; set; }
    }

}
