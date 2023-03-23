---
title: "JavaScript发布订阅模式"
date: 2021-04-06T10:03:32+08:00
keywords: ''
description: ''
tags: ['javascript']
categories: []
draft: true
---

发布订阅模式，定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在JS中，我们一般用事件模型来替代传统的发布-订阅模式。

## 1. 现实中的发布-订阅模式

购房者与售楼处；

购房者：订阅者；
售楼处：发布者；

## 2. 发布-订阅模式的作用

发布-订阅模式优点：

a. 发布-订阅模式可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。在异步编程中，使用发布-订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴趣的事件发生点。

b. 发布-订阅模式可以取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。让两个对象松耦合地联系在一起，虽然不太清楚彼此的细节，但这不影响它们之间相互通信。

## 3. DOM事件

```javascript
//订阅body的click事件
document.body.addEventListener('click',function(){ console.log(2) }, false);
document.body.addEventListener('click',function(){ console.log(3) }, false);
document.body.addEventListener('click',function(){ console.log(4) }, false);
document.body.click(); //模拟用户点击 
```

注意，手动触发事件更好的做法是 IE 下用 fireEvent，标准浏览器下用 dispatchEvent 实现。

## 4. 自定义事件

```javascript
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = []; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (fn) {
  // 增加订阅者
  this.clientList.push(fn); // 订阅的消息添加进缓存列表
};
salesOffices.trigger = function () {
  // 发布消息
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments); // (2) // arguments 是发布消息时带上的参数
  }
};

//下面我们来进行一些简单的测试：
salesOffices.listen(function (price, squareMeter) {
  // 小明订阅消息
  console.log("价格= " + price);
  console.log("squareMeter= " + squareMeter);
});
salesOffices.listen(function (price, squareMeter) {
  // 小红订阅消息
  console.log("价格= " + price);
  console.log("squareMeter= " + squareMeter);
});
salesOffices.trigger(2000000, 88); // 输出： 200 万， 88 平方米
salesOffices.trigger(3000000, 110); // 输出： 300 万， 110 平方米
```

至此，我们已经实现了一个最简单的发布—订阅模式，但这里还存在一些问题。我们看到订阅者接收到了发布者发布的每个消息，虽然小明只想买 88 平方米的房子，但是发布者把 110 平方米的信息也推送给了小明，这对小明来说是不必要的困扰。所以我们有必要增加一个标示 key，让订阅者只订阅自己感兴趣的消息。

```javascript
var salesOffices = {}; // 定义售楼处
salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数
salesOffices.listen = function (key, fn) {
  if (!this.clientList[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn); // 订阅的消息添加进消息缓存列表
};
salesOffices.trigger = function () {
  // 发布消息
  var key = Array.prototype.shift.call(arguments),
    // 取出消息类型
    fns = this.clientList[key]; // 取出该消息对应的回调函数集合
  if (!fns || fns.length === 0) {
    // 如果没有订阅该消息，则返回
    return false;
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments); // (2) // arguments 是发布消息时附送的参数
  }
};

salesOffices.listen("squareMeter88", function (price) {
  // 小明订阅 88 平方米房子的消息
  console.log("价格= " + price); // 输出： 2000000
});
salesOffices.listen("squareMeter110", function (price) {
  // 小红订阅 110 平方米房子的消息
  console.log("价格= " + price); // 输出： 3000000
});
salesOffices.trigger("squareMeter88", 2000000); // 发布 88 平方米房子的价格
salesOffices.trigger("squareMeter110", 3000000); // 发布 110 平方米房子的价格
```

## 5. 发布-订阅模式的通用实现

```javascript
var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); // 订阅的消息添加进缓存列表
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments), // (1);
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      // 如果没有绑定对应的消息
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments); // (2) // arguments 是 trigger 时带上的参数
    }
  },
};

//再定义一个installEvent函数，这个函数可以给所有的对象都动态安装发布—订阅功能：
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

//再来测试一番，我们给售楼处对象 salesOffices 动态增加发布—订阅功能：
var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen("squareMeter88", function (price) {
  // 小明订阅消息
  console.log("价格= " + price);
});
salesOffices.listen("squareMeter100", function (price) {
  // 小红订阅消息
  console.log("价格= " + price);
});

salesOffices.trigger("squareMeter88", 2000000); // 输出： 2000000
salesOffices.trigger("squareMeter100", 3000000); // 输出： 3000000
```

## 6. 取消订阅的事件

```javascript
event.remove = function (key, fn) {
  var fns = this.clientList[key];
  if (!fns) {
    // 如果 key 对应的消息没有被人订阅，则直接返回
    return false;
  }
  if (!fn) {
    // 如果没有传入具体的回调函数，表示需要取消 key 对应消息的所有订阅
    fns && (fns.length = 0);
  } else {
    for (var l = fns.length - 1; l >= 0; l--) {
      // 反向遍历订阅的回调函数列表
      var _fn = fns[l];
      if (_fn === fn) {
        fns.splice(l, 1); // 删除订阅者的回调函数
      }
    }
  }
};
var salesOffices = {};
var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};
installEvent(salesOffices);
salesOffices.listen(
  "squareMeter88",
  (fn1 = function (price) {
    // 小明订阅消息
    console.log("价格= " + price);
  })
);
salesOffices.listen(
  "squareMeter88",
  (fn2 = function (price) {
    // 小红订阅消息
    console.log("价格= " + price);
  })
);
salesOffices.remove("squareMeter88", fn1); // 删除小明的订阅
salesOffices.trigger("squareMeter88", 2000000); // 输出： 2000000
```

## 7. 真实例子--网站登录

假如我们正在开发一个商城网站，网站里有 header 头部、 nav 导航、消息列表、购物车等模块。这几个模块的渲染有一个共同的前提条件，就是必须先用 ajax 异步请求获取用户的登录信息。这是很正常的，比如用户的名字和头像要显示在 header 模块里，而这两个字段都来自用户登录后返回的信息。

```javascript
login.succ(function (data) {
  header.setAvatar(data.avatar); // 设置 header 模块的头像
  nav.setAvatar(data.avatar); // 设置导航模块的头像
  message.refresh(); // 刷新消息列表
  cart.refresh(); // 刷新购物车列表
});
```

当登录成功时，登录模块只需要发布登录成功的消息，而业务方接受到消息之后，就会开始进行各自的业务处理，登录模块并不关心业务方究竟要做什么，也不想去了解它们的内部细节。

```javascript
$.ajax("http:// xxx.com?login", function (data) {
  // 登录成功
  login.trigger("loginSucc", data); // 发布登录成功的消息
});

// 各模块监听登录成功的消息：
var header = (function () {
  // header 模块
  login.listen("loginSucc", function (data) {
    header.setAvatar(data.avatar);
  });
  return {
    setAvatar: function (data) {
      console.log("设置 header 模块的头像");
    },
  };
})();
var nav = (function () {
  // nav 模块
  login.listen("loginSucc", function (data) {
    nav.setAvatar(data.avatar);
  });
  return {
    setAvatar: function (avatar) {
      console.log("设置 nav 模块的头像");
    },
  };
})();

//如果有一天在登录完成之后，又增加一个刷新收货地址列表的行为，那么只要在收货地址模块里加上监听消息的方法即可，而这可以让开发该模块的同事自己完成，你作为登录模块的开发者，永远不用再关心这些行为了。
var address = (function () {
  // address 模块
  login.listen("loginSucc", function (obj) {
    address.refresh(obj);
  });
  return {
    refresh: function (avatar) {
      console.log("刷新收货地址列表");
    },
  };
})();
```

## 8. 全局的发布-订阅对象

发布—订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者， Event 作为一个类似“中介者”的角色，把订阅者和发布者联系起来。

```javascript
var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;

  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };

  trigger = function () {
    var key = Array.prototype.shift.call(arguments);
    var fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; (fn = fns[i++]); ) {
      fn.apply(this, arguments);
    }
  };

  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };

  return {
    listen: listen,
    trigger: trigger,
    remove: remove,
  };
})();

Event.listen("squareMeter88", function (price) {
  // 小红订阅消息
  console.log("价格= " + price); // 输出： '价格=2000000'
});
Event.trigger("squareMeter88", 2000000); // 售楼处发布消息
```

## 9. 模块间通信

比如现在有两个模块， a 模块里面有一个按钮，每次点击按钮之后， b 模块里的 div 中会显示
按钮的总点击次数，我们用全局发布—订阅模式完成下面的代码，使得 a 模块和 b 模块可以在保
持封装性的前提下进行通信。

```html
<!DOCTYPE html>
<html>
  <body>
    <button id="count">点我</button>
    <div id="show"></div>
  </body>
  <script type="text/JavaScript">
    var a = (function(){
        var count = 0;
        var button = document.getElementById( 'count' );
        button.onclick = function(){
            Event.trigger( 'add', count++ );
        }
    })();
    var b = (function(){
        var div = document.getElementById( 'show' );
        Event.listen( 'add', function( count ){
            div.innerHTML = count;
        });
    })();
  </script>
</html>
```

## 10. 必须先订阅再发布吗

我们所了解到的发布—订阅模式，都是订阅者必须先订阅一个消息，随后才能接收到发布者
发布的消息。如果把顺序反过来，发布者先发布一条消息，而在此之前并没有对象来订阅它，这
条消息无疑将消失在宇宙中。

在某些情况下，我们需要先将这条消息保存下来，等到有对象来订阅它的时候，再重新把消
息发布给订阅者。就如同 QQ 中的离线消息一样，离线消息被保存在服务器中，接收人下次登录
上线之后，可以重新收到这条消息。

为了满足这个需求，我们要建立一个存放离线事件的堆栈，当事件发布的时候，如果此时还
没有订阅者来订阅这个事件，我们暂时把发布事件的动作包裹在一个函数里，这些包装函数将被
存入堆栈中，等到终于有对象来订阅此事件的时候，我们将遍历堆栈并且依次执行这些包装函数，
也就是重新发布里面的事件。当然离线事件的生命周期只有一次，就像 QQ 的未读消息只会被重
新阅读一次，所以刚才的操作我们只能进行一次。

## 11. 全局事件的全名冲突

全局的发布-订阅对象里只有一个clientList来存放消息名和回调函数，大家都通过它来订
阅和发布各种消息，久而久之，难免会出现事件名冲突的情况，所以我们还可以给 Event 对象提
供创建命名空间的功能。

```javascript
/************** 先发布后订阅 ********************/
Event.trigger("click", 1);
Event.listen("click", function (a) {
  console.log(a); // 输出： 1
});
/************** 使用命名空间 ********************/
Event.create("namespace1").listen("click", function (a) {
  console.log(a); // 输出： 1
});
Event.create("namespace1").trigger("click", 1);
Event.create("namespace2").listen("click", function (a) {
  console.log(a); // 输出： 2
});
Event.create("namespace2").trigger("click", 2);
```

```javascript
var Event = (function () {
  var global = this,
    Event,
    _default = "default";

  Event = (function () {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function (ary, fn) {
        var ret;
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };
    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key][i] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    _trigger = function () {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key];
      if (!stack || !stack.length) {
        return;
      }
      return each(stack, function () {
        return this.apply(_self, args);
      });
    };
    _create = function (namespace) {
      var namespace = namespace || _default;
      var cache = {},
        offlineStack = [],
        // 离线事件
        ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache);
            if (offlineStack === null) {
              return;
            }
            if (last === "last") {
              offlineStack.length && offlineStack.pop()();
            } else {
              each(offlineStack, function () {
                this();
              });
            }
            offlineStack = null;
          },
          one: function (key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          remove: function (key, fn) {
            _remove(key, cache, fn);
          },

          trigger: function () {
            var fn,
              args,
              _self = this;
            _unshift.call(arguments, cache);
            args = arguments;
            fn = function () {
              return _trigger.apply(_self, args);
            };
            if (offlineStack) {
              return offlineStack.push(fn);
            }
            return fn();
          },
        };
      return namespace
        ? namespaceCache[namespace]
          ? namespaceCache[namespace]
          : (namespaceCache[namespace] = ret)
        : ret;
    };
    return {
      create: _create,
      one: function (key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function (key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function () {
        var event = this.create();
        event.trigger.apply(this, arguments);
      },
    };
  })();
  return Event;
})();
```

## 12. JS实现发布-订阅模式的便利性

在JS中，我们用注册回调函数的形式来代替传统的发布-订阅模式，显得更加优雅和简单。

在JS中，我们无需去选择使用推模型还是拉模型。

- 推模型是指在事件发生时，发布者一次性把所有更改的状态和数据都推送给订阅者。
- 拉模型是，发布者仅仅通知订阅者事件已经发生了，此外发布者要提供一些公共的接口供订阅者来主动拉取数据。拉模型的好处是可以让订阅者“按需获取”，但同时有可能让发布者变成一个“门户大开”的对象，同时增加了代码量和复杂度。

在JS中，arguments可以很方便地表示参数列表，所以我们一般会选择推模型，使用Function.prototype.apply方法把所有参数都推送给订阅者。

## 13. 小结：

优点：一为时间上的解耦，二为对象之间的解耦。   

缺点：创建订阅者本身要消耗一定的时间和内存，而且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外，发布-订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解。

## Source

JavaScript设计模式与开发实践：第8章 发布-订阅模式