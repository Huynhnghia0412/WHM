using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WareHouseManagement.Attributes;
using WareHouseManagement.Models.DTO.Note;
using WareHouseManagement.Services.Note.Interfaces;
using WareHouseManagement.Utilities;

namespace WareHouseManagement.Controllers.Note
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class NoteController : ControllerBase
	{
		private readonly INoteServices _note;
		public NoteController(INoteServices note)
		{
			_note = note;
		}


		[HttpGet("GetInOutNotes")]
		[AuthorizeClaim(SD.Claim_ReadInOutNote)]
		public async Task<IActionResult> GetInOutNotes()
		{
			var result = await _note.GetInOutNotesAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}

		[HttpGet("GetInventoryNotes")]
		[AuthorizeClaim(SD.Claim_ReadCheckInventory)]
		public async Task<IActionResult> GetInventoryNotes()
		{
			var result = await _note.GetInventoryNotesAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpGet("GetCheckInventoryProducts")]
		public async Task<IActionResult> GetCheckInventoryProducts()
		{
			var result = await _note.GetCheckInventoryProductsAsync();

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpGet("GetNote/{id}")]
		public async Task<IActionResult> GetNote(int id)
		{
			var result = await _note.GetInOutNoteAsync(id);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpPost("AddInOutNote")]
		public async Task<IActionResult> AddInOutNote([FromBody] AddInOutNoteRequestDTO model)
		{
			var result = await _note.AddInOutNoteAsync(model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpPut("UpdateInOutNote/{id}")]
		public async Task<IActionResult> UpdateInOutNote(int id, [FromBody] AddInOutNoteRequestDTO model)
		{
			var result = await _note.UpdateInOutNoteAsync(id, model);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}


		[HttpDelete("DeleteNote/{id}")]
		public async Task<IActionResult> DeleteNote(int id)
		{
			var result = await _note.DeleteNoteAsync(id);

			if (result.IsSuccess)
			{
				return Ok(result);
			}
			else
			{
				return BadRequest(result);
			}
		}
	}
}
