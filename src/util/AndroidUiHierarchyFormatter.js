import JsonUtil from "./JsonUtil";

class AndroidUiHierarchyFormatter {
  static format(input) {
    if (input === "") return [];
    const filteredInput = input
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "" && line !== "|");
    const hierachyOutput = this.parseViewHierarchy(filteredInput);
    return JsonUtil.removeFieldRecursive(hierachyOutput, "level");
  }

  static parseAttributes(input) {
    const match = /(\w+)(\{.+\})/.exec(input);
    if (match) {
      const viewType = match[1];
      const attributes = match[2]
        .slice(1, -1)
        .split(", ")
        .reduce((json, attribute) => {
          if (attribute.startsWith("layout-params")) {
            const [key] = attribute.match(/^[^=]+(?==)/);
            const actualKey = key.replaceAll("-", "_");
            const value = key ? attribute.slice(key.length + 1) : null;
            json[actualKey] = value;
          } else if (attribute.startsWith("child-count")) {
          } else {
            const [key, value] = attribute.split("=", 2);
            const actualKey = key.replaceAll("-", "_");
            if (value.startsWith("0x")) {
              json[actualKey] = value;
            } else if (value === "true" || value === "false") {
              json[actualKey] = Boolean(value);
            } else if (!isNaN(value)) {
              json[actualKey] = Number(value);
            } else if (value === "null") {
              json[actualKey] = null;
            } else {
              json[actualKey] = value;
            }
          }
          return json;
        }, {});
      return {
        view_type: viewType,
        attributes,
      };
    } else {
      return null;
    }
  }

  static parseViewHierarchy(input) {
    const nestedAttribute = input
      .map((rawAttribute, index) => {
        const levelMatch = rawAttribute.match(/^\+(-*)>/);
        const keyMatch = rawAttribute.match(/(.*)/);
        const key = keyMatch ? keyMatch[1].trim() : null;
        const level = levelMatch && levelMatch[1] ? levelMatch[1].length : 0;
        return {
          ...this.parseAttributes(key),
          level: level,
          child: [],
        };
      })
      .reduce((components, component) => {
        return this.pushComponentRecursive(components, component);
      }, []);
    return nestedAttribute;
  }

  static pushComponentRecursive(components, component) {
    if (component.level === 0) {
      // console.log(component.view_type, "is root component");
      components.push(component);
      return components;
    }
    for (let i = components.length - 1; i >= 0; i--) {
      const lastComponent = components[i];
      if (
        Array.isArray(lastComponent.child) &&
        lastComponent.child.length > 0
      ) {
        const result = this.pushComponentRecursive(
          lastComponent.child,
          component
        );
        if (result === null) {
          // console.log(
          //   component.view_type,
          //   "is child of",
          //   lastComponent.view_type
          // );
          lastComponent.child.push(component);
          return components;
        } else {
          return components;
        }
      } else if (component.level - lastComponent.level === 1) {
        // console.log(
        //   component.view_type,
        //   "is child of",
        //   lastComponent.view_type
        // );
        lastComponent.child.push(component);
        return components;
      } else {
        return null;
      }
    }
  }
}

export default AndroidUiHierarchyFormatter;
