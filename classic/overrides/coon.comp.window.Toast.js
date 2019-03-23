/**
 * This override makes sure that the Toast Window is always anchored to the
 * toolbar of the navport.
 */
Ext.define('conjoon.overrides.coon.comp.window.Toast', {
    override: 'coon.comp.window.Toast',


    constructor : function() {

        const me = this;

        me.callParent(arguments);

        me.paddingX = 10;

        me.anchor = Ext.getApplication().getMainView().down('cn_navport-tbar');
    }


});
