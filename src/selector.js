var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];
  console.log("This is the Arg: ", arguments[0]);
  if(typeof arguments[0] === 'string'){
    var selector = arguments[0].slice(arguments[0].indexOf(" ")+1);
    //var selectorTypeMatch = selectorTypeMatcher(selector);
    var newMatchFunc = matchFunctionMaker(selector);
    var newStartEl = arguments[0].slice(0,arguments[0].indexOf(" "));
    console.log("here");
    traverseDomAndCollectElements(newMatchFunc, newStartEl);
  }



  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  traverse(matchFunc, startEl, resultSet);
  // traverse the DOM tree and collect matching elements in resultSet
  // use matchFunc to identify matching elements
  return resultSet;
};

function traverse(matchFunc, startEl, arr){
  if(matchFunc(startEl)){
    arr.push(startEl);
  }
  var children = startEl.children;
  if(children){
    for(var i=0;i<children.length; i++){
      traverse(matchFunc, children[i], arr);
    }
  }
}
// function breadthFirst(matchFunc, startEl){
//   var queue = [];
//   queue.push(startEl);
//   while(queue.length>0){
//     if(queue[0].children){
//       for(var i = 0; i<queue[0].children.length; i++){
//         queue.push(queue[0].children[i]);
//       }
//
//     }
//   }
// }



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
