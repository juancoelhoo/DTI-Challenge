using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Challenge_DTI.Models
{
    public class DReminder
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName ="date")]
        public DateTime Date { get; set; }

        [Column(TypeName = "date")]
        public DateTime CreatedAt   { get; set; }

    }
}
