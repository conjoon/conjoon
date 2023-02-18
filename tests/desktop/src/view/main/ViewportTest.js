/**
 * conjoon
 * Copyright (C) 2023 Thorsten Suckow-Homberg https://github.com/conjoon/conjoon
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

    const create = () => Ext.create("conjoon.view.main.Viewport");


    t.beforeEach(() => {

    });

    t.afterEach(() => {

    });

    // +--------------------------------------------
    // |                  Tests
    // +--------------------------------------------
    t.it("should configure with component state information", t => {
        let viewport = create();

        t.expect(viewport.getStateId()).toBe("cn_app-mainviewport");
        t.expect(viewport.stateful.micro).toBe(true);
        t.expect(viewport.stateEvents).toEqual([]);

        viewport.destroy();
        viewport = null;
    });


    t.it("hideNavigation()", t => {

        let viewport = create();

        const onStateChangeSpy = t.spyOn(viewport, "onStateChange").and.callFake(() => {});
        const microNavigationSpy = t.spyOn(viewport, "microNavigation").and.callFake(() => {});

        const HIDE = false;

        viewport.hideNavigation(HIDE);

        t.expect(onStateChangeSpy.calls.count()).toBe(1);
        t.expect(microNavigationSpy.calls.mostRecent().args[0]).toBe(HIDE);

        [onStateChangeSpy, microNavigationSpy].map(spy => spy.remove());

        viewport.destroy();
        viewport = null;
    });


    t.it("getState() / applyState()", t => {

        let viewport = create();

        const FAKE_MICRO_VALUE = {};

        const navTreeSpy = t.spyOn(viewport, "getNavTree").and.callFake(() => ({getMicro: () => FAKE_MICRO_VALUE}));
        const microNavigationSpy = t.spyOn(viewport, "microNavigation").and.callFake(() => {});

        const state = viewport.getState();

        t.expect(state.micro).toBe(FAKE_MICRO_VALUE);

        viewport.applyState(state);

        t.expect(microNavigationSpy.calls.mostRecent().args[0]).toBe(!!FAKE_MICRO_VALUE);

        [navTreeSpy, microNavigationSpy].map(spy => spy.remove());


        viewport.destroy();
        viewport = null;
    });
});