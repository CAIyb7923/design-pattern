/**
 * 来自《javascript设计模式与实践》
 * currying函数，这是书上的代码，版本太老
 * @param {function} fn 需要被currying化的函数
 */
var currying = function(fn) {
  var args = [];

  return function() {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);

      return arguments.callee;
    }
  }
};

/**
 * 需要currying化的函数
 */
var cost = (function() {
  var money = 0;

  return function() {
    for (var i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }

    return money;
  };
})();

var cost = currying(cost); // 转化成currying函数

// 当调用cost函数的时候带有明确的参数，表示此时不进行真正的求值计算，而是把参数保存起来
cost(100);
cost(200);
cost(300);
cost(400)(500)(700);

// 只有当以不带参数的形式调用cost函数时，才利用保存的所有参数，进行求值
console.log(cost()); // 2200

/* 改写后的代码 */
/**
 * 重写之后的currying函数
 * 去掉arguments.callee
 * @param {function} fn 需要currying化的函数
 */
function myCurrying(fn) {
  // 使用闭包保存参数
  const savedArgs = [];

  const newFunc = function(...args) {
    if (args.length === 0) {
      return fn(...savedArgs);
    }

    savedArgs.push(...args);
    return newFunc;
  }

  return newFunc;
}

/**
 * 计算多个月的开销总和
 * 用剩余参数代替arguments
 * @param  {number[]} args 每个月的开销 
 */
function myCost(...args) {
  return args.reduce((a, b) => a + b, 0);
}

const myCurryingCost = myCurrying(myCost);

myCurryingCost(100, 200)(200)(300)(400)(500)(600);

console.log(myCurryingCost()); // 2300