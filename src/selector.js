var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements



  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag

var selectorTypeMatcher = function(selector) {
  if (selector[0] === "#") {
    return 'id';
  } else if (selector[0] === ".") {
    return 'class';
  } else if (selector[0] !== "." && selector.includes(".")) {
    return 'tag.class';
  } else {
    return 'tag';
  }
};

// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(element) {
      return element.id && (element.id.toLowerCase() === selector.slice(1).toLowerCase());
    }
  } else if (selectorType === "class") {
    matchFunction = function(element) {
      let retBool = false;
      let classChildren = element.className.split(" ");
      for (child = 0; child < classChildren.length; child++) {
        if (classChildren[child].toLowerCase() === selector.slice(1).toLowerCase()) {
          retBool = true;
        }
      }
      return element.className && retBool;
    }

  } else if (selectorType === "tag.class") {
    matchFunction = function(element) {
      console.log(element.tagName.toLowerCase(), selector.toLowerCase());
      let tagBool = element.tagName && (element.tagName.toLowerCase() ===
      selector.slice(0,selector.indexOf(".")).toLowerCase());
      let classBool = false;
      let classChildren = element.className.split(" ");
      for (child = 0; child < classChildren.length; child++) {
        if (classChildren[child].toLowerCase() ===
        selector.slice(selector.indexOf(".")+1).toLowerCase()) {
          classBool = true;
        }
      }
      return element.tagName && element.className && tagBool && classBool;
    }

  } else if (selectorType === "tag") {
    matchFunction = function(element) {
      return element.tagName && (element.tagName.toLowerCase() === selector.toLowerCase());
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};

