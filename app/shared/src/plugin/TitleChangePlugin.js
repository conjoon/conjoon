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
 * ApplicationPlugin for registering a {coon.core.Theme} with the {coon.core.ThemeManager}
 * to make it generally available to an application.
 * Reads out configuration from the {coon.core.ConfigManager} for the theme's package and
 * applies its "modes"-value (if config available) to the theme.
 * 
 * Any theme that inherits from coon.core.Theme that should be considered with this plugin must obey to the following
 * conventions:
 * - Theme's information must be available for querying the environment using coon.core.Environment.get("theme.is.coon-js-theme"),
 *   which should return "true" to make sure this plugin can consume further theme information.
 *   coon.core.Environment.get("theme.name") should return the name of the theme's package.
 *   These settings are usually configured in a file called init.js, placed in the overrides-folder
 *   of the theme-package.
 * - The theme's class-name must be build as follows: "package_namespace.Theme", e.g. if the
 *   package's namespace is "acme.theme.colorTheme", the fqn of the theme-class extending {coon.core.Theme}
 *   must be "acme.theme.colorTheme.Theme"
 * - The theme's class must have been made available in the Application when this plugin tries to access it
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