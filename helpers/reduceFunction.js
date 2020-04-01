export const circleDataSetMaper = notMapedObj => {
  const newObj = notMapedObj.reduce((acc, el) => {
    acc.push(el.circle[0]);
    return acc;
}, []);
  return newObj;
};
