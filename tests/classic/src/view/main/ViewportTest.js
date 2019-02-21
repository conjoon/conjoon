/**
 * conjoon
 * (c) 2007-2016 conjoon.org
 * licensing@conjoon.org
 *
 * conjoon
 * Copyright (C) 2016 Thorsten Suckow-Homberg/conjoon.org
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

describe('conjoon.view.main.ViewportTest', function(t) {

    var viewport;


    t.afterEach(function() {
        if (viewport) {
            viewport.destroy();
            viewport = null;
        }
    });

    t.it("Should be using the custom controller", function(t) {
        viewport = Ext.create('conjoon.view.main.Viewport');

        t.expect(
            viewport.getController() instanceof conjoon.view.main.controller.ViewportController
        ).toBe(true);
    });


    t.it("Should be possible to resize the navigation to micromode", function(t) {
        viewport = Ext.create('conjoon.view.main.Viewport');


        t.expect(viewport.down('cn_navport-navtree').getWidth()).toBe(250);
        viewport.hideNavigation(true);
        t.expect(viewport.down('cn_navport-navtree').getWidth()).toBe(64);
        viewport.hideNavigation(false);
        t.expect(viewport.down('cn_navport-navtree').getWidth()).toBe(250);
    });


});
