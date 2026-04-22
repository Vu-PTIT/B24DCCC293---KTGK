import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<PhongBan.IRecord>('phong-ban');

  return {
    ...objInit,
  };
};
