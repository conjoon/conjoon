/**
 * @see https://www.sencha.com/forum/showthread.php?336762-Examples-don-t-work-in-Firefox-52-touchscreen
 */
Ext.define('conjoon.overrides.Ext.event.publisher.Gesture', {
    override: 'Ext.event.publisher.Gesture'
}, function(Gesture) {
    var me = Gesture.instance;

    if (Ext.supports.TouchEvents && !Ext.isWebKit && Ext.os.is.Desktop) {
        me.handledDomEvents.push('mousedown', 'mousemove', 'mouseup');
        me.registerEvents();
    }
});