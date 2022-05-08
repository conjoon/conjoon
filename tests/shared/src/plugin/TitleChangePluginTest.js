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

StartTest(t => {
    "use strict";

    t.requireOk(
        "coon.core.ConfigManager", () => {

            let plugin = null;

            const
                CLASS_NAME = "conjoon.plugin.TitleChangePlugin";

            // +-------------------------------------------------------
            // | Set up
            // +-------------------------------------------------------
            t.beforeEach(function () {
                plugin = Ext.create(CLASS_NAME);
                coon.core.ConfigManager.configs = undefined;
                coon.core.ConfigManager.register("conjoon", {titleTpl: "TITLE_TPL"});
            });


            // +-------------------------------------------------------
            // | Tear down
            // +-------------------------------------------------------
            t.afterEach(function () {

                coon.core.ConfigManager.configs = {};

                if (!plugin) {
                    return;
                }

                plugin.destroy();
                plugin = null;
            });


            // +-------------------------------------------------------
            // | Tests
            // +-------------------------------------------------------

            t.it("constructor", function (t) {
                t.isInstanceOf(plugin, "coon.core.app.plugin.ApplicationPlugin");
            });


            t.it("run()", function (t) {

                let spy = t.spyOn(Ext.GlobalEvents, "on");
                t.expect(plugin.run()).toBe(true);
                t.expect(plugin.run()).toBe(false);

                t.expect(spy.calls.mostRecent().args).toEqual([
                    "conjoon.application.TitleAvailable", plugin.onTitleAvailable, plugin
                ]);
                spy.remove();
            });


            t.it("destroy()", function (t) {

                let spy = t.spyOn(Ext.GlobalEvents, "un");
                t.expect(plugin.run()).toBe(true);
                plugin.destroy();
                t.expect(spy.calls.mostRecent().args).toEqual([
                    "conjoon.application.TitleAvailable", plugin.onTitleAvailable, plugin
                ]);

                spy.remove();
            });


            t.it("onTitleAvailable()", function (t) {

                const _l8 = window.l8;
                window.l8 = {template: {esix: {make: function (){}}}};

                const
                    renderStub = {render: function () {return "RENDERED";}},
                    renderSpy = t.spyOn(renderStub, "render").and.callThrough(),
                    tplSpy = t.spyOn(l8.template.esix, "make").and.callFake(() => renderStub),
                    cfgSpy = t.spyOn(coon.core.ConfigManager, "get").and.callFake(() => "VALUE");

                const docTitle = plugin.onTitleAvailable({}, "TITLE_ARG");
                t.expect(docTitle).toBeTruthy();
                t.expect(docTitle).toBe(document.title);


                t.expect(tplSpy.calls.mostRecent().args).toEqual([
                    cfgSpy.calls.mostRecent().returnValue
                ]);

                t.expect(renderSpy.calls.mostRecent().args).toEqual([{
                    title: "TITLE_ARG"
                }]);
                t.expect(cfgSpy.calls.mostRecent().args).toEqual(["conjoon", "titleTpl"]);

                window.l8 = _l8;

                [renderSpy, tplSpy, cfgSpy].map(spy => spy.remove());
            });

        });
});
