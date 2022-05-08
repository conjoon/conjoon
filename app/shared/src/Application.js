/**
 * conjoon
 * conjoon
 * Copyright (C) 2017-2022 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define("conjoon.Application", {

    extend: "coon.comp.app.Application",

    requires: [
        // @define l8
        "l8",
        "conjoon.view.main.Viewport",
        "coon.core.ConfigManager",
        "coon.comp.component.AnnouncementBar"
    ],

    controllers: [
        "coon.navport.app.PackageController"
    ],

    name: "conjoon",

    mainView: "conjoon.view.main.Viewport",


    /**
     * launches the app.
     */
    launch () {

        Ext.fireEvent(
            "conjoon.application.TitleAvailable",
            this,
            coon.core.ConfigManager.get("conjoon", "tagline")
        );

        if (!["denied", "granted"].includes(Notification.permission)) {
            coon.Announcement.show({
                "message": "Would you like to receive desktop notifications from conjoon?",
                "yes": {text: "Options...", callback: () => Notification.requestPermission()},
                "type": "info"
            });
        }

        const announcement = coon.core.ConfigManager.get("conjoon", "announcement");
        if (announcement) {
            coon.Announcement.show({
                "message": announcement.message,
                "type": "success"
            });
        }
    },


    /**
     *
     * @returns {*}
     */
    launchHook: function () {
        Ext.getBody().removeCls("launching");

        const splash = document.getElementById("splash");
        if (splash) {
            splash.parentNode.removeChild(splash);
        }

        Ext.ariaWarn = Ext.emptyFn;

        return this.callParent(arguments);
    },


    /**
     * Callback for an application update detected by this application.
     */
    onAppUpdate () {
        "use strict";

        coon.Announcement.show({
            "message": "This application has an update, reload?",
            "yes": () => window.location.reload(),
            "no": bar => bar.hide(),
            "type": "warning"
        });
    }
});
