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
 * This is the extended controller for the main viewport of conjoon.
 * It derives from {@link coon.navport.view.controller.NavigationViewportController}
 * to add custom layout options to the navigation tree.
 */
Ext.define("conjoon.view.main.controller.ViewportController", {

    extend: "coon.navport.view.controller.NavigationViewportController",

    alias: "controller.cn_app-mainviewport-ctrl",

    /**
     * Callback for the {@link coon.navport.view.NavigationToolbar}'s
     * hideNavigation Button.
     *
     * @param {Ext.Button} btn
     *
     * see {@link #hideNavigation}
     */
    onHideNavigationClick (btn) {

        var me      = this,
            view    = me.getView(),
            navTree = view.lookup("cn_navport_ref_conwrap")
                .lookup("cn_navport_ref_navtree");

        me.getView().hideNavigation(!navTree.getMicro());
    }

});