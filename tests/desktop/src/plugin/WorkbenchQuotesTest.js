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

StartTest(async t => {
    "use strict";

    let plugin;

    const
        create = cfg => Ext.create("conjoon.plugin.WorkbenchQuotes", cfg),
        defaultCfg = {
            template: "./fixtures/template.html.tpl",
            url: "./fixtures/quotes.json"
        },
        getDomMock = childNodes => ({
            on () {

            },
            el: {
                dom: {
                    removeChild (child) {
                        // ignore argument and simply pop() elements
                        this.childNodes.pop();
                    },
                    childNodes
                }
            }
        });


    t.beforeEach(() => {

    });

    t.afterEach(() => {
        "use strict";

        if (plugin) {
            plugin.destroy();
            plugin = null;
        }

    });

    // +--------------------------------------------
    // |                  Tests
    // +--------------------------------------------
    t.it("constructor()", t => {

        let exc;

        try {
            plugin = create({template: "file"});
        } catch (e) {
            exc = e;
        }

        t.expect(exc.message).toContain("url");

        try {
            plugin = create({url: "url"});
        } catch (e) {
            exc = e;
        }

        t.expect(exc.message).toContain("template");

        plugin = create({template: "file", url: "url"});

        t.isInstanceOf(plugin, "Ext.plugin.Abstract");

        t.expect(plugin.id).toBe("conjoon-workbenchquotes");

        t.expect(plugin.url).toBe("url");
        t.expect(plugin.template).toBe("file");
    });


    t.it("loadQuotes()", async t => {
        plugin = create(defaultCfg);

        let res = await plugin.loadQuotes();
        t.expect(res.length).toBe(2);

        plugin.url = "./fixtures/missing";
        res = await plugin.loadQuotes();
        t.expect(res.length).toBe(1);
        t.expect(res[0].text).toContain("no quote");

        let jsonSpy = t.spyOn(JSON, "parse").and.callFake(() => {throw("error");});
        plugin.url = defaultCfg.url;
        res = await plugin.loadQuotes();
        t.expect(res.length).toBe(1);
        t.expect(res[0].text).toContain("no quote");

        jsonSpy.remove();
    });


    t.it("getRandomQuote()", t => {
        plugin = create(defaultCfg);

        const quotes = ["abc", "def"];

        let res = plugin.getRandomQuote(quotes);
        t.expect(quotes.includes(res)).toBe(true);
    });


    t.it("onBeforeContainerAdd()", t => {

        plugin = create(defaultCfg);

        t.isCalledOnce("destroy", plugin);

        const targetCmp = getDomMock([1, 2, 3]);

        t.isCalledNTimes("removeChild", targetCmp.el.dom, 3);

        plugin.onBeforeContainerAdd(targetCmp);
    });


    t.it("renderQuote()", async t => {

        let quote, targetCmp;

        // targetCmp has children
        plugin = create(defaultCfg);
        quote = {author: "name", text: "quote"};
        targetCmp = getDomMock([1]);
        t.isCalledOnce("destroy", plugin);
        t.expect(await plugin.renderQuote(quote, targetCmp)).toBeUndefined();
        plugin = null;

        // could not load template
        plugin = create(defaultCfg);
        plugin.template = "./fixtures/missing";
        quote = {author: "name", text: "quote"};
        targetCmp = getDomMock([]);
        t.isCalledOnce("destroy", plugin);
        t.expect(await plugin.renderQuote(quote, targetCmp)).toBeUndefined();
        plugin = null;

        // could not render
        plugin = create(defaultCfg);
        let renderSpy = t.spyOn(l8.template.esix.StringTemplate.prototype, "render").and.callFake(
            () => {throw("");}
        );
        quote = {author: "name", text: "quote"};
        targetCmp = getDomMock([]);
        t.isCalledOnce("destroy", plugin);
        t.expect(await plugin.renderQuote(quote, targetCmp)).toBeUndefined();
        renderSpy.remove();
        plugin = null;

        // pass
        plugin = create(defaultCfg);
        targetCmp = getDomMock([]);
        let onSpy = t.spyOn(targetCmp, "on").and.callThrough();
        renderSpy = t.spyOn(l8.template.esix.StringTemplate.prototype, "render").and.callFake(
            () => "RENDERED"
        );
        quote = {author: "name", text: "quote"};
        t.expect(await plugin.renderQuote(quote, targetCmp)).toBe("RENDERED");
        t.expect(onSpy.calls.all().length).toBe(1);
        t.expect(renderSpy.calls.mostRecent().args[0].quote).toBe(quote);
        let args = onSpy.calls.mostRecent().args;
        t.expect(args[0]).toBe("beforeadd");
        t.expect(args[1]).toBe(plugin.onBeforeContainerAdd);
        t.expect(args[2]).toBe(plugin);
        t.expect(args[3]).toEqual({single: true});

        onSpy.remove();
        renderSpy.remove();
        plugin = null;
    });


    t.it("init()", async t => {

        plugin = create(defaultCfg);

        let exc;

        try {
            await plugin.init({});
        } catch (e) {
            exc = e;
        }
        t.expect(exc.message).toContain("must be an instance of coon.navport.view.ContentContainer");


        const
            targetCmp = Ext.create("coon.navport.view.ContentContainer"),
            quotes = [],
            loadQuotesSpy = t.spyOn(plugin, "loadQuotes").and.callFake(async () => quotes),
            getRandomQuoteSpy = t.spyOn(plugin, "getRandomQuote").and.callFake(() => "quote"),
            renderQuoteSpy = t.spyOn(plugin, "renderQuote").and.callFake(() => "rendered");

        t.expect(await plugin.init(targetCmp)).toBe("rendered");

        t.expect(getRandomQuoteSpy.calls.mostRecent().args[0]).toBe(quotes);

        t.expect(renderQuoteSpy.calls.mostRecent().args[0]).toBe("quote");
        t.expect(renderQuoteSpy.calls.mostRecent().args[1]).toBe(targetCmp);

        [loadQuotesSpy, getRandomQuoteSpy, renderQuoteSpy].map(spy => spy.remove());
    });

});