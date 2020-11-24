import {
  compose,
  values,
  mapObjIndexed,
  reduce,
  assocPath,
  path,
  set,
  lensPath,
  keys,
  forEach,
  mergeAll,
} from "ramda";

export const mapObjectToValues = mapper => {
  return compose(
    values,
    mapObjIndexed(mapper)
  )
}

export const converter = data => {
  let configArray = [];

  const res = reduce((acc, curr) => {
    let addressPath = [curr.group];

    const current = mergeAll([curr]);

    addressPath.push(current.text);

    path(addressPath, acc)
      ? set(lensPath(addressPath), current, acc)
      : (acc = assocPath(addressPath, current, acc));
    return acc;
  }, {})(data);

  const addNode = (node) =>
    configArray.push({
      [node]: res[node],
    });
  forEach(addNode, keys(res));

  return mergeAll(configArray);
}
