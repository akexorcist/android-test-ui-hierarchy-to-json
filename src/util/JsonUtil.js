class JsonUtil {
  static removeFieldRecursive(obj, fieldName) {
    for (var prop in obj) {
      if (prop === fieldName) {
        delete obj[prop];
      } else if (typeof obj[prop] === "object") {
        this.removeFieldRecursive(obj[prop], fieldName);
      }
    }
    return obj;
  }

  static removeExcludedField(data, excludedFields) {
    if (!excludedFields || excludedFields.length == 0) return data;
    return excludedFields.reduce((result, key) => {
      return this.removeFieldRecursive(result, key);
    }, data);
  }

  static getAllAttributeField(data) {
    const keys = data
      .flatMap((obj) =>
        Object.keys(obj).flatMap((key) => [key, ...Object.keys(obj[key])])
      )
      .filter(
        (key) =>
          isNaN(parseInt(key)) &&
          key !== "view_type" &&
          key !== "attributes" &&
          key !== "child"
      );
    return keys.sort();
  }

  static removeValueFromArray(array, value) {
    const index = array.indexOf(value);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}

export default JsonUtil;
