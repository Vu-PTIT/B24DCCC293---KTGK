// ============================================================
// Enum dùng chung cho toàn dự án
// ============================================================

// ---- Chức vụ ----
export enum EChucVuMa {
  TRUONG_PHONG = 'CV01',
  PHO_PHONG = 'CV02',
  NHAN_VIEN = 'CV03',
  THUC_TAP_SINH = 'CV04',
}

export const EChucVuMaLabel: Record<EChucVuMa, string> = {
  [EChucVuMa.TRUONG_PHONG]: 'Trưởng phòng',
  [EChucVuMa.PHO_PHONG]: 'Phó phòng',
  [EChucVuMa.NHAN_VIEN]: 'Nhân viên',
  [EChucVuMa.THUC_TAP_SINH]: 'Thực tập sinh',
};

// ---- Phòng ban ----
export enum EPhongBanMa {
  KY_THUAT = 'PB01',
  NHAN_SU = 'PB02',
  KE_TOAN = 'PB03',
  MARKETING = 'PB04',
}

export const EPhongBanMaLabel: Record<EPhongBanMa, string> = {
  [EPhongBanMa.KY_THUAT]: 'Phòng Kỹ thuật',
  [EPhongBanMa.NHAN_SU]: 'Phòng Nhân sự',
  [EPhongBanMa.KE_TOAN]: 'Phòng Kế toán',
  [EPhongBanMa.MARKETING]: 'Phòng Marketing',
};

// ---- Trạng thái nhân viên ----
export enum ETrangThaiNhanVien {
  THU_VIEC = 'thu-viec',
  DA_KY = 'da-ky',
  NGHI_PHEP = 'nghi-phep',
  DA_THOI_VIEC = 'da-thoi-viec',
}

export const ETrangThaiNhanVienLabel: Record<ETrangThaiNhanVien, string> = {
  [ETrangThaiNhanVien.THU_VIEC]: 'Thử việc',
  [ETrangThaiNhanVien.DA_KY]: 'Đã ký',
  [ETrangThaiNhanVien.NGHI_PHEP]: 'Nghỉ phép',
  [ETrangThaiNhanVien.DA_THOI_VIEC]: 'Đã thôi việc',
};

// ---- Helper: chuyển enum + label map sang mảng { value, label } cho filterData ----
export function enumToFilterData<T extends string>(
  enumObj: Record<string, T>,
  labelMap: Record<T, string>,
): { value: T; label: string }[] {
  return Object.values(enumObj).map((value) => ({ value, label: labelMap[value] }));
}
