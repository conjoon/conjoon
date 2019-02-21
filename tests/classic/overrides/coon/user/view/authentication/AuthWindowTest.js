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

describe('conjoon.overrides.coon.user.view.authentication.AuthWindowTest', function(t) {

    var form;

    t.afterEach(function() {
        if (form) {
            form.destroy();
            form = null;
        }
    });

    // load override first
    t.requireOk('conjoon.overrides.coon.user.view.authentication.AuthWindow', function() {

        t.it("Should properly override the AuthWindow", function(t) {

            var window = Ext.create('coon.user.view.authentication.AuthWindow', {renderTo : document.body});

            t.isInstanceOf(window.down('cn_user-authform'), 'coon.user.view.authentication.AuthForm');

        });

    });



});
