using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reshumon.DAL.DTO
{
    [Table("Project")]
    public class Project
    {
        [Key, Column("ProjectID")]
        public int ProjectID { get; set; }
    }
}
