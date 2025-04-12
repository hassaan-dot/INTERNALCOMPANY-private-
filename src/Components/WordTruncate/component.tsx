const truncateComponentName = (name: any, size: any) => {
  return name?.length > size ? name?.substring(0, size) + "..." : name;
};
export default truncateComponentName;
