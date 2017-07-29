/**
 * @see https://www.sencha.com/forum/showthread.php?336762-Examples-don-t-work-in-Firefox-52-touchscreen
 */
Ext.define('conjoon.overrides.Ext.dom.Element', {
    override: 'Ext.dom.Element'
}, function(Element) {
var supports           = Ext.supports,
        proto          = Element.prototype,
        eventMap       = proto.eventMap,
        additiveEvents = proto.additiveEvents;

    if (Ext.os.is.Desktop && supports.TouchEvents && !supports.PointerEvents) {
        eventMap.touchstart  = 'mousedown';
        eventMap.touchmove   = 'mousemove';
        eventMap.touchend    = 'mouseup';
        eventMap.touchcancel = 'mouseup';

        additiveEvents.mousedown   = 'mousedown';
        additiveEvents.mousemove   = 'mousemove';
        additiveEvents.mouseup     = 'mouseup';
        additiveEvents.touchstart  = 'touchstart';
        additiveEvents.touchmove   = 'touchmove';
        additiveEvents.touchend    = 'touchend';
        additiveEvents.touchcancel = 'touchcancel';

        additiveEvents.pointerdown   = 'mousedown';
        additiveEvents.pointermove   = 'mousemove';
        additiveEvents.pointerup     = 'mouseup';
        additiveEvents.pointercancel = 'mouseup';
    }
});