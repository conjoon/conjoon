/**
 * conjoon
 * conjoon
 * Copyright (C) 2022 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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
 *
 */
export default {

    name: "conjoon",

    timeout: 750,

    loaderPath: {

        "Ext.Package": "../node_modules/@coon-js/extjs-package-loader/packages/package-loader/src/Package.js",
        "Ext.package": "../node_modules/@coon-js/extjs-package-loader/packages/package-loader/src/package",

        /**
         * Universal
         */
        "conjoon.Application": "../app/shared/src/Application.js",
        "conjoon.plugin.TitleChangePlugin": "../app/shared/src/plugin/TitleChangePlugin.js",

        /**
         * Classic
         */
        "conjoon": "../app/desktop/src",

        /**
         * Requirements
         */
        "coon.core": "../node_modules/@coon-js/extjs-lib-core/src/",
        "coon.comp": "../node_modules/@coon-js/extjs-lib-comp/src/",
        "coon.navport": "../node_modules/@coon-js/extjs-comp-navport/src/",

        "coon.comp.component.AnnouncementBar": "../node_modules/@coon-js/extjs-lib-comp/classic/src/component/AnnouncementBar.js",
        "coon.navport.view.NavigationToolbar": "../node_modules/@coon-js/extjs-comp-navport/classic/src/view/NavigationToolbar.js",
        "coon.navport.view.NavigationViewport": "../node_modules/@coon-js/extjs-comp-navport/classic/src/view/NavigationViewport.js",
        "coon.comp.container.Viewport": "../node_modules/@coon-js/extjs-lib-comp/classic/src/container/Viewport.js"
    },
    preload: {
        js: "../node_modules/@l8js/l8/dist/l8.runtime.umd.js"
    }
};
