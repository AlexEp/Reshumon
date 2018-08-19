using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    [Table("Category")]
    public class Category
    {
        [Key, Column("CategoryID")]
        public int CategoryID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }
    }

}
