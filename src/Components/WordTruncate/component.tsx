import React from "react";
   
const truncateComponentName = (name,size) => {
  return name?.length > size? name?.substring(0,size) + '...' : name;
  };
  export default truncateComponentName;