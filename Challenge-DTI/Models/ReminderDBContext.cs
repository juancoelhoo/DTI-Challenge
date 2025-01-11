using Microsoft.EntityFrameworkCore;

namespace Challenge_DTI.Models
{
    public class ReminderDBContext:DbContext
    {
        public ReminderDBContext(DbContextOptions<ReminderDBContext> options) : base(options) 
        {

        }

        public DbSet<DReminder> DReminder { get; set; }
    }
}
