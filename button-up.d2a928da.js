// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.umd.js":[function(require,module,exports) {
var define;
"use strict";

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
    factory(exports);
  } else {
    factory(root.commonJsStrict = {});
  }
})(typeof self !== 'undefined' ? self : void 0, function (exports) {
  exports.addBackToTop = addBackToTop; // FUNCTION START

  'use strict';

  function addBackToTop() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _params$backgroundCol = params.backgroundColor,
        backgroundColor = _params$backgroundCol === void 0 ? '#000' : _params$backgroundCol,
        _params$cornerOffset = params.cornerOffset,
        cornerOffset = _params$cornerOffset === void 0 ? 20 : _params$cornerOffset,
        _params$diameter = params.diameter,
        diameter = _params$diameter === void 0 ? 56 : _params$diameter,
        _params$ease = params.ease,
        ease = _params$ease === void 0 ? inOutSine : _params$ease,
        _params$id = params.id,
        id = _params$id === void 0 ? 'back-to-top' : _params$id,
        _params$innerHTML = params.innerHTML,
        innerHTML = _params$innerHTML === void 0 ? '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>' : _params$innerHTML,
        _params$onClickScroll = params.onClickScrollTo,
        onClickScrollTo = _params$onClickScroll === void 0 ? 0 : _params$onClickScroll,
        _params$scrollContain = params.scrollContainer,
        scrollContainer = _params$scrollContain === void 0 ? document.body : _params$scrollContain,
        _params$scrollDuratio = params.scrollDuration,
        scrollDuration = _params$scrollDuratio === void 0 ? 100 : _params$scrollDuratio,
        _params$showWhenScrol = params.showWhenScrollTopIs,
        showWhenScrollTopIs = _params$showWhenScrol === void 0 ? 1 : _params$showWhenScrol,
        _params$size = params.size,
        size = _params$size === void 0 ? diameter : _params$size,
        _params$textColor = params.textColor,
        textColor = _params$textColor === void 0 ? '#fff' : _params$textColor,
        _params$zIndex = params.zIndex,
        zIndex = _params$zIndex === void 0 ? 1 : _params$zIndex;
    var scrollContainerIsBody = scrollContainer === document.body;
    var scrollDocumentElement = scrollContainerIsBody && document.documentElement;
    appendStyles();
    var upEl = appendElement();
    var hidden = true;
    var scrollEmitter = scrollContainerIsBody ? window : scrollContainer;
    scrollEmitter.addEventListener('scroll', adapt);
    adapt();

    function adapt() {
      getScrollTop() >= showWhenScrollTopIs ? show() : hide();
    }

    function show() {
      if (!hidden) {
        return;
      }

      upEl.className = '';
      hidden = false;
    }

    function hide() {
      if (hidden) {
        return;
      }

      upEl.className = 'hidden';
      hidden = true;
    }

    function appendElement() {
      var upEl = document.createElement('div');
      upEl.id = id;
      upEl.className = 'hidden';
      upEl.innerHTML = innerHTML;
      upEl.addEventListener('click', function (event) {
        event.preventDefault();
        scrollUp();
      });
      document.body.appendChild(upEl);
      return upEl;
    }

    function appendStyles() {
      var svgSize = Math.round(0.43 * size);
      var svgTop = Math.round(0.29 * size);
      var styles = '#' + id + '{background:' + backgroundColor + ';-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;bottom:' + cornerOffset + 'px;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26);color:' + textColor + ';cursor:pointer;display:block;height:' + size + 'px;opacity:1;outline:0;position:fixed;right:' + cornerOffset + 'px;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;-webkit-transition:bottom .2s,opacity .2s;-o-transition:bottom .2s,opacity .2s;-moz-transition:bottom .2s,opacity .2s;transition:bottom .2s,opacity .2s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:' + size + 'px;z-index:' + zIndex + '}#' + id + ' svg{display:block;fill:currentColor;height:' + svgSize + 'px;margin:' + svgTop + 'px auto 0;width:' + svgSize + 'px}#' + id + '.hidden{bottom:-' + size + 'px;opacity:0}';
      var styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(styles));
      document.head.insertAdjacentElement('afterbegin', styleEl);
    }

    function scrollUp() {
      var scrollTo = typeof onClickScrollTo === 'function' ? onClickScrollTo() : onClickScrollTo;
      var _window = window,
          performance = _window.performance,
          requestAnimationFrame = _window.requestAnimationFrame;

      if (scrollDuration <= 0 || typeof performance === 'undefined' || typeof requestAnimationFrame === 'undefined') {
        return setScrollTop(scrollTo);
      }

      var start = performance.now();
      var initScrollTop = getScrollTop();
      var pxsToScrollBy = initScrollTop - scrollTo;
      requestAnimationFrame(step);

      function step(timestamp) {
        var progress = Math.min((timestamp - start) / scrollDuration, 1);
        setScrollTop(initScrollTop - Math.round(ease(progress) * pxsToScrollBy));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }
    }

    function getScrollTop() {
      return scrollContainer.scrollTop || scrollDocumentElement && document.documentElement.scrollTop || 0;
    }

    function setScrollTop(value) {
      scrollContainer.scrollTop = value;

      if (scrollDocumentElement) {
        document.documentElement.scrollTop = value;
      }
    }

    function inOutSine(n) {
      return 0.5 * (1 - Math.cos(Math.PI * n));
    }
  } // FUNCTION END

});
},{}],"js/button-up.js":[function(require,module,exports) {
"use strict";

var _vanillaBackToTop = require("vanilla-back-to-top");

(0, _vanillaBackToTop.addBackToTop)({
  backgroundColor: '#303030',
  innerHTML: '<svg viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg>',
  cornerOffset: 10,
  textColor: '#ffffff'
});
},{"vanilla-back-to-top":"../node_modules/vanilla-back-to-top/dist/vanilla-back-to-top.umd.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "8644" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/button-up.js"], null)
//# sourceMappingURL=/button-up.d2a928da.js.map