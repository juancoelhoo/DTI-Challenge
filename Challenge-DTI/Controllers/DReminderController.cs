using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Challenge_DTI.Models;

namespace Challenge_DTI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DReminderController : ControllerBase
    {
        private readonly ReminderDBContext _context;

        public DReminderController(ReminderDBContext context)
        {
            _context = context;
        }

        // GET: api/DReminder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DReminder>>> GetDReminder()
        {
            return await _context.DReminder.ToListAsync();
        }

        // GET: api/DReminder/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DReminder>> GetDReminder(int id)
        {
            var dReminder = await _context.DReminder.FindAsync(id);

            if (dReminder == null)
            {
                return NotFound();
            }

            return dReminder;
        }

        // PUT: api/DReminder/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDReminder(int id, DReminder dReminder)
        {
            dReminder.Id = id;

            _context.Entry(dReminder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DReminderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DReminder
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DReminder>> PostDReminder(DReminder dReminder)
        {
            _context.DReminder.Add(dReminder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDReminder", new { id = dReminder.Id }, dReminder);
        }

        // DELETE: api/DReminder/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDReminder(int id)
        {
            var dReminder = await _context.DReminder.FindAsync(id);
            if (dReminder == null)
            {
                return NotFound();
            }

            _context.DReminder.Remove(dReminder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DReminderExists(int id)
        {
            return _context.DReminder.Any(e => e.Id == id);
        }
    }
}
