/**
 * conjoon
 * conjoon
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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
