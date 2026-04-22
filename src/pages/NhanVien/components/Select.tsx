import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormNhanVien from './Form';

/**
 * Select Nhân viên để cho vào FormItem
 */
const SelectNhanVien = (props: {
  value?: string | null;
  onChange?: (val: string | null) => void;
  multiple?: boolean;
  hasCreate?: boolean;
}) => {
  const { value, onChange, multiple, hasCreate } = props;
  const { danhSach, getAllModel, setVisibleForm, visibleForm, setEdit, setRecord } =
    useModel('nhanvien');

  useEffect(() => {
    if (!visibleForm) getAllModel();
  }, [visibleForm]);

  const onAddNew = () => {
    setRecord(undefined);
    setEdit(false);
    setVisibleForm(true);
  };

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <div className={hasCreate !== false ? 'width-select-custom' : 'fullWidth'}>
        <Select
          mode={multiple ? 'multiple' : undefined}
          value={value}
          onChange={onChange}
          options={danhSach.map((item) => ({
            key: item._id,
            value: item._id,
            label: `${item.ten} (${item.ma})`,
          }))}
          showSearch
          optionFilterProp="label"
          placeholder="Chọn nhân viên"
        />
      </div>

      {hasCreate !== false ? (
        <>
          <Button icon={<PlusOutlined />} onClick={onAddNew} />
          <Modal
            visible={visibleForm}
            bodyStyle={{ padding: 0 }}
            footer={null}
            onCancel={() => setVisibleForm(false)}
          >
            <FormNhanVien title="nhân viên" />
          </Modal>
        </>
      ) : null}
    </div>
  );
};

export default SelectNhanVien;
