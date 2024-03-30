using WareHouseManagement.Models.DTO.Note;
using WareHouseManagement.Models.Response;

namespace WareHouseManagement.Services.Note.Interfaces
{
	public interface INoteServices
	{
		public Task<ApiResponse<GetInOutNotesResponseDTO>> GetInOutNotesAsync();
		public Task<ApiResponse<GetInOutNotesResponseDTO>> GetInventoryNotesAsync();
		public Task<ApiResponse<GetCheckInventoryRequestDTO>> GetCheckInventoryProductsAsync();
		public Task<ApiResponse<GetInOutNoteResponseDTO>> GetInOutNoteAsync(int noteId);
		public Task<ApiResponse<object>> AddInOutNoteAsync(AddInOutNoteRequestDTO model);
		public Task<ApiResponse<object>> UpdateInOutNoteAsync(int noteId, AddInOutNoteRequestDTO model);
		public Task<ApiResponse<object>> DeleteNoteAsync(int noteId);
	}
}
