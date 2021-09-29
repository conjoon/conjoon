/**
 * conjoon
 * conjoon
 * Copyright (C) 2017-2021 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @see https://www.sencha.com/forum/showthread.php?336762-Examples-don-t-work-in-Firefox-52-touchscreen
 */
Ext.define("conjoon.overrides.Ext.dom.Element", {
    override: "Ext.dom.Element"
}, function (Element) {
    var supports           = Ext.supports,
        proto          = Element.prototype,
        eventMap       = proto.eventMap,
        additiveEvents = proto.additiveEvents;

    if (Ext.os.is.Desktop && supports.TouchEvents && !supports.PointerEvents) {
        eventMap.touchstart  = "mousedown";
        eventMap.touchmove   = "mousemove";
        eventMap.touchend    = "mouseup";
        eventMap.touchcancel = "mouseup";

        additiveEvents.mousedown   = "mousedown";
        additiveEvents.mousemove   = "mousemove";
        additiveEvents.mouseup     = "mouseup";
        additiveEvents.touchstart  = "touchstart";
        additiveEvents.touchmove   = "touchmove";
        additiveEvents.touchend    = "touchend";
        additiveEvents.touchcancel = "touchcancel";

        additiveEvents.pointerdown   = "mousedown";
        additiveEvents.pointermove   = "mousemove";
        additiveEvents.pointerup     = "mouseup";
        additiveEvents.pointercancel = "mouseup";
    }
});