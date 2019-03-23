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

describe('conjoon.ApplicationTest', function(t) {

    var application;


    t.afterEach(function() {
        if (application) {
            application.destroy();
            application = null;
        }
    });

    t.it("Should test the Application", function(t) {

        application = Ext.create('conjoon.Application');

        t.expect(application instanceof coon.comp.app.Application).toBe(true);

        t.expect(application.getName()).toBe('conjoon');
        t.expect(application.getDefaultToken()).not.toBe('home');
        t.expect(application.applicationViewClassName).toBe('conjoon.view.main.Viewport');

        t.expect(application.controllers.items[0].$className).toBe('coon.navport.app.PackageController');
    });

});
