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
 * Plugin for showing a random quote from a list of quotes in the ContentContainer
 * of the Navigation Viewport upon startup.
 * Will do nothing if the application routes into a submodule that gets added to the ContentContainer.
 *
 * @example
 *
 *      Ext.create("conjoon.plugin.WorkbenchQuotes", {
 *           "template": "./resources/templates/html/workbench_quotes.html.tpl",
 *            "url": "./resources/json/workbench_quotes.list.json"
 *      });
 *
 *  // or via configuration
 *
 *   "conjoon": {
 *        "plugins":{
 *           "components": [
 *               {
 *                   "cmp": "cn_navport-conctr",
 *                   "pclass": "conjoon.plugin.WorkbenchQuotes",
 *                   "event": "afterrender",
 *                   "args": [
 *                       {
 *                           "template": "./resources/templates/html/workbench_quotes.html.tpl",
 *                           "url": "./resources/json/workbench_quotes.list.json"
 *                       }
 *                   ]
 *               }
 *           ]
 *       },
 *       // ...
 *
 */
Ext.define("conjoon.plugin.WorkbenchQuotes", {

    extend: "Ext.plugin.Abstract",

    requires: [
        // @define l8
        "l8",
        "coon.navport.view.ContentContainer",
        "coon.core.Template"
    ],

    id: "conjoon-workbenchquotes",

    /**
     * The url for fetching the JSOn from
     * @cfg {String} url
     */


    /**
     * @inheritdoc
     * @param {Object} cfg
     * @param {String} cfg.url The url to load the quotes form
     * @param {String} cfg.template The template to render a random quote into
     *
     * @throws error if url or template is not specified
     */
    constructor (cfg) {
        "use strict";

        if (!cfg.url) {
            throw new Error("\"url\" missing for WorkbenchQuotes");
        }

        if (!cfg.template) {
            throw new Error("\"template\" missing for WorkbenchQuotes");
        }

        const me = this;

        me.template = cfg.template;
        me.url = cfg.url;
    },


    /**
     * Inits this plugin.
     * Loads the quotes and renders a random quote into the template this plugin was configured with.
     *
     * @throws error if targetCmp is not an instance of {coon.navport.view.ContentContainer}
     *
     * @return {?String} The rendered quote, if no error occured.
     */
    async init (targetCmp) {
        "use strict";

        if (!(targetCmp instanceof coon.navport.view.ContentContainer)) {
            throw new Error("\"targetCmp\" must be an instance of coon.navport.view.ContentContainer");
        }

        const
            me = this,
            quotes = await me.loadQuotes();

        return await me.renderQuote(
            me.getRandomQuote(quotes),
            targetCmp
        );
    },


    /**
     * Renders the quote into the targetCmp, if, and only if the
     * targetCmp has no childs yet.
     * The returned value is the rendered html which can be a default value if the template
     * this plugin was configured with yould not be loaded.
     *
     * @param {Object} quote
     * @param {String} quote.text
     * @param {String} quote.author
     * @param {coon.navport.view.ContentContainer} targetCmp
     *
     * @return {?String} the rendered html.
     */
    async renderQuote (quote, targetCmp) {
        "use strict";

        const
            me = this,
            target = targetCmp.el.dom;

        if (target.childNodes.length !== 0) {
            me.destroy();
            return;
        }

        let tpl, html = "-";

        try {
            tpl = await coon.core.Template.load(me.template);
            html = tpl.render({quote: quote});
        } catch (e) {
            me.destroy();
            return;
        }

        // targetCmp should have cardLayout, remove the quote and destroy this plugin
        // since it will not be needed if the workbench fills up with modules
        targetCmp.on("beforeadd", me.onBeforeContainerAdd, me, {single: true});
        target.innerHTML = html;

        return html;
    },


    /**
     * Called before the targetCmp gets a child added to its card layout.
     * Will remove all the childs of the container, which should be only the elements added by
     * this plugin.
     *
     * @param {coon.navport.view.ContentContainer} targetCmp
     */
    onBeforeContainerAdd (targetCmp) {
        "use strict";

        const
            me = this,
            parent = targetCmp.el.dom;

        while (parent.childNodes.length) {
            parent.removeChild(parent.lastChild);
        }

        me.destroy();
    },


    /**
     * Returns a single quote out of the list of quotes. The index is randomized.
     *
     * @param {Array} quotes
     *
     * @returns {{author: string, text: string}}
     */
    getRandomQuote (quotes) {
        "use strict";

        const
            min = 0,
            max = quotes.length - 1,
            index = Math.floor(Math.random() * (max - min + 1)) + min;

        return quotes[index];
    },


    /**
     * Loads the quote list from the url this plugin was configured with.
     * Will return a default list containing 1 default quote.
     *
     * @returns {Promise<[{author: string, text: string}]>}
     */
    async loadQuotes () {
        "use strict";

        const me = this;

        let res, quotes;

        try {
            res = await l8.load(me.url);
            quotes = JSON.parse(res);
        } catch (e) {
            quotes = [{
                text: "Sorry, I have no quote for you today.",
                author: "conjoon.org"
            }];
        }

        return quotes;
    }

});
