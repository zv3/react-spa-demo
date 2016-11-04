export const changeLocation = (location) => {
  return {
    type: 'LOCATION_CHANGE',
    location
  };
};

export const viewBoxDetails = (process: string) => {
  return {
    type: 'VIEW_DETAILS',
    process
  };
};
