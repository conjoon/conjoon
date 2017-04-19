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

/**
 * Custom form label for the AuthForm.
 */
Ext.define('conjoon.overrides.cn_user.view.authentication.AuthWindow', {

    override : 'conjoon.cn_user.view.authentication.AuthWindow',

    header : false,

    bodyCls: 'x-fa cn_user-authwindow',

    /**
     * @inheritdoc
     */
    initComponent : function() {

        var me = this;

        me.layout = {
            type  : 'vbox',
            align : 'stretch'
        };

        me.items = [{
            xtype  : 'container',
            flex   : 1,
            layout : {
                type  : 'vbox',
                align : 'center',
                pack  : 'center'
            },
            items : [
                me.items[0]
            ]
        }, {
            xtype : 'box',
            height : 80,
            cls   : 'copyrights',
            html  : '<div class="cont">' +
                      '<div class="prod">conjoon</div>' +
                      '<div class="meta">' +
                        '<span><a target="_blank" href="http://conjoon.org">About</a></span>' +
                        '<span>&#169; 2007-2017 conjoon Open Source Project</span>' +
                      '</div>' +
                    '</div>'
        }];

        me.callParent(arguments);
    }

});