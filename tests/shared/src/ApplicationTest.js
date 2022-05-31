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
        "conjoon.Application", () => {
        
        
            t.beforeEach(() => {
    
            });
    
            t.afterEach(() => {
        
            });
    
            // +--------------------------------------------
            // |                  Tests
            // +--------------------------------------------

            t.it("launch()", t => {
                window.Notification = {
                    permission: []
                };

                let fireSpy = t.spyOn(Ext, "fireEvent").and.callFake(() => {});

                // no permission given yet
                let announcementSpy = t.spyOn(coon.Announcement, "show").and.callFake(() => {});
                conjoon.Application.prototype.launch();
                t.expect(announcementSpy.calls.mostRecent().args[0].message).toContain("desktop notifications");
                announcementSpy.remove();

                // denied / granted
                ["denied", "granted"].map(permission => {
                    window.Notification.permission = permission;
                    announcementSpy = t.spyOn(coon.Announcement, "show").and.callFake(() => {});
                    conjoon.Application.prototype.launch();
                    t.expect(announcementSpy.calls.all().length).toBe(0);
                    announcementSpy.remove();
                });

                // set for announcement test of config
                window.Notification.permission = "granted";

                t.expect(coon.core.ConfigManager.get("conjoon")).toBeUndefined();
                announcementSpy = t.spyOn(coon.Announcement, "show").and.callFake(() => {});
                conjoon.Application.prototype.launch();
                t.expect(announcementSpy.calls.all().length).toBe(0);
                announcementSpy.remove();

                let configSpy = t.spyOn(coon.core.ConfigManager, "get").and.callThrough();
                const APP_TITLE = "APP_TITLE";

                coon.core.ConfigManager.register("conjoon", {tagline: APP_TITLE, announcement: {message: "test announcement"}});
                announcementSpy = t.spyOn(coon.Announcement, "show").and.callFake(() => {});
                conjoon.Application.prototype.launch();
                t.expect(announcementSpy.calls.all().length).toBe(1);
                t.expect(announcementSpy.calls.mostRecent().args[0].message).toBe("test announcement");
                t.expect(announcementSpy.calls.mostRecent().args[0].type).toBe("success");

                t.expect(configSpy.calls.first().args).toEqual(["conjoon", "tagline"]);
                t.expect(fireSpy.calls.mostRecent().args).toEqual([
                    "conjoon.application.TitleAvailable",
                    conjoon.Application.prototype,
                    APP_TITLE
                ]);

                configSpy.remove();
                announcementSpy.remove();
                fireSpy.remove();
            });


            t.it("onAppUpdate()", t => {

                let announcementSpy = t.spyOn(coon.Announcement, "show").and.callFake(() => {});
                conjoon.Application.prototype.onAppUpdate();
                const args = announcementSpy.calls.mostRecent().args[0];
                t.expect(args.message).toContain("application has an update");
                t.expect(args.type).toBe("warning");

                t.expect(typeof args.yes).toBe("function");
                t.expect(typeof args.no).toBe("function");

                // yes
                t.expect("" + args.yes).toBe("() => window.location.reload()");

                // no
                let barMock = {hide: function (){}},
                    announcementHideSpy = t.spyOn(barMock, "hide").and.callThrough();
                args.no(barMock);
                t.expect(announcementHideSpy.calls.all().length).toBe(1);

                [announcementHideSpy, announcementSpy].map(spy => spy.remove());

            });
        
        });
});