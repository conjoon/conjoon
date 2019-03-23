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
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('conjoon.Application', {

    extend: 'coon.comp.app.Application',

    requires : [
        'conjoon.view.main.Viewport'
    ],

    controllers : [
        'coon.navport.app.PackageController'
    ],

    name : 'conjoon',


    applicationViewClassName : 'conjoon.view.main.Viewport',

});
