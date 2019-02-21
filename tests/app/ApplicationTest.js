/**
 * conjoon
 * (c) 2007-2017 conjoon.org
 * licensing@conjoon.org
 *
 * conjoon
 * Copyright (C) 2017 Thorsten Suckow-Homberg/conjoon.org
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

        t.expect(application.controllers.items.length).toBe(3);
    });

});
