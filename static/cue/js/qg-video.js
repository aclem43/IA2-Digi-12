/*
 * Flash Player Version Detection - Rev 1.5
 * Detect Client Browser type
 * Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
 */
var isIE = navigator.appVersion.indexOf("MSIE") != -1 ? true : false;
var isWin =
  navigator.appVersion.toLowerCase().indexOf("win") != -1 ? true : false;
var isOpera = navigator.userAgent.indexOf("Opera") != -1 ? true : false;
function ControlVersion() {
  var a;
  var b;
  var c;
  try {
    b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
    a = b.GetVariable("$version");
  } catch (c) {}
  if (!a) {
    try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
      a = "WIN 6,0,21,0";
      b.AllowScriptAccess = "always";
      a = b.GetVariable("$version");
    } catch (c) {}
  }
  if (!a) {
    try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
      a = b.GetVariable("$version");
    } catch (c) {}
  }
  if (!a) {
    try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
      a = "WIN 3,0,18,0";
    } catch (c) {}
  }
  if (!a) {
    try {
      b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      a = "WIN 2,0,0,11";
    } catch (c) {
      a = -1;
    }
  }
  return a;
}
function GetSwfVer() {
  var g = -1;
  if (navigator.plugins != null && navigator.plugins.length > 0) {
    if (
      navigator.plugins["Shockwave Flash 2.0"] ||
      navigator.plugins["Shockwave Flash"]
    ) {
      var f = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
      var a = navigator.plugins["Shockwave Flash" + f].description;
      var e = a.split(" ");
      var c = e[2].split(".");
      var h = c[0];
      var b = c[1];
      if (e[3] != "") {
        tempArrayMinor = e[3].split("r");
      } else {
        tempArrayMinor = e[4].split("r");
      }
      var d = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
      var g = h + "." + b + "." + d;
    }
  } else {
    if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
      g = 4;
    } else {
      if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
        g = 3;
      } else {
        if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
          g = 2;
        } else {
          if (isIE && isWin && !isOpera) {
            g = ControlVersion();
          }
        }
      }
    }
  }
  return g;
}
function DetectFlashVer(f, d, c) {
  versionStr = GetSwfVer();
  if (versionStr == -1) {
    return false;
  } else {
    if (versionStr != 0) {
      if (isIE && isWin && !isOpera) {
        tempArray = versionStr.split(" ");
        tempString = tempArray[1];
        versionArray = tempString.split(",");
      } else {
        versionArray = versionStr.split(".");
      }
      var e = versionArray[0];
      var a = versionArray[1];
      var b = versionArray[2];
      if (e > parseFloat(f)) {
        return true;
      } else {
        if (e == parseFloat(f)) {
          if (a > parseFloat(d)) {
            return true;
          } else {
            if (a == parseFloat(d)) {
              if (b >= parseFloat(c)) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }
  }
}
/*
 * jQuery UI 1.8.2
 *
 * Copyright (c) 2023 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */
(function (a) {
  a.ui = a.ui || {};
  if (a.ui.version) {
    return;
  }
  a.extend(a.ui, {
    version: "1.8.2",
    plugin: {
      add: function (c, d, f) {
        var e = a.ui[c].prototype;
        for (var b in f) {
          e.plugins[b] = e.plugins[b] || [];
          e.plugins[b].push([d, f[b]]);
        }
      },
      call: function (b, d, c) {
        var f = b.plugins[d];
        if (!f || !b.element[0].parentNode) {
          return;
        }
        for (var e = 0; e < f.length; e++) {
          if (b.options[f[e][0]]) {
            f[e][1].apply(b.element, c);
          }
        }
      },
    },
    contains: function (d, c) {
      return document.compareDocumentPosition
        ? d.compareDocumentPosition(c) & 16
        : d !== c && d.contains(c);
    },
    hasScroll: function (e, c) {
      if (a(e).css("overflow") == "hidden") {
        return false;
      }
      var b = c && c == "left" ? "scrollLeft" : "scrollTop",
        d = false;
      if (e[b] > 0) {
        return true;
      }
      e[b] = 1;
      d = e[b] > 0;
      e[b] = 0;
      return d;
    },
    isOverAxis: function (c, b, d) {
      return c > b && c < b + d;
    },
    isOver: function (g, c, f, e, b, d) {
      return a.ui.isOverAxis(g, f, b) && a.ui.isOverAxis(c, e, d);
    },
    keyCode: {
      ALT: 18,
      BACKSPACE: 8,
      CAPS_LOCK: 20,
      COMMA: 188,
      COMMAND: 91,
      COMMAND_LEFT: 91,
      COMMAND_RIGHT: 93,
      CONTROL: 17,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      INSERT: 45,
      LEFT: 37,
      MENU: 93,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SHIFT: 16,
      SPACE: 32,
      TAB: 9,
      UP: 38,
      WINDOWS: 91,
    },
  });
  a.fn.extend({
    _focus: a.fn.focus,
    focus: function (b, c) {
      return typeof b === "number"
        ? this.each(function () {
            var d = this;
            setTimeout(function () {
              a(d).focus();
              c && c.call(d);
            }, b);
          })
        : this._focus.apply(this, arguments);
    },
    enableSelection: function () {
      return this.attr("unselectable", "off").css("MozUserSelect", "");
    },
    disableSelection: function () {
      return this.attr("unselectable", "on").css("MozUserSelect", "none");
    },
    scrollParent: function () {
      var b;
      if (
        (a.browser.msie && /(static|relative)/.test(this.css("position"))) ||
        /absolute/.test(this.css("position"))
      ) {
        b = this.parents()
          .filter(function () {
            return (
              /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) &&
              /(auto|scroll)/.test(
                a.curCSS(this, "overflow", 1) +
                  a.curCSS(this, "overflow-y", 1) +
                  a.curCSS(this, "overflow-x", 1)
              )
            );
          })
          .eq(0);
      } else {
        b = this.parents()
          .filter(function () {
            return /(auto|scroll)/.test(
              a.curCSS(this, "overflow", 1) +
                a.curCSS(this, "overflow-y", 1) +
                a.curCSS(this, "overflow-x", 1)
            );
          })
          .eq(0);
      }
      return /fixed/.test(this.css("position")) || !b.length ? a(document) : b;
    },
    zIndex: function (e) {
      if (e !== undefined) {
        return this.css("zIndex", e);
      }
      if (this.length) {
        var c = a(this[0]),
          b,
          d;
        while (c.length && c[0] !== document) {
          b = c.css("position");
          if (b == "absolute" || b == "relative" || b == "fixed") {
            d = parseInt(c.css("zIndex"));
            if (!isNaN(d) && d != 0) {
              return d;
            }
          }
          c = c.parent();
        }
      }
      return 0;
    },
  });
  a.extend(a.expr[":"], {
    data: function (d, c, b) {
      return !!a.data(d, b[3]);
    },
    focusable: function (c) {
      var d = c.nodeName.toLowerCase(),
        b = a.attr(c, "tabindex");
      return (
        (/input|select|textarea|button|object/.test(d)
          ? !c.disabled
          : "a" == d || "area" == d
          ? c.href || !isNaN(b)
          : !isNaN(b)) &&
        !a(c)["area" == d ? "parents" : "closest"](":hidden").length
      );
    },
    tabbable: function (c) {
      var b = a.attr(c, "tabindex");
      return (isNaN(b) || b >= 0) && a(c).is(":focusable");
    },
  });
})(jQuery);
/*
 * jQuery UI Widget 1.8.2
 *
 * Copyright (c) 2023 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function (b) {
  var a = b.fn.remove;
  b.fn.remove = function (c, d) {
    return this.each(function () {
      if (!d) {
        if (!c || b.filter(c, [this]).length) {
          b("*", this)
            .add(this)
            .each(function () {
              b(this).triggerHandler("remove");
            });
        }
      }
      return a.call(b(this), c, d);
    });
  };
  b.widget = function (d, f, c) {
    var e = d.split(".")[0],
      h;
    d = d.split(".")[1];
    h = e + "-" + d;
    if (!c) {
      c = f;
      f = b.Widget;
    }
    b.expr[":"][h] = function (i) {
      return !!b.data(i, d);
    };
    b[e] = b[e] || {};
    b[e][d] = function (i, j) {
      if (arguments.length) {
        this._createWidget(i, j);
      }
    };
    var g = new f();
    g.options = b.extend({}, g.options);
    b[e][d].prototype = b.extend(
      true,
      g,
      {
        namespace: e,
        widgetName: d,
        widgetEventPrefix: b[e][d].prototype.widgetEventPrefix || d,
        widgetBaseClass: h,
      },
      c
    );
    b.widget.bridge(d, b[e][d]);
  };
  b.widget.bridge = function (d, c) {
    b.fn[d] = function (g) {
      var e = typeof g === "string",
        f = Array.prototype.slice.call(arguments, 1),
        h = this;
      g = !e && f.length ? b.extend.apply(null, [true, g].concat(f)) : g;
      if (e && g.substring(0, 1) === "_") {
        return h;
      }
      if (e) {
        this.each(function () {
          var i = b.data(this, d),
            j = i && b.isFunction(i[g]) ? i[g].apply(i, f) : i;
          if (j !== i && j !== undefined) {
            h = j;
            return false;
          }
        });
      } else {
        this.each(function () {
          var i = b.data(this, d);
          if (i) {
            if (g) {
              i.option(g);
            }
            i._init();
          } else {
            b.data(this, d, new c(g, this));
          }
        });
      }
      return h;
    };
  };
  b.Widget = function (c, d) {
    if (arguments.length) {
      this._createWidget(c, d);
    }
  };
  b.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    options: { disabled: false },
    _createWidget: function (d, e) {
      this.element = b(e).data(this.widgetName, this);
      this.options = b.extend(
        true,
        {},
        this.options,
        b.metadata && b.metadata.get(e)[this.widgetName],
        d
      );
      var c = this;
      this.element.bind("remove." + this.widgetName, function () {
        c.destroy();
      });
      this._create();
      this._init();
    },
    _create: function () {},
    _init: function () {},
    destroy: function () {
      this.element.unbind("." + this.widgetName).removeData(this.widgetName);
      this.widget()
        .unbind("." + this.widgetName)
        .removeAttr("aria-disabled")
        .removeClass(this.widgetBaseClass + "-disabled ui-state-disabled");
    },
    widget: function () {
      return this.element;
    },
    option: function (e, f) {
      var d = e,
        c = this;
      if (arguments.length === 0) {
        return b.extend({}, c.options);
      }
      if (typeof e === "string") {
        if (f === undefined) {
          return this.options[e];
        }
        d = {};
        d[e] = f;
      }
      b.each(d, function (g, h) {
        c._setOption(g, h);
      });
      return c;
    },
    _setOption: function (c, d) {
      this.options[c] = d;
      if (c === "disabled") {
        this.widget()
          [d ? "addClass" : "removeClass"](
            this.widgetBaseClass + "-disabled ui-state-disabled"
          )
          .attr("aria-disabled", d);
      }
      return this;
    },
    enable: function () {
      return this._setOption("disabled", false);
    },
    disable: function () {
      return this._setOption("disabled", true);
    },
    _trigger: function (d, e, f) {
      var h = this.options[d];
      e = b.Event(e);
      e.type = (
        d === this.widgetEventPrefix ? d : this.widgetEventPrefix + d
      ).toLowerCase();
      f = f || {};
      if (e.originalEvent) {
        for (var c = b.event.props.length, g; c; ) {
          g = b.event.props[--c];
          e[g] = e.originalEvent[g];
        }
      }
      this.element.trigger(e, f);
      return !(
        (b.isFunction(h) && h.call(this.element[0], e, f) === false) ||
        e.isDefaultPrevented()
      );
    },
  };
})(jQuery);
/*
 * jQuery UI Mouse 1.8.2
 *
 * Copyright (c) 2023 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function (a) {
  a.widget("ui.mouse", {
    options: { cancel: ":input,option", distance: 1, delay: 0 },
    _mouseInit: function () {
      var b = this;
      this.element
        .bind("mousedown." + this.widgetName, function (c) {
          return b._mouseDown(c);
        })
        .bind("click." + this.widgetName, function (c) {
          if (b._preventClickEvent) {
            b._preventClickEvent = false;
            c.stopImmediatePropagation();
            return false;
          }
        });
      this.started = false;
    },
    _mouseDestroy: function () {
      this.element.unbind("." + this.widgetName);
    },
    _mouseDown: function (d) {
      d.originalEvent = d.originalEvent || {};
      if (d.originalEvent.mouseHandled) {
        return;
      }
      this._mouseStarted && this._mouseUp(d);
      this._mouseDownEvent = d;
      var c = this,
        e = d.which == 1,
        b =
          typeof this.options.cancel == "string"
            ? a(d.target).parents().add(d.target).filter(this.options.cancel)
                .length
            : false;
      if (!e || b || !this._mouseCapture(d)) {
        return true;
      }
      this.mouseDelayMet = !this.options.delay;
      if (!this.mouseDelayMet) {
        this._mouseDelayTimer = setTimeout(function () {
          c.mouseDelayMet = true;
        }, this.options.delay);
      }
      if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
        this._mouseStarted = this._mouseStart(d) !== false;
        if (!this._mouseStarted) {
          d.preventDefault();
          return true;
        }
      }
      this._mouseMoveDelegate = function (f) {
        return c._mouseMove(f);
      };
      this._mouseUpDelegate = function (f) {
        return c._mouseUp(f);
      };
      a(document)
        .bind("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .bind("mouseup." + this.widgetName, this._mouseUpDelegate);
      a.browser.safari || d.preventDefault();
      d.originalEvent.mouseHandled = true;
      return true;
    },
    _mouseMove: function (b) {
      if (a.browser.msie && !b.button) {
        return this._mouseUp(b);
      }
      if (this._mouseStarted) {
        this._mouseDrag(b);
        return b.preventDefault();
      }
      if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
        this._mouseStarted =
          this._mouseStart(this._mouseDownEvent, b) !== false;
        this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b);
      }
      return !this._mouseStarted;
    },
    _mouseUp: function (b) {
      a(document)
        .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
        .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      if (this._mouseStarted) {
        this._mouseStarted = false;
        this._preventClickEvent = b.target == this._mouseDownEvent.target;
        this._mouseStop(b);
      }
      return false;
    },
    _mouseDistanceMet: function (b) {
      return (
        Math.max(
          Math.abs(this._mouseDownEvent.pageX - b.pageX),
          Math.abs(this._mouseDownEvent.pageY - b.pageY)
        ) >= this.options.distance
      );
    },
    _mouseDelayMet: function (b) {
      return this.mouseDelayMet;
    },
    _mouseStart: function (b) {},
    _mouseDrag: function (b) {},
    _mouseStop: function (b) {},
    _mouseCapture: function (b) {
      return true;
    },
  });
})(jQuery);
(function (b) {
  var a = 5;
  b.widget("ui.slider", b.ui.mouse, {
    widgetEventPrefix: "slide",
    options: {
      animate: false,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: false,
      step: 1,
      value: 0,
      values: null,
    },
    _create: function () {
      var c = this,
        d = this.options;
      this._keySliding = false;
      this._mouseSliding = false;
      this._animateOff = true;
      this._handleIndex = null;
      this._detectOrientation();
      this._mouseInit();
      this.element.addClass(
        "ui-slider ui-slider-" +
          this.orientation +
          " ui-widget ui-widget-content ui-corner-all"
      );
      if (d.disabled) {
        this.element.addClass("ui-slider-disabled ui-disabled");
      }
      this.range = b([]);
      if (d.range) {
        if (d.range === true) {
          this.range = b("<div></div>");
          if (!d.values) {
            d.values = [this._valueMin(), this._valueMin()];
          }
          if (d.values.length && d.values.length !== 2) {
            d.values = [d.values[0], d.values[0]];
          }
        } else {
          this.range = b("<div></div>");
        }
        this.range.appendTo(this.element).addClass("ui-slider-range");
        if (d.range === "min" || d.range === "max") {
          this.range.addClass("ui-slider-range-" + d.range);
        }
        this.range.addClass("ui-widget-header");
      }
      if (b(".ui-slider-handle", this.element).length === 0) {
        b("<a href='#'></a>")
          .appendTo(this.element)
          .addClass("ui-slider-handle");
      }
      if (d.values && d.values.length) {
        while (b(".ui-slider-handle", this.element).length < d.values.length) {
          b("<a href='#'></a>")
            .appendTo(this.element)
            .addClass("ui-slider-handle");
        }
      }
      this.handles = b(".ui-slider-handle", this.element).addClass(
        "ui-state-default ui-corner-all"
      );
      this.handle = this.handles.eq(0);
      this.handles
        .add(this.range)
        .filter("a")
        .click(function (e) {
          e.preventDefault();
        })
        .hover(
          function () {
            if (!d.disabled) {
              b(this).addClass("ui-state-hover");
            }
          },
          function () {
            b(this).removeClass("ui-state-hover");
          }
        )
        .focus(function () {
          if (!d.disabled) {
            b(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
            b(this).addClass("ui-state-focus");
          } else {
            b(this).blur();
          }
        })
        .blur(function () {
          b(this).removeClass("ui-state-focus");
        });
      this.handles.each(function (e) {
        b(this).data("index.ui-slider-handle", e);
      });
      this.handles
        .keydown(function (j) {
          var g = true,
            f = b(this).data("index.ui-slider-handle"),
            k,
            h,
            e,
            i;
          if (c.options.disabled) {
            return;
          }
          switch (j.keyCode) {
            case b.ui.keyCode.HOME:
            case b.ui.keyCode.END:
            case b.ui.keyCode.PAGE_UP:
            case b.ui.keyCode.PAGE_DOWN:
            case b.ui.keyCode.UP:
            case b.ui.keyCode.RIGHT:
            case b.ui.keyCode.DOWN:
            case b.ui.keyCode.LEFT:
              g = false;
              if (!c._keySliding) {
                c._keySliding = true;
                b(this).addClass("ui-state-active");
                k = c._start(j, f);
                if (k === false) {
                  return;
                }
              }
              break;
          }
          i = c.options.step;
          if (c.options.values && c.options.values.length) {
            h = e = c.values(f);
          } else {
            h = e = c.value();
          }
          switch (j.keyCode) {
            case b.ui.keyCode.HOME:
              e = c._valueMin();
              break;
            case b.ui.keyCode.END:
              e = c._valueMax();
              break;
            case b.ui.keyCode.PAGE_UP:
              e = c._trimAlignValue(h + (c._valueMax() - c._valueMin()) / a);
              break;
            case b.ui.keyCode.PAGE_DOWN:
              e = c._trimAlignValue(h - (c._valueMax() - c._valueMin()) / a);
              break;
            case b.ui.keyCode.UP:
            case b.ui.keyCode.RIGHT:
              if (h === c._valueMax()) {
                return;
              }
              e = c._trimAlignValue(h + i);
              break;
            case b.ui.keyCode.DOWN:
            case b.ui.keyCode.LEFT:
              if (h === c._valueMin()) {
                return;
              }
              e = c._trimAlignValue(h - i);
              break;
          }
          c._slide(j, f, e);
          return g;
        })
        .keyup(function (f) {
          var e = b(this).data("index.ui-slider-handle");
          if (c._keySliding) {
            c._keySliding = false;
            c._stop(f, e);
            c._change(f, e);
            b(this).removeClass("ui-state-active");
          }
        });
      this._refreshValue();
      this._animateOff = false;
    },
    destroy: function () {
      this.handles.remove();
      this.range.remove();
      this.element
        .removeClass(
          "ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all"
        )
        .removeData("slider")
        .unbind(".slider");
      this._mouseDestroy();
      return this;
    },
    _mouseCapture: function (e) {
      var f = this.options,
        i,
        k,
        d,
        g,
        m,
        j,
        l,
        h,
        c;
      if (f.disabled) {
        return false;
      }
      this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight(),
      };
      this.elementOffset = this.element.offset();
      i = { x: e.pageX, y: e.pageY };
      k = this._normValueFromMouse(i);
      d = this._valueMax() - this._valueMin() + 1;
      m = this;
      this.handles.each(function (n) {
        var o = Math.abs(k - m.values(n));
        if (d > o) {
          d = o;
          g = b(this);
          j = n;
        }
      });
      if (f.range === true && this.values(1) === f.min) {
        j += 1;
        g = b(this.handles[j]);
      }
      l = this._start(e, j);
      if (l === false) {
        return false;
      }
      this._mouseSliding = true;
      m._handleIndex = j;
      g.addClass("ui-state-active").focus();
      h = g.offset();
      c = !b(e.target).parents().andSelf().is(".ui-slider-handle");
      this._clickOffset = c
        ? { left: 0, top: 0 }
        : {
            left: e.pageX - h.left - g.width() / 2,
            top:
              e.pageY -
              h.top -
              g.height() / 2 -
              (parseInt(g.css("borderTopWidth"), 10) || 0) -
              (parseInt(g.css("borderBottomWidth"), 10) || 0) +
              (parseInt(g.css("marginTop"), 10) || 0),
          };
      k = this._normValueFromMouse(i);
      this._slide(e, j, k);
      this._animateOff = true;
      return true;
    },
    _mouseStart: function (c) {
      return true;
    },
    _mouseDrag: function (e) {
      var c = { x: e.pageX, y: e.pageY },
        d = this._normValueFromMouse(c);
      this._slide(e, this._handleIndex, d);
      return false;
    },
    _mouseStop: function (c) {
      this.handles.removeClass("ui-state-active");
      this._mouseSliding = false;
      this._stop(c, this._handleIndex);
      this._change(c, this._handleIndex);
      this._handleIndex = null;
      this._clickOffset = null;
      this._animateOff = false;
      return false;
    },
    _detectOrientation: function () {
      this.orientation =
        this.options.orientation === "vertical" ? "vertical" : "horizontal";
    },
    _normValueFromMouse: function (d) {
      var c, g, f, e, h;
      if (this.orientation === "horizontal") {
        c = this.elementSize.width;
        g =
          d.x -
          this.elementOffset.left -
          (this._clickOffset ? this._clickOffset.left : 0);
      } else {
        c = this.elementSize.height;
        g =
          d.y -
          this.elementOffset.top -
          (this._clickOffset ? this._clickOffset.top : 0);
      }
      f = g / c;
      if (f > 1) {
        f = 1;
      }
      if (f < 0) {
        f = 0;
      }
      if (this.orientation === "vertical") {
        f = 1 - f;
      }
      e = this._valueMax() - this._valueMin();
      h = this._valueMin() + f * e;
      return this._trimAlignValue(h);
    },
    _start: function (e, d) {
      var c = { handle: this.handles[d], value: this.value() };
      if (this.options.values && this.options.values.length) {
        c.value = this.values(d);
        c.values = this.values();
      }
      return this._trigger("start", e, c);
    },
    _slide: function (g, f, e) {
      var c, d, h;
      if (this.options.values && this.options.values.length) {
        c = this.values(f ? 0 : 1);
        if (
          this.options.values.length === 2 &&
          this.options.range === true &&
          ((f === 0 && e > c) || (f === 1 && e < c))
        ) {
          e = c;
        }
        if (e !== this.values(f)) {
          d = this.values();
          d[f] = e;
          h = this._trigger("slide", g, {
            handle: this.handles[f],
            value: e,
            values: d,
          });
          c = this.values(f ? 0 : 1);
          if (h !== false) {
            this.values(f, e, true);
          }
        }
      } else {
        if (e !== this.value()) {
          h = this._trigger("slide", g, { handle: this.handles[f], value: e });
          if (h !== false) {
            this.value(e);
          }
        }
      }
    },
    _stop: function (e, d) {
      var c = { handle: this.handles[d], value: this.value() };
      if (this.options.values && this.options.values.length) {
        c.value = this.values(d);
        c.values = this.values();
      }
      this._trigger("stop", e, c);
    },
    _change: function (e, d) {
      if (!this._keySliding && !this._mouseSliding) {
        var c = { handle: this.handles[d], value: this.value() };
        if (this.options.values && this.options.values.length) {
          c.value = this.values(d);
          c.values = this.values();
        }
        this._trigger("change", e, c);
      }
    },
    value: function (c) {
      if (arguments.length) {
        this.options.value = this._trimAlignValue(c);
        this._refreshValue();
        this._change(null, 0);
      }
      return this._value();
    },
    values: function (d, g) {
      var f, c, e;
      if (arguments.length > 1) {
        this.options.values[d] = this._trimAlignValue(g);
        this._refreshValue();
        this._change(null, d);
      }
      if (arguments.length) {
        if (b.isArray(arguments[0])) {
          f = this.options.values;
          c = arguments[0];
          for (e = 0; e < f.length; e += 1) {
            f[e] = this._trimAlignValue(c[e]);
            this._change(null, e);
          }
          this._refreshValue();
        } else {
          if (this.options.values && this.options.values.length) {
            return this._values(d);
          } else {
            return this.value();
          }
        }
      } else {
        return this._values();
      }
    },
    _setOption: function (d, e) {
      var c,
        f = 0;
      if (b.isArray(this.options.values)) {
        f = this.options.values.length;
      }
      b.Widget.prototype._setOption.apply(this, arguments);
      switch (d) {
        case "disabled":
          if (e) {
            this.handles.filter(".ui-state-focus").blur();
            this.handles.removeClass("ui-state-hover");
            this.handles.attr("disabled", "disabled");
            this.element.addClass("ui-disabled");
          } else {
            this.handles.removeAttr("disabled");
            this.element.removeClass("ui-disabled");
          }
          break;
        case "orientation":
          this._detectOrientation();
          this.element
            .removeClass("ui-slider-horizontal ui-slider-vertical")
            .addClass("ui-slider-" + this.orientation);
          this._refreshValue();
          break;
        case "value":
          this._animateOff = true;
          this._refreshValue();
          this._change(null, 0);
          this._animateOff = false;
          break;
        case "values":
          this._animateOff = true;
          this._refreshValue();
          for (c = 0; c < f; c += 1) {
            this._change(null, c);
          }
          this._animateOff = false;
          break;
      }
    },
    _value: function () {
      var c = this.options.value;
      c = this._trimAlignValue(c);
      return c;
    },
    _values: function (c) {
      var f, e, d;
      if (arguments.length) {
        f = this.options.values[c];
        f = this._trimAlignValue(f);
        return f;
      } else {
        e = this.options.values.slice();
        for (d = 0; d < e.length; d += 1) {
          e[d] = this._trimAlignValue(e[d]);
        }
        return e;
      }
    },
    _trimAlignValue: function (f) {
      if (f < this._valueMin()) {
        return this._valueMin();
      }
      if (f > this._valueMax()) {
        return this._valueMax();
      }
      var c = this.options.step > 0 ? this.options.step : 1,
        e = f % c,
        d = f - e;
      if (Math.abs(e) * 2 >= c) {
        d += e > 0 ? c : -c;
      }
      return parseFloat(d.toFixed(5));
    },
    _valueMin: function () {
      return this.options.min;
    },
    _valueMax: function () {
      return this.options.max;
    },
    _refreshValue: function () {
      var f = this.options.range,
        e = this.options,
        l = this,
        d = !this._animateOff ? e.animate : false,
        g,
        c = {},
        h,
        j,
        i,
        k;
      if (this.options.values && this.options.values.length) {
        this.handles.each(function (n, m) {
          g =
            ((l.values(n) - l._valueMin()) / (l._valueMax() - l._valueMin())) *
            100;
          c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
          b(this).stop(1, 1)[d ? "animate" : "css"](c, e.animate);
          if (l.options.range === true) {
            if (l.orientation === "horizontal") {
              if (n === 0) {
                l.range
                  .stop(1, 1)
                  [d ? "animate" : "css"]({ left: g + "%" }, e.animate);
              }
              if (n === 1) {
                l.range[d ? "animate" : "css"](
                  { width: g - h + "%" },
                  { queue: false, duration: e.animate }
                );
              }
            } else {
              if (n === 0) {
                l.range
                  .stop(1, 1)
                  [d ? "animate" : "css"]({ bottom: g + "%" }, e.animate);
              }
              if (n === 1) {
                l.range[d ? "animate" : "css"](
                  { height: g - h + "%" },
                  { queue: false, duration: e.animate }
                );
              }
            }
          }
          h = g;
        });
      } else {
        j = this.value();
        i = this._valueMin();
        k = this._valueMax();
        g = k !== i ? ((j - i) / (k - i)) * 100 : 0;
        c[l.orientation === "horizontal" ? "left" : "bottom"] = g + "%";
        this.handle.stop(1, 1)[d ? "animate" : "css"](c, e.animate);
        if (f === "min" && this.orientation === "horizontal") {
          this.range
            .stop(1, 1)
            [d ? "animate" : "css"]({ width: g + "%" }, e.animate);
        }
        if (f === "max" && this.orientation === "horizontal") {
          this.range[d ? "animate" : "css"](
            { width: 100 - g + "%" },
            { queue: false, duration: e.animate }
          );
        }
        if (f === "min" && this.orientation === "vertical") {
          this.range
            .stop(1, 1)
            [d ? "animate" : "css"]({ height: g + "%" }, e.animate);
        }
        if (f === "max" && this.orientation === "vertical") {
          this.range[d ? "animate" : "css"](
            { height: 100 - g + "%" },
            { queue: false, duration: e.animate }
          );
        }
      }
    },
  });
  b.extend(b.ui.slider, { version: "1.8.2" });
})(jQuery);
/*
 * Queensland Government Online Video Template
 * @version 0.8
 * @since 15/09/2011
 * @contact onlineservices@smartservice.qld.gov.au
 *
 * @requires jQuery (tested with jQuery 1.4.2)
 * @requires jQuery UI (tested with jQuery UI 1.8.2)
 *             * jQuery UI core
 *             * jQuery UI widget
 *             * jQuery UI mouse
 *             * jQuery UI slider
 */
if (typeof jQuery == "undefined") {
  consoleMessage(
    "Video player warning: Initialisation failed. jQuery is not available",
    "error"
  );
} else {
  if (typeof jQuery.qg == "undefined") {
    jQuery.qg = {};
  }
  if (typeof jQuery.qg.ovt == "undefined") {
    jQuery.qg.ovt = {};
  }
  if (typeof jQuery.qg.ovt.instances == "undefined") {
    jQuery.qg.ovt.instances = [];
  }
  jQuery.qg.ovt.defaultOptions = {
    sourceflv: "",
    sourcemp4: "",
    adfile: "",
    ccfile: "",
    poster: "",
    videowidth: "640",
    videoheight: "360",
    playerswf: "cue/flash/player.swf",
    accessswf: "",
    videourl: "",
  };
  jQuery.qg.ovt.conf = {
    containerClass: "qg-ovt",
    activeClass: "qg-ovt-active",
    containerSelector: ".qg-ovt-active",
    pressedClass: "pressed",
    altsClass: "qg-ovt-alternatives",
    optionsClass: "qg-ovt-options",
    transcriptClass: "qg-ovt-transcript",
    playerClass: "qg-ovt-player",
    controlsClass: "qg-ovt-controls",
    posterClass: "qg-ovt-poster",
    innerClass: "qg-ovt-inner",
    embeddedClass: "qg-ovt-embedded",
    embedIdSuffix: "-embedded",
    playText: "|&gt;",
    playTitle: "Play",
    pauseText: "||",
    pauseTitle: "Pause",
    openCCText: "Captions",
    openCCTitle: "Open captions",
    closeCCText: "Captions",
    closeCCTitle: "Close captions",
    openADText: "Audio description",
    closeADText: "Audio description",
    openADTitle: "Play description",
    closeADTitle: "Mute description",
    openTranText: "Transcript",
    closeTranText: "Transcript",
    openTranTitle: "Show transcript",
    closeTranTitle: "Hide transcript",
    openFullscreenText: "FS",
    openFullscreenTitle: "Launch fullscreen",
    closeFullscreenText: "FS",
    closeFullscreenTitle: "Close fullscreen",
    openFullscreenText: "FS",
    progressTitlePrefix: "Current position: ",
    durationTitlePrefix: "Video duration: ",
    volumeText: "Vol",
    volumeTitle: "Volume",
    unpressedVolumeTitle: "Mute audio",
    pressedVolumeTitle: "Enable audio",
    transcriptLink: '<li class="transcript"><a href="#">Transcript</a></li>',
    flashEmbedTemplate:
      '<div class="qg-ovt-player-wrapper"><object data="{playerswf}" id="{videoid}" class="qg-ovt-embedded" type="application/x-shockwave-flash" width="640" height="360" tabindex="-1"><param name="movie" value="{playerswf}" /><param value="true" name="allowfullscreen"><param value="always" name="allowscriptaccess"><param name="wmode" value="transparent"><param value="id={videoid}&amp;file={videofile}&amp;image={poster}&amp;captions={ccfile}&amp;audio={adfile}&amp;plugins={accessswf}&amp;accessibility.fontsize=16&amp;accessibility.volume=75&amp;accessibility.hide=true&amp;accessibility.mute=true&amp;mute=false&amp;volume=85" name="flashvars"></object></div>',
    controlsTemplate:
      '<div class="qg-ovt-controls"><ul><li class="play"><a href="#" title="Play"><img src="cue/images/video/displacement.png" alt="" class="for-css-replacement" /><span>|></span></a></li><li class="progress-bar"></li><li class="progress" title="Current position"></li><li class="duration" title="Video duration"></li><li class="volume"><a href="#" title="Volume"><img src="cue/images/video/displacement.png" alt="" class="for-css-replacement" /><span>*)</span></a></li><li class="captions"><a href="#" title="Captions"><img src="cue/images/video/displacement.png" alt="" class="for-css-replacement" /><span>CC</span></a></li><li class="audio-description"><a href="#" title="Audio Description"><img src="cue/images/video/displacement.png" alt="" class="for-css-replacement" /><span>AD</span></a></li></ul></div>',
  };
  function playerReady(b) {
    try {
      $("#" + b.id).activateQGVideo();
    } catch (a) {
      consoleMessage(a);
    }
  }
  (function (a) {
    a.browser.msie6 = a.browser.msie && a.browser.version < 7;
    a.fn.qgOvt = function (b) {
      if (!DetectFlashVer(9, 0, 115)) {
        consoleMessage(
          "Online video template was not initialised. The template requires Flash 9.0.115 or later.",
          "info"
        );
        return;
      }
      b =
        typeof b == "undefined"
          ? a.qg.ovt.defaultOptions
          : a.extend({}, a.qg.ovt.defaultOptions, b);
      success = true;
      a(this).each(function () {
        success =
          initQGVideoTemplate.apply(this, [b]) !== false ? success : false;
      });
      return success;
    };
    initQGVideoTemplate = function (b) {
      if (a(this).is(".qg-ovt-active")) {
        return;
      }
      containerId = a(this).attr("id") + "";
      if (
        containerId == "" ||
        a.inArray(containerId, a.qg.ovt.instances) !== -1
      ) {
        consoleMessage(
          "Video player warning: Initialisation failed. Each video template container must have a unique id",
          "error"
        );
        return false;
      }
      a.qg.ovt.instances[a.qg.ovt.instances.length] = containerId;
      b.videoid = containerId + a.qg.ovt.conf.embedIdSuffix;
      if ((b = parseVideoHTML.apply(this, [b])) === false) {
        return false;
      }
      a(this).data("options", b);
      return decorateQGVideoTemplate.apply(this, [b]);
    };
    parseVideoHTML = function (b) {
      b.duration = typeof b.duration != "undefined" ? b.sourceflv : "0";
      videofile = videoLink = "";
      if (typeof b.sourceflv != "undefined" && b.sourceflv != "") {
        videofile = b.sourceflv;
      } else {
        if (typeof b.sourcemp4 != "undefined" && b.sourcemp4 != "") {
          videofile = b.sourcemp4;
        } else {
          flvLink = a(this).find(
            "." + a.qg.ovt.conf.optionsClass + ' a[type*="video/flv"]'
          );
          mp4Link = a(this).find(
            "." + a.qg.ovt.conf.optionsClass + ' a[type*="video/mp4"]'
          );
          if (flvLink.size() > 0) {
            videofile =
              (sourceflv = flvLink.get(0).href) + "" != "undefined"
                ? sourceflv
                : "";
            videoLinkText = flvLink.text();
          } else {
            if (mp4Link.size() > 0) {
              videofile =
                (sourcemp4 = mp4Link.get(0).href) + "" != "undefined"
                  ? sourcemp4
                  : "";
              videoLinkText = mp4Link.text();
            }
          }
          if (videoLinkText != "") {
            hours = (hours = videoLinkText.match(/(\d*) hours?/i))
              ? parseInt(hours[1], 10)
              : 0;
            minutes = (minutes = videoLinkText.match(/(\d*) minutes?/i))
              ? parseInt(minutes[1], 10)
              : 0;
            seconds = (seconds = videoLinkText.match(/(\d*) seconds?/i))
              ? parseInt(seconds[1], 10)
              : 0;
            b.duration = hours * 60 * 60 + minutes * 60 + seconds;
          }
        }
      }
      b.videofile = videofile;
      if (videofile == "") {
        consoleMessage(
          "Video player warning: Initialisation failed. No acceptable video file could be found (flv, mp4)",
          "warn"
        );
        return false;
      }
      b.ccfile =
        typeof b.ccfile != "undefined" && b.ccfile != ""
          ? b.ccfile
          : (ccfile = a(this)
              .find("." + a.qg.ovt.conf.optionsClass + " .captions a")
              .get(0).href) +
              "" !=
            "undefined"
          ? ccfile
          : "";
      if (b.ccfile == "") {
        consoleMessage(
          "Video player warning: No captions file could be found (timed text xml)",
          "warn"
        );
      }
      b.adfile =
        typeof b.adfile != "undefined" && b.adfile != ""
          ? b.adfile
          : (adfile = a(this)
              .find("." + a.qg.ovt.conf.optionsClass + " .audio-description a")
              .get(0).href) +
              "" !=
            "undefined"
          ? adfile
          : "";
      if (b.adfile == "") {
        consoleMessage(
          "Video player notice: No audio description file could be found (mp3)",
          "notice"
        );
      }
      b.poster =
        typeof b.poster != "undefined" && b.poster != ""
          ? b.poster
          : (poster = a(this)
              .find("." + a.qg.ovt.conf.posterClass)
              .get(0).src) +
              "" !=
            "undefined"
          ? poster + ""
          : "";
      if (b.poster == "") {
        consoleMessage(
          "Video player notice: No poster image could be found (jpg, png)",
          "notice"
        );
      }
      b.accessswf =
        b.accessswf != ""
          ? b.accessswf
          : b.playerswf.substr(0, b.playerswf.lastIndexOf("/")) +
            "/accessibility.swf";
      b.videotitle = a(this).find(":header:first").text();
      b.videourl = b.videourl != "" ? b.videourl : window.location + "";
      return b;
    };
    decorateQGVideoTemplate = function (b) {
      embedCode = a.qg.ovt.conf.flashEmbedTemplate
        .replace(/{videoid}/g, b.videoid)
        .replace(/{playerswf}/g, b.playerswf)
        .replace(/{accessswf}/g, b.accessswf)
        .replace(/{videofile}/g, b.videofile)
        .replace(/{poster}/g, b.poster)
        .replace(/{ccfile}/g, b.ccfile)
        .replace(/{adfile}/g, b.adfile);
      embedElement = a(
        '<div class="' + a.qg.ovt.conf.playerClass + '"></div>'
      ).append(embedCode + a.qg.ovt.conf.controlsTemplate);
      transcript = a(
        '<div class="' + a.qg.ovt.conf.innerClass + '"></div>'
      ).append(
        a(this)
          .find("." + a.qg.ovt.conf.transcriptClass)
          .contents()
      );
      downloadElement = a(this).find(
        "." + a.qg.ovt.conf.optionsClass + " .download"
      );
      downloadList = downloadElement.find("ul");
      downloadElement.find("ul").remove();
      downloadLabel = downloadElement.text();
      downloadElement
        .empty()
        .append('<span class="label">' + downloadLabel + "</span>")
        .append(downloadList);
      a(this)
        .find("." + a.qg.ovt.conf.optionsClass + " .download a")
        .each(function () {
          linkText = a(this).text();
          a(this)
            .attr("title", linkText)
            .empty()
            .append(
              linkText.replace(
                /(.*\(.*, )([a-z0-9]*?)( .*\))/i,
                "<span>$1</span>$2<span>$3</span>"
              )
            );
        });
      a(this)
        .find("." + a.qg.ovt.conf.posterClass)
        .remove()
        .end()
        .find("." + a.qg.ovt.conf.optionsClass + " .captions")
        .remove()
        .end()
        .find("." + a.qg.ovt.conf.optionsClass + " .audio-description")
        .remove()
        .end()
        .find("." + a.qg.ovt.conf.altsClass)
        .before(embedElement)
        .find("ul." + a.qg.ovt.conf.optionsClass)
        .append(a.qg.ovt.conf.transcriptLink)
        .end()
        .end()
        .find("." + a.qg.ovt.conf.optionsClass + " .download ul li:last")
        .addClass("last-child")
        .end()
        .find("." + a.qg.ovt.conf.transcriptClass)
        .empty()
        .append(transcript)
        .hide()
        .end()
        .find(
          "." +
            a.qg.ovt.conf.optionsClass +
            " a, ." +
            a.qg.ovt.conf.controlsClass +
            " a"
        )
        .focusClass()
        .end()
        .find(".qg-ovt-overlay")
        .css({ "z-index": 4 })
        .end()
        .removeClass(a.qg.ovt.conf.containerClass)
        .addClass(a.qg.ovt.conf.activeClass);
      updateDuration(this, b.duration);
      updateProgress(this, 0, b.duration);
      resizePlayerToFitContainer.apply(this);
      if (a.browser.msie && parseInt(a.browser.version) < 8) {
        totalWidth = 0;
        downloadElement.children().each(function () {
          totalWidth += parseInt(a(this).outerWidth(true));
        });
        downloadElement.width(totalWidth + 20);
      }
      return true;
    };
    a.fn.activateQGVideo = function () {
      vidContainer = getVidContainer(this);
      vidContainer.data("playerID", this.attr("id"));
      a(this).addClass("cue-ovt-flash");
      var b = a(this).get(0);
      b.addControllerListener("VOLUME", "volumeListener");
      b.addControllerListener("MUTE", "volumeListener");
      b.addModelListener("LOADED", "playPauseListener");
      b.addViewListener("PLAY", "playPauseListener");
      b.addModelListener("TIME", "progressListener");
      initVidControls(getVidControls(vidContainer));
    };
    initVidControls = function (e) {
      var d = getVidContainer(e);
      var b = d.data("playerID");
      var c = document.getElementById(b);
      options = d.data("options");
      updatePlayButton(e, false);
      e.find(".play a").click(function () {
        d = getVidContainer(this);
        var f = d.data("playerID");
        var g = document.getElementById(f);
        if (d.data("state") != "playing") {
          g.sendEvent("PLAY", "true");
          updatePlayButton(this, true);
          return false;
        } else {
          g.sendEvent("PLAY", "false");
          updatePlayButton(this, false);
          return false;
        }
      });
      updateCCButton(e, false);
      e.find(".captions a").toggle(
        function () {
          var h = getVidContainer(this);
          var f = h.data("playerID");
          var g = document.getElementById(f);
          g.hideCaptions(false);
          updateCCButton(h, true);
          return false;
        },
        function () {
          var h = getVidContainer(this);
          var f = h.data("playerID");
          var g = document.getElementById(f);
          g.hideCaptions(true);
          updateCCButton(h, false);
          return false;
        }
      );
      updateADButton(e, false);
      e.find(".audio-description a").toggle(
        function () {
          var h = getVidContainer(this);
          var f = h.data("playerID");
          var g = document.getElementById(f);
          g.muteAudio(false);
          updateADButton(h, (isPressed = true));
          return false;
        },
        function () {
          var h = getVidContainer(this);
          var f = h.data("playerID");
          var g = document.getElementById(f);
          g.muteAudio(true);
          updateADButton(h, (isPressed = false));
          return false;
        }
      );
      updateTranscriptButton(e, false);
      d.find(".transcript a").toggle(
        function () {
          var g = getVidContainer(this);
          var f = g.data("playerID");
          updateTranscriptButton(g, true);
          g.find(".qg-ovt-transcript").slideDown(function () {
            a(this).trigger("x-height-change");
          });
          return false;
        },
        function () {
          var g = getVidContainer(this);
          var f = g.data("playerID");
          g.find(".qg-ovt-transcript").slideUp(function () {
            updateTranscriptButton(g, false);
            a(this).trigger("x-height-change");
          });
          return false;
        }
      );
      if (a.ui && typeof a.ui.slider != "undefined") {
        e.find(".volume")
          .append(
            '<div class="volume-overlay"><div class="volume-slider"></div></div>'
          )
          .find(".volume-overlay")
          .hide()
          .find(".volume-slider")
          .slider({
            range: "min",
            orientation: "vertical",
            stop: function () {
              newPercent = a(this).slider("value");
              c.sendEvent("VOLUME", newPercent);
            },
          });
      } else {
        consoleMessage(
          "Video player warning: Volume slider could not be initialised. jQuery UI Slider was not found",
          "warn"
        );
      }
      e.find(".volume > a")
        .click(function () {
          var h = getVidContainer(this);
          var f = h.data("playerID");
          var g = document.getElementById(f);
          volumeSlider = h.find(".volume-slider");
          if (g.getConfig().mute == true) {
            g.sendEvent("MUTE", false);
            volume = g.getConfig().volume;
          } else {
            if (g.getConfig().volume == 0) {
              g.sendEvent("VOLUME", 100);
              volume = 100;
            } else {
              g.sendEvent("MUTE", true);
              volume = 0;
            }
          }
          updateVolumeButton(h, volume);
          return false;
        })
        .parent()
        .bind("mouseover focusin", function () {
          var f = getVidContainer(this);
          f.find(".volume-overlay").show();
        })
        .bind("mouseout", function () {
          var f = getVidContainer(this);
          f.find(".volume-overlay").hide();
        })
        .find(".ui-slider-handle")
        .bind("focusout", function () {
          var f = getVidContainer(this);
          f.find(".volume-overlay").hide();
        });
      updateVolumeButton(e);
      if (a.ui && typeof a.ui.slider != "undefined") {
        e.find(".progress-bar")
          .data("uimode", "read")
          .slider({
            range: "min",
            start: function () {
              a(this).data("uimode", "write");
            },
            stop: function () {
              newPercent = a(this).slider("value");
              newValue = (newPercent / 100) * a(this).data("duration");
              container = getVidContainer(this);
              c = getVidPlayer(container);
              c.sendEvent("SEEK", newValue);
              if (container.data("state") != "playing") {
                c.sendEvent("PLAY", "false");
              }
              a(this).data("uimode", "read");
            },
          })
          .slider("disable");
      } else {
        consoleMessage(
          "Video player warning: Progress bar could not be initialised. jQuery UI Slider was not found",
          "warn"
        );
      }
      e.find(".progress-bar .ui-slider-range").after(
        '<div class="load-progress"></div>'
      );
    };
    progressListener = function (f) {
      var e = getVidControls(a("#" + f.id));
      var b = e.find(".progress-bar").eq(0);
      if (b.data("progress") == f.duration && f.position == 0) {
        var d = getVidContainer(e);
        var c = document.getElementById(f.id);
        c.sendEvent("PLAY", "false");
        d.data("state", "paused");
        d.removeClass("playing");
        updatePlayButton(d, false);
      }
      updateDuration(e, Math.floor(f.duration));
      updateProgress(e, Math.floor(f.position), Math.floor(f.duration));
      b.data("progress", f.position);
      if (b.data("uimode") == "write") {
        return;
      }
      if (a.ui && typeof a.ui.slider != "undefined") {
        b.slider("enable");
        b.data("duration", f.duration);
        progressPercent = (f.position / f.duration) * 100;
        b.slider("value", progressPercent);
      }
    };
    playPauseListener = function (c) {
      var b = getVidContainer(a("#" + c.id));
      if (typeof c.loaded != "undefined") {
        loadedPercent = Math.floor((c.loaded / c.total) * 100);
        b.find(".progress-bar .load-progress").width(loadedPercent + "%");
        a("#loaded span").text(loadedPercent);
        if (loadedPercent == 100) {
          b.addClass("loaded");
        }
        return;
      }
      if (typeof c.state == "undefined" && typeof c.loaded == "undefined") {
        if (b.data("state") != "playing") {
          c.state = true;
        } else {
          c.state = false;
        }
      }
      if (c.state != false) {
        b.data("state", "playing");
        b.addClass("playing");
      } else {
        b.data("state", "paused");
        b.removeClass("playing");
      }
      updatePlayButton(b, c.state);
    };
    volumeListener = function (e) {
      var b = getVidContainer(a("#" + e.id));
      var c = b.data("playerID");
      var d = document.getElementById(c);
      volume = d.getConfig().mute ? 0 : d.getConfig().volume;
      updateVolumeButton(b, volume);
    };
    updatePlayButton = function (c, b) {
      b = typeof b != "undefined" ? b : false;
      container = getVidContainer(c);
      buttonEl = container.find(".play a");
      if (b || container.data("state") == "playing") {
        a(buttonEl)
          .attr("title", a.qg.ovt.conf.pauseTitle)
          .addClass("pressed")
          .find(".span")
          .text(a.qg.ovt.conf.pauseText);
      } else {
        a(buttonEl)
          .attr("title", a.qg.ovt.conf.playTitle)
          .removeClass("pressed")
          .find(".span")
          .text(a.qg.ovt.conf.playText);
      }
    };
    updateCCButton = function (c, b) {
      b = typeof b != "undefined" ? b : false;
      container = getVidContainer(c);
      buttonEl = container.find(".captions a");
      if (b) {
        a(buttonEl)
          .find(".span")
          .text(a.qg.ovt.conf.closeCCText)
          .end()
          .attr("title", a.qg.ovt.conf.closeCCTitle)
          .addClass("pressed");
      } else {
        a(buttonEl)
          .find(".span")
          .text(a.qg.ovt.conf.openCCText)
          .end()
          .attr("title", a.qg.ovt.conf.openCCTitle)
          .removeClass("pressed");
      }
    };
    updateADButton = function (c, b) {
      b = typeof b != "undefined" ? b : false;
      container = getVidContainer(c);
      buttonEl = container.find(".audio-description a");
      if (b) {
        a(buttonEl)
          .find(".span")
          .text(a.qg.ovt.conf.closeADText)
          .end()
          .attr("title", a.qg.ovt.conf.closeADTitle)
          .addClass("pressed");
      } else {
        a(buttonEl)
          .find(".span")
          .text(a.qg.ovt.conf.openADText)
          .end()
          .attr("title", a.qg.ovt.conf.openADTitle)
          .removeClass("pressed");
      }
    };
    updateTranscriptButton = function (c, b) {
      b = typeof b != "undefined" ? b : false;
      container = getVidContainer(c);
      buttonEl = container.find(".transcript a");
      if (b) {
        a(buttonEl)
          .text(a.qg.ovt.conf.closeTranText)
          .attr("title", a.qg.ovt.conf.closeTranTitle)
          .addClass("pressed");
      } else {
        a(buttonEl)
          .text(a.qg.ovt.conf.openTranText)
          .attr("title", a.qg.ovt.conf.openTranTitle)
          .removeClass("pressed");
      }
    };
    updateFSButton = function (c, b) {
      container = getVidContainer(c);
      buttonEl = container.find(".fullscreen a");
      a(buttonEl).find(".span").text(a.qg.ovt.conf.openFullscreenText);
    };
    updateVolumeButton = function (d, e) {
      container = getVidContainer(d);
      vidControls = getVidControls(container);
      var b = container.data("playerID");
      var c = document.getElementById(b);
      if (typeof e == "undefined") {
        e = c.getConfig().volume;
      }
      buttonEl = container.find(".volume a");
      a(buttonEl)
        .attr("title", a.qg.ovt.conf.unpressedVolumeTitle)
        .find(".span")
        .text(a.qg.ovt.conf.volumeText)
        .data("volume", e);
      buttonEl.removeClass("pressed vol-muted vol-low vol-medium vol-high");
      if (e == 0) {
        buttonEl
          .addClass("pressed")
          .addClass("vol-muted")
          .attr("title", a.qg.ovt.conf.pressedVolumeTitle);
      } else {
        if (e < 40) {
          buttonEl.addClass("vol-low");
        } else {
          if (e < 75) {
            buttonEl.addClass("vol-medium");
          } else {
            buttonEl.addClass("vol-high");
          }
        }
      }
      vidControls.find(".volume-slider").slider("value", e);
    };
    updateProgress = function (c, b, d) {
      formatted = secondsFormatted(b, d);
      container = getVidContainer(c);
      uiEl = container.find(".progress");
      if (typeof d != "undefined" && a(uiEl).text() != formatted[0] + " /") {
        a(uiEl).text(formatted[0] + " /");
        a(uiEl).attr("title", a.qg.ovt.conf.progressTitlePrefix + formatted[1]);
      }
    };
    updateDuration = function (b, c) {
      formatted = secondsFormatted(c, c);
      container = getVidContainer(b);
      uiEl = container.find(".duration");
      if (a(uiEl).text() != formatted[0]) {
        a(uiEl).text(formatted[0]);
        a(uiEl).attr("title", a.qg.ovt.conf.durationTitlePrefix + formatted[1]);
      }
    };
    updateDimensions = function (b, c) {
      a(b)
        .css({ width: c.width })
        .find(".qg-ovt-player-wrapper")
        .css({ width: c.width, height: c.height })
        .find("object")
        .attr("width", c.width)
        .attr("height", c.height);
      progressBar = a(b).find(".progress-bar");
      parentWidth = progressBar.parent().width();
      siblingsWidth = 0;
      progressBar.siblings().each(function () {
        siblingsWidth += a(this).outerWidth(true);
      });
      errorMargin = a.browser.msie && a.browser.version < 8 ? 18 : 5;
      availWidth = parentWidth - siblingsWidth - errorMargin;
      if (availWidth < 110) {
        availWidth = parentWidth - progressBar.prev().outerWidth(true) - 10;
      }
      progressBar.css("width", availWidth);
    };
    resizeThrottleTimeoutID = null;
    a(window).resize(function () {
      if (a.browser.msie6) {
        return;
      }
      if (resizeThrottleTimeoutID != null) {
        window.clearTimeout(resizeThrottleTimeoutID);
        resizeThrottleTimeoutID = null;
      }
      resizeThrottleTimeoutID = window.setTimeout(function () {
        a(".qg-ovt-active").each(resizePlayerToFitContainer);
      }, 200);
    });
    resizePlayerToFitContainer = function () {
      options = a(this).data("options");
      if (a.browser.msie6) {
        a(this).css("position", "absolute");
      }
      parentContainer = a(this).parent();
      availableDimensions = calculateDimensions(
        options.videowidth,
        options.videoheight,
        parentContainer.width()
      );
      if (a.browser.msie6) {
        a(this).css("position", "static");
      }
      updateDimensions(this, availableDimensions);
    };
    calculateDimensions = function (f, d, c, e, b) {
      f = parseInt(f, 10);
      d = parseInt(d, 10);
      c = parseInt(c, 10);
      e = typeof e != "undefined" ? parseInt(e, 10) : null;
      b = b || false;
      if (c > f) {
        if (b) {
          width = c;
        } else {
          width = f;
        }
      } else {
        width = c;
      }
      scaleFactor = f / width;
      height = d / scaleFactor;
      if (e != null) {
        if (e < height) {
          scaleFactor = e / height;
          height = e;
          width = width / scaleFactor;
        }
      }
      width = parseInt(width, 10);
      height = parseInt(height, 10);
      return { width: width, height: height };
    };
    getVidPlayer = function (b) {
      if (!a(b).is(a.qg.ovt.conf.containerSelector)) {
        b = getVidContainer(b);
      }
      return findVidPlayer(b);
    };
    findVidPlayer = function (b) {
      return a(b)
        .find("." + a.qg.ovt.conf.embeddedClass)
        .get(0);
    };
    getVidControls = function (b) {
      if (!a(b).is(a.qg.ovt.conf.containerSelector)) {
        b = getVidContainer(b);
      }
      return a(b).find("." + a.qg.ovt.conf.controlsClass);
    };
    getVidContainer = function (b) {
      if (a(b).is(a.qg.ovt.conf.containerSelector)) {
        return a(b);
      }
      return a(b).parents(a.qg.ovt.conf.containerSelector);
    };
    findVidContainer = function (b) {
      if (a(b).is(a.qg.ovt.conf.containerSelector)) {
        return a(b);
      }
      return a(b).find(a.qg.ovt.conf.containerSelector);
    };
    padString = function (d, c, b) {
      while ((d + "").length < c) {
        d = b + d;
      }
      return d;
    };
    secondsFormatted = function (b, c) {
      if (parseInt(c, 10) == 0) {
        return ["", ""];
      }
      totalSeconds = parseInt(b, 10);
      seconds = Math.floor(b % 60);
      secondsPadded = padString(seconds, 2, "0");
      rawMinutes = Math.floor(b / 60);
      minutes = Math.floor(rawMinutes % 60);
      hours = Math.floor(rawMinutes / 60);
      if (c >= 3600) {
        formattedShort =
          hours + ":" + padString(minutes, 2, "0") + ":" + secondsPadded;
      } else {
        formattedShort = minutes + ":" + secondsPadded;
      }
      formattedLong = "";
      if (hours > 0) {
        formattedLong += hours + " hour" + (hours != 1 ? "s" : "") + ", ";
      }
      if (hours > 0 || minutes > 0) {
        formattedLong +=
          minutes + " minute" + (minutes != 1 ? "s" : "") + " and ";
      }
      formattedLong += seconds + " second" + (seconds != 1 ? "s" : "");
      return [formattedShort, formattedLong];
    };
    a.fn.focusClass = function () {
      a(this)
        .focus(function () {
          a(this).addClass("focus");
        })
        .blur(function () {
          a(this).removeClass("focus");
        });
      return this;
    };
    a(document).ready(function () {
      if (a.browser.msie6) {
        document.execCommand("BackgroundImageCache", false, true);
      }
      if (typeof PATH_TO_OVT_PLAYER != "undefined") {
        a(".qg-ovt").qgOvt((options = { playerswf: PATH_TO_OVT_PLAYER }));
      } else {
        a(".qg-ovt").qgOvt();
      }
    });
  })(jQuery);
}
consoleMessage = function (b, a) {
  if (typeof console != "undefined") {
    switch (a) {
      case "error":
      case "exception":
        console.error(b);
        break;
      case "warn":
      case "warning":
        console.warn(b);
        break;
      case "notice":
      case "log":
        console.log(b);
        break;
      default:
      case "debug":
        if (console.debug) {
          console.debug(b);
        } else {
          console.log(b);
        }
        break;
    }
  }
};
