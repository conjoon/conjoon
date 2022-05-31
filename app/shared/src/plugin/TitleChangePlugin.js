/**
 * conjoon
 * conjoon
 * Copyright (C) 2022 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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
 * ApplicationPlugin for changing the title based on the information sent with the global
 * "conjoon.application.TitleAvailable"-event and the "titleTpl" found in the configuration
 * of the application.
 */
Ext.define("conjoon.plugin.TitleChangePlugin", {

    extend: "coon.core.app.plugin.ApplicationPlugin",

    requires: [
        // @define l8
        "l8",
        "coon.core.ConfigManager"
    ],

    /**
     * @type {boolean} initialized
     * @private
     */


    /**
     * Registers to global event conjoon.application.TitleAvailable for changing the
     * document title.
     *
     * @param {coon.core.app.PackageController} packagerController
     *
     * @return {Boolean} true if plugin was properly initialized, otehrwise false
     */
    run: function (controller) {
        "use strict";

        const me = this;

        if (me.initialized) {
            return false;
        }

        Ext.GlobalEvents.on("conjoon.application.TitleAvailable", me.onTitleAvailable, me);

        me.initialized = true;
        return true;
    },


    /**
     * Callback for the global conjoon.application.TitleAvailable-event.
     * Looks up the titleTpl in the configuration and renders it along with the
     * passed title value as document.title.
     *
     * @param {*} source
     * @param {String} title
     *
     * @return {String} The value to which document.title was set
     */
    onTitleAvailable (source, title) {

        let tpl = l8.template.esix.make(
            coon.core.ConfigManager.get("conjoon", "titleTpl")
        );

        const docTitle = tpl.render({title: title});
        document.title = docTitle;

        return docTitle;
    },


    /**
     * @inheritdoc
     * Removes the callback for the global event
     */
    destroy () {
        const me = this;
        Ext.GlobalEvents.un("conjoon.application.TitleAvailable", me.onTitleAvailable, me);
        me.callParent(arguments);
    }
});