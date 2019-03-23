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

describe('conjoon.overrides.coon.comp.window.ToastTest', function(t) {

t.requireOk('conjoon.overrides.coon.comp.window.Toast', function() {


    t.it("constructor()", function(t) {

        let APPLICATION = Ext.getApplication;

        Ext.getApplication = function() {
            return {

                getMainView : function() {
                    return {
                        down : function(t) {
                            return t;
                        }
                    }
                }

            }
        };

        let toast = Ext.create("coon.comp.window.Toast", {});


        t.expect(toast.paddingX).toBe(10);

        t.expect(toast.anchor).toBe('cn_navport-tbar');

        Ext.getApplication = APPLICATION;
    });


});


});
