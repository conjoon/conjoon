/**
 * conjoon
 * conjoon
 * Copyright (C) 2017-2023 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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
 * Custom viewport to make sure the {@link conjoon.view.main.controller.ViewportController}
 * is used with this view.
 */
Ext.define("conjoon.view.main.Viewport", {

    extend: "coon.navport.view.NavigationViewport",

    requires: [
        "conjoon.view.main.controller.ViewportController"
    ],

    controller: "cn_app-mainviewport-ctrl",

    stateId: "cn_app-mainviewport",

    stateful: {
        micro: true
    },

    stateEvents: [],

    getState () {
        const
            me   = this,
            navTree = me.getNavTree();

        return {
            micro: navTree.getMicro()
        };
    },


    applyState (state) {
        const me = this;
        me.microNavigation(!!state?.micro);
    },


    /**
     * Hides the NavigationTree by only setting it to Micro Mode.
     *
     * @param {Boolean} hide True to hide the NavigationTree, otherwise false.
     */
    hideNavigation (hide) {

        const
            me = this,
            contentWrap = me.lookup("cn_navport_ref_conwrap");

        me.microNavigation(hide);
        me.onStateChange();

        contentWrap.updateLayout({isRoot: true});
    },


    microNavigation (hide)
    {
        const
            me = this,
            navTree = me.getNavTree(),
            appLogo = me.getAppLogo(),
            width = hide ? 64 : 250;

        appLogo.animate({
            dynamic: true,
            to: {width}
        });

        navTree.setWidth(width);
        navTree.setMicro(hide);
    },


    getAppLogo () {
        const me = this;
        return me.lookup("cn_navport_ref_tbar").lookup("cn_navport_ref_applogo");
    },


    getNavTree () {
        const me = this;
        return me.lookup("cn_navport_ref_conwrap").lookup("cn_navport_ref_navtree");
    }
});