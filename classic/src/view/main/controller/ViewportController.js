/**
 * conjoon
 * (c) 2007-2019 conjoon.org
 * licensing@conjoon.org
 *
 * conjoon
 * Copyright (C) 2019 Thorsten Suckow-Homberg/conjoon.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This is the extended controller for the main viewport of conjoon.
 * It derives from {@link coon.navport.view.controller.NavigationViewportController}
 * to add custom layout options to the navigation tree.
 */
Ext.define('conjoon.view.main.controller.ViewportController', {

    extend: 'coon.navport.view.controller.NavigationViewportController',

    alias: 'controller.cn_app-mainviewport-ctrl',

    /**
     * Callback for the {@link coon.navport.view.NavigationToolbar}'s
     * hideNavigation Button.
     *
     * @param {Ext.Button} btn
     *
     * see {@link #hideNavigation}
     */
    onHideNavigationClick : function(btn) {

        var me      = this,
            view    = me.getView(),
            navTree = view.lookup('cn_navport_ref_conwrap')
                          .lookup('cn_navport_ref_navtree');

        me.hideNavigation(!navTree.getMicro());
    },


    /**
     * Hides the NavigationTree by only setting it to Micro Mode.
     *
     * @param {Boolean} hide True to hide the NavigationTree, otherwise false.
     */
    hideNavigation : function(hide) {

        var me          = this,
            view        = me.getView(),
            contentWrap = view.lookup('cn_navport_ref_conwrap'),
            navTree     = contentWrap.lookup('cn_navport_ref_navtree'),
            appLogo     = view.lookup('cn_navport_ref_tbar')
                              .lookup('cn_navport_ref_applogo'),
            newWidth    = hide ? 64 : 250;

        appLogo.animate({
            dynamic : true,
            to      : {
                width : newWidth
            }
        });

        navTree.setWidth(newWidth);
        navTree.setMicro(hide);

       contentWrap.updateLayout({isRoot: true});
    }

});