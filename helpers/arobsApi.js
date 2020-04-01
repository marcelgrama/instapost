import _ from 'lodash';

export const mapArobsUserData = arobsUserData => {
  let userData = _.pick(arobsUserData, [
    'photo',
    'positionName',
    'departmentName',
    'skypeAddress',
    'personalPhone',
    'companyId',
    'locationName',
    'subsidiaryName',
    'employeeId',
    'firstName',
    'lastName',
    'emailAddress'
  ]);
  const { firstName, lastName, ...restUserData } = userData;
  return {
    name: {
      first: firstName,
      last: lastName
    },
    ...restUserData
  };
};
