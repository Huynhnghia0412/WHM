using Microsoft.EntityFrameworkCore;
using WareHouseManagement.DataAccess.Repository.IRepository;
using WareHouseManagement.Models;
using WareHouseManagement.Models.DTO.WH;
using WareHouseManagement.Models.Response;
using WareHouseManagement.Services.WareHouse.Interfaces;

namespace WareHouseManagement.Services.WareHouse
{
	public class WareHouseServices : IWareHouseServices
	{
		private readonly IUnitOfWork _unitOfWork;
		private ApiResponse<object> _res;
		public WareHouseServices(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
			_res = new();
		}
		public async Task<ApiResponse<GetWareHouseResponseDTO>> GetWareHouses()
		{
			ApiResponse<GetWareHouseResponseDTO> res = new();

			var wHs = await _unitOfWork.WareHouse.GetAll().Include(x => x.User).ToListAsync();

			// Map thông tin email từ User vào cột Email của WareHouse
			foreach (var wareHouse in wHs)
			{
				wareHouse.Email = wareHouse.User?.Email ?? string.Empty;
			}

			res.Result.WareHouses = wHs;
			return res;
		}

		public async Task<ApiResponse<object>> AddWareHouse(AddOrUpdateWareHouseRequestDTO model)
		{
			var whInDbWithName = await _unitOfWork.WareHouse.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (whInDbWithName != null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên kho." } }
					};
				return _res;
			}

			Models.WareHouse newWareHouse = new()
			{
				Name = model.Name,
				UserId = model.UserId,
			};

			_unitOfWork.WareHouse.Add(newWareHouse);
			_unitOfWork.Save();

			_res.Messages = "Đã thêm kho thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> UpdateWareHouse(int id, AddOrUpdateWareHouseRequestDTO model)
		{
			var whInDbWithId = await _unitOfWork.WareHouse.Get(x => x.Id == id, true).FirstOrDefaultAsync();

			if (whInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.Name), new List<string> { $"Không tìm thấy kho." } }
					};
				return _res;
			}

			if (model.UserId.Equals("-----") || string.IsNullOrEmpty(model.UserId))
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{nameof(model.UserId), new List<string> { $"Chọn người quản kho." } }
					};
				return _res;
			}

			var whInDbWithName = await _unitOfWork.WareHouse.Get(x => x.Name.Equals(model.Name), true).FirstOrDefaultAsync();

			if (whInDbWithName != null && whInDbWithName.Id != whInDbWithId.Id)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
				{
						{nameof(model.Name), new List<string> { $"Trùng tên kho." } }
					};
				return _res;
			}

			whInDbWithId.Name = model.Name;
			whInDbWithId.UserId = model.UserId;

			_unitOfWork.WareHouse.Update(whInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã cập nhật kho thành công.";
			return _res;
		}

		public async Task<ApiResponse<object>> DeleteWareHouse(int id)
		{
			var whInDbWithId = await _unitOfWork.WareHouse.Get(x => x.Id == id, true).Include(x => x.Notes).FirstOrDefaultAsync();

			if (whInDbWithId == null)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không tìm thấy kho." } }
					};
				return _res;
			}

			if (whInDbWithId.Notes != null && whInDbWithId.Notes.Count() > 0)
			{
				_res.IsSuccess = false;
				_res.Errors = new Dictionary<string, List<string>>
					{
						{ "Id", new List<string> { $"Không thể xóa kho vì đã được thêm vào trong phiếu." } }
					};
				return _res;
			}

			_unitOfWork.WareHouse.Remove(whInDbWithId);
			_unitOfWork.Save();

			_res.Messages = "Đã xóa kho thành công.";
			return _res;
		}
	}
}
