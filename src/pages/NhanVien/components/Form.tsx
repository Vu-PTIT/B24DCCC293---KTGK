import rules from '@/utils/rules';
import { resetFieldsForm } from '@/utils/utils';
import { Button, Card, Form, Input, InputNumber, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';

const TRANG_THAI_OPTIONS = [
  { value: 'thu-viec', label: 'Thử việc' },
  { value: 'da-ky', label: 'Đã ký' },
  { value: 'nghi-phep', label: 'Nghỉ phép' },
  { value: 'da-thoi-viec', label: 'Đã thôi việc' },
];

const FormNhanVien = (props: any) => {
  const [form] = Form.useForm();
  const { record, setVisibleForm, edit, postModel, putModel, formSubmiting, visibleForm } =
    useModel('nhanvien');
  const { danhSach: chucVuList } = useModel('danhmuc.chucvu');
  const { danhSach: phongBanList } = useModel('danhmuc.phongban');

  const title = props?.title ?? '';

  useEffect(() => {
    if (!visibleForm) {
      resetFieldsForm(form);
    } else if (record?._id) {
      form.setFieldsValue(record);
    } else {
      // Auto generate ma nhan vien
      const newMa = 'NV' + (Math.floor(Math.random() * 9000) + 1000);
      form.setFieldsValue({ ma: newMa });
    }
  }, [record?._id, visibleForm]);

  const onFinish = async (values: NhanVien.IRecord) => {
    if (edit) {
      putModel(record?._id ?? '', values)
        .then()
        .catch((er) => console.log(er));
    } else {
      postModel(values)
        .then(() => form.resetFields())
        .catch((er) => console.log(er));
    }
  };

  return (
    <Card title={(edit ? 'Chỉnh sửa ' : 'Thêm mới ') + title?.toLowerCase()}>
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item
          name="ma"
          label="Mã nhân viên"
          rules={[...rules.required, ...rules.text, ...rules.length(20)]}
        >
          <Input placeholder="Mã nhân viên" disabled={edit} />
        </Form.Item>

        <Form.Item
          name="ten"
          label="Họ tên"
          rules={[
            ...rules.required,
            ...rules.text,
            {
              pattern: /^[a-zA-ZÀ-ỿ\s]*$/,
              message: 'Họ tên không được chứa ký tự đặc biệt',
            },
            ...rules.length(50),
          ]}
        >
          <Input placeholder="Họ tên nhân viên" />
        </Form.Item>

        <Form.Item
          name="chucVu"
          label="Chức vụ"
          rules={[...rules.required]}
        >
          <Select
            placeholder="Chọn chức vụ"
            options={chucVuList?.map((cv: any) => ({
              label: cv.ten,
              value: cv.ma,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="phongBan"
          label="Phòng ban"
          rules={[...rules.required]}
        >
          <Select
            placeholder="Chọn phòng ban"
            options={phongBanList?.map((pb: any) => ({
              label: pb.ten,
              value: pb.ma,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="luong"
          label="Lương"
          rules={[...rules.required]}
        >
          <InputNumber
            placeholder="Lương (đơn vị VNĐ)"
            style={{ width: '100%' }}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="trangThai"
          label="Trạng thái"
          rules={[...rules.required]}
        >
          <Select
            placeholder="Chọn trạng thái"
            options={TRANG_THAI_OPTIONS}
          />
        </Form.Item>

        <div className="form-footer">
          <Button loading={formSubmiting} htmlType="submit" type="primary">
            {!edit ? 'Thêm mới' : 'Lưu lại'}
          </Button>
          <Button onClick={() => setVisibleForm(false)}>Hủy</Button>
        </div>
      </Form>
    </Card>
  );
};

export default FormNhanVien;
