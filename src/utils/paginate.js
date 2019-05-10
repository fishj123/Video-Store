import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // returns a lodash wrapper for items so we can chain commands
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}
