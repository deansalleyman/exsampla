'use strict';
module.exports = function() {
  if (typeof window.CustomEvent === 'function') {
    return false;
  }

  function CustomEvent(event, params) {
    params = params || {bubbles: false, cancelable: false, detail: undefined};
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;

  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.io/#x15.4.4.19
  if (!Array.prototype.map) {
    Array.prototype.map = function(callback /*, thisArg*/) {
      var T, A, k;

      if (this == null) {
        throw new TypeError('this is null or not defined');
      }

      // 1. Let O be the result of calling ToObject passing the |this|
      //    value as the argument.
      var O = Object(this);

      // 2. Let lenValue be the result of calling the Get internal
      //    method of O with the argument "length".
      // 3. Let len be ToUint32(lenValue).
      var len = O.length >>> 0;

      // 4. If IsCallable(callback) is false, throw a TypeError exception.
      // See: http://es5.github.com/#x9.11
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
      if (arguments.length > 1) {
        T = arguments[1];
      }

      // 6. Let A be a new array created as if by the expression new Array(len)
      //    where Array is the standard built-in constructor with that name and
      //    len is the value of len.
      A = new Array(len);

      // 7. Let k be 0
      k = 0;

      // 8. Repeat, while k < len
      while (k < len) {
        var kValue, mappedValue;

        // a. Let Pk be ToString(k).
        //   This is implicit for LHS operands of the in operator
        // b. Let kPresent be the result of calling the HasProperty internal
        //    method of O with argument Pk.
        //   This step can be combined with c
        // c. If kPresent is true, then
        if (k in O) {
          // i. Let kValue be the result of calling the Get internal
          //    method of O with argument Pk.
          kValue = O[k];

          // ii. Let mappedValue be the result of calling the Call internal
          //     method of callback with T as the this value and argument
          //     list containing kValue, k, and O.
          mappedValue = callback.call(T, kValue, k, O);

          // iii. Call the DefineOwnProperty internal method of A with arguments
          // Pk, Property Descriptor
          // { Value: mappedValue,
          //   Writable: true,
          //   Enumerable: true,
          //   Configurable: true },
          // and false.

          // In browsers that support Object.defineProperty, use the following:
          // Object.defineProperty(A, k, {
          //   value: mappedValue,
          //   writable: true,
          //   enumerable: true,
          //   configurable: true
          // });

          // For best browser support, use the following:
          A[k] = mappedValue;
        }
        // d. Increase k by 1.
        k++;
      }

      // 9. return A
      return A;
    };
  }

  /*
   * classList.js MOD by aMarCruz
   * 2015-05-07
   * Supports IE9+ and modern browsers.
   *
   * classList.js: Cross-browser full element.classList implementation.
   * 1.1.20150312
   *
   * By Eli Grey, http://eligrey.com
   * License: Dedicated to the public domain.
   *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
   */

  /*global self, document, DOMException */

  /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

  if ('classList' in document.createElement('_')) {
    // There is full or partial native classList support, so just check
    // if we need to normalize the add/remove and toggle APIs.

    !(function() {
      'use strict';

      var c1 = 'c1';
      var c2 = 'c2';
      var testElement = document.createElement('_');

      // Polyfill for IE 10/11 and Firefox <26, where classList.add and
      // classList.remove exist but support only one argument at a time.

      testElement.classList.add(c1, c2);

      if (!testElement.classList.contains(c2)) {
        var createMethod = function(method) {
          var _method = DOMTokenList.prototype[method];

          DOMTokenList.prototype[method] = function(token) {
            for (var i = -1, len = arguments.length; ++i < len; ) {
              token = arguments[i];
              _method.call(this, token);
            }
          };
        };
        createMethod('add');
        createMethod('remove');
      }

      // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
      // support the second argument.

      testElement.classList.toggle(c1, true);

      if (!testElement.classList.contains(c1)) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
          if (1 in arguments && !this.contains(token) === !force) {
            return force;
          }
          return _toggle.call(this, token);
        };
      }

      testElement = null;
    })();
  } else {
    //-------------------------------------------------------------------
    // Full polyfill for browsers with no classList support
    //-------------------------------------------------------------------

    'Element' in view &&
      (function(view) {
        'use strict';

        var proto = 'prototype';
        var arrIndexOf = Array[proto].indexOf;

        // Vendors: please allow content code to instantiate DOMExceptions
        var DOMEx = function(type, message) {
          this.name = type;
          this.code = DOMException[type];
          this.message = message;
        };

        // Most DOMException implementations don't allow calling DOMException's toString()
        // on non-DOMExceptions. Error's toString() is sufficient here.
        DOMEx[proto] = Error[proto];

        var checkTokenAndGetIndex = function(classList, token) {
          if (token === '') {
            throw new DOMEx(
              'SYNTAX_ERR',
              'An invalid or illegal string was specified'
            );
          }
          if (/\s/.test(token)) {
            throw new DOMEx(
              'INVALID_CHARACTER_ERR',
              'String contains an invalid character'
            );
          }
          return arrIndexOf.call(classList, token);
        };

        //-- The ClassList "class"

        var ClassList = function(elem) {
          var classes = (elem.getAttribute('class') || '').trim();
          if (classes) {
            var classlist = classes.split(/\s+/);
            for (var i = -1, len = classlist.length; ++i < len; ) {
              this.push(classlist[i]);
            }
          }

          // privileged method, called from public methods of classList
          this._updateClassName = function() {
            elem.setAttribute('class', this.toString());
          };
        };

        // ClassList inherit from Array
        var classListPrototype = (ClassList[proto] = []);

        //-- Element.classList[i]: string || null

        classListPrototype.item = function(i) {
          return this[i] || null;
        };

        //-- Element.classList.add(...)
        // Adds a class to an element's list of classes.
        // If class already exists in the element's list of classes,
        // it will not add the class again.

        classListPrototype.add = function() {
          var tokens = arguments;
          var updated = false;

          for (var i = -1, len = tokens.length; ++i < len; ) {
            var token = tokens[i] + '';
            if (checkTokenAndGetIndex(this, token) === -1) {
              this.push(token);
              updated = true;
            }
          }
          if (updated) {
            this._updateClassName();
          }
        };

        //-- Element.classList.remove(...)
        // Removes a class from an element's list of classes.
        // If class does not exist in the element's list of classes,
        // it will not throw an error or exception.

        classListPrototype.remove = function() {
          var tokens = arguments;
          var updated = false;
          var index;

          for (var i = -1, len = tokens.length; ++i < len; ) {
            var token = tokens[i] + '';
            while ((index = checkTokenAndGetIndex(this, token)) !== -1) {
              this.splice(index, 1);
              updated = true;
            }
          }
          if (updated) {
            this._updateClassName();
          }
        };

        //-- Element.classList.toogle(... [, force])
        // Toggles the existence of a class in an element's list of classes
        // force: will force the class name to be added or removed based on the truthiness
        // of 'force'.
        // For example, to remove a class (if it exists or not) you can call
        // element.classList.toggle('classToBeRemoved', false);
        // and to add a class (if it exists or not) you can call
        // element.classList.toggle('classToBeAdded', true);

        classListPrototype.toggle = function(token, force) {
          token += ''; // ensure that is string

          if (this.contains(token)) {
            return force === true || (this.remove(token), false);
          }
          return force === false ? false : (this.add(token), true);
        };

        //-- Element.classList.toString()

        classListPrototype.toString = function() {
          return this.join(' ');
        };

        //-- Element.classList.contains(token): boolean
        // Checks if an element's list of classes contains a specific class.

        classListPrototype.contains = function(token) {
          return checkTokenAndGetIndex(this, token + '') !== -1;
        };

        // Element.classList Getter

        var classListGetter = function() {
          return new ClassList(this);
        };

        Object.defineProperty(view.Element[proto], 'classList', {
          get: classListGetter,
          enumerable: true,
          configurable: true
        });
      })(self); // if ('Element' in view) && (function(v){..})(v)
  }

  /**
   * User Timing polyfill (http://www.w3.org/TR/user-timing/)
   * @author RubaXa <trash@rubaxa.org>
   */
  (function(e) {
    var n = Date.now ? Date.now() : +new Date(),
      r = e.performance || {},
      t = [],
      a = {},
      i = function(e, n) {
        for (var r = 0, a = t.length, i = []; r < a; r++) {
          t[r][e] == n && i.push(t[r]);
        }
        return i
      },
      o = function(e, n) {
        for (var r, a = t.length; a--; ) {
          (r = t[a]),
            r.entryType != e || (void 0 !== n && r.name != n) || t.splice(a, 1);
        }
      };
    r.now ||
      (r.now =
        r.webkitNow ||
        r.mozNow ||
        r.msNow ||
        function() {
          return (Date.now ? Date.now() : +new Date()) - n
        }),
      r.mark ||
        (r.mark =
          r.webkitMark ||
          function(e) {
            var n = {
              name: e,
              entryType: 'mark',
              startTime: r.now(),
              duration: 0
            };
            t.push(n), (a[e] = n);
          }),
      r.measure ||
        (r.measure =
          r.webkitMeasure ||
          function(e, n, r) {
            (n = a[n].startTime),
              (r = a[r].startTime),
              t.push({
                name: e,
                entryType: 'measure',
                startTime: n,
                duration: r - n
              })
          }),
      r.getEntriesByType ||
        (r.getEntriesByType =
          r.webkitGetEntriesByType ||
          function(e) {
            return i('entryType', e)
          }),
      r.getEntriesByName ||
        (r.getEntriesByName =
          r.webkitGetEntriesByName ||
          function(e) {
            return i('name', e)
          }),
      r.clearMarks ||
        (r.clearMarks =
          r.webkitClearMarks ||
          function(e) {
            o('mark', e)
          }),
      r.clearMeasures ||
        (r.clearMeasures =
          r.webkitClearMeasures ||
          function(e) {
            o('measure', e)
          }),
      (e.performance = r),
      typeof define === 'function' &&
        (define.amd || define.ajs) &&
        define('performance', [], function() {
          return r
        })
  })(window);
};
