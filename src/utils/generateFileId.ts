export const generateFileId = () => {
  return `id-${Math.random().toString(36).substring(2, 10)}`;
};
