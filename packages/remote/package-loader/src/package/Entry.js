Ext.define("Ext.package.Entry", {
    count: 0,
    loaded: false,
    
    constructor: function (name) {
        var me = this;

        me.packageName = name;
        me.jsUrl = Ext.getResourcePath(name + '.js', null, name);
        me.cssUrl = Ext.getResourcePath(name + '.css', null, name);

        me.promise = new Ext.Promise(function(resolve, reject) {
            me.resolveFn = resolve;
            me.rejectFn = reject;
        });
    },

    getRequires: function() {
        var me = this,
            metadata = me.metadata,
            reqs = me._requires, 
            requires, req;

        if (!reqs) {
            reqs = [];
            if (metadata && (requires = metadata.requires) && requires.length) {
                for (var i = 0; i < requires.length; i++) {
                    req = requires[i];
                    if (req != me.packageName) {
                        reqs.push(req);
                    }
                }
            }
            me._requires = reqs;
        }
        return reqs;
    },
    
    beginLoad: function () {
        var me = this;
        if (!me.loaded) {
            me.block();
            me.loadStyle();
            me.loadScript();
            me.unblock();
        }
    },

    loadStyle: function () {
        var metadata = this.metadata,
            required = metadata && metadata.required,
            css = metadata && metadata.css;

        if (css !== false && required !== true) {

            if (Array.isArray(css)) {
                for (i = 0; i < css.length; i++) {
                    this.load(css[i].path.replaceAll("${package.dir}/", Ext.getResourcePath('', null, this.packageName)));
                }
            } else {

                if (css !== false && required !== true) {
                    this.load(this.cssUrl);
                }
            }
        }
    },

    loadScript: function () {
        var metadata = this.metadata,
            files = metadata && metadata.files,
            manifest = Ext.manifest,
            loadOrder = manifest && manifest.loadOrder,
            paths = [],
            i,
            js = metadata.js;

        if (files && loadOrder) {

            for (i = 0; i < files.length; i++) {
                paths.push(loadOrder[files[i]].path);
            }
            this.load(paths);

        } else {

            if (metadata && !metadata.included) {

                if (Array.isArray(js)) {
                    for (i = 0; i < js.length; i++) {
                        this.load(js[i].path.replaceAll("${package.dir}/", Ext.getResourcePath('', null, this.packageName)));
                    }
                } else {
                    this.load(this.jsUrl);
                }

            }
        }

    },

    load: function (url) {
        var me = this;

        me.block();

        Ext.Boot.load({
            url: url,
            success: function () {
                me.unblock();
            },
            failure: function () {
                // css files are optional
                if (url.endsWith('.css')) {
                    me.unblock();
                } else if (!me.error) {
                    // Keep the first failure only
                    me.error = new Error('Failed to load "' + url + '"');
                    me.error.url = url;
                    me.unblock();
                }
            }
        });
    },

    block: function () {
        this.count++;
    },
    
    _wait: function (className) {
        var me = this;
        me.block();
        Ext.require(className, function(){
            me.unblock();
        });
    },
    
    _getPendingClasses: function() {
        var CM = Ext.ClassManager,
            classState = CM && CM.classState,
            pending, className;
        
        if (CM.getPendingClasses) {
            return CM.getPendingClasses();
        }
        else if (classState) {
            pending = [];
            for (className in classState) {
                if (className && className !== 'null') {
                    if (classState[className] < 30) {
                        pending.push(className);
                    }
                }
            }
            return pending;
        }
    },
    
    unblock: function () {
        var me = this;

        if (!me.error && me.count > 1) {
            me.count--;
        }
        else {
            me.count = 0;
            // on error, we're done so notify immediately
            var pending = me._getPendingClasses();
            
            if (pending && pending.length) {
                me._wait(pending);
            }
            else {
                me.notify();
            }
        }
    },
    
    notify: function () {
        var me = this;

        if (me.resolveFn) { // just once...
            me.count = 0;

            if (me.error) {
                me.rejectFn(me.error);
            }
            else {
                me.loaded = true;
                //<debug>
                console.log('Loaded package "' + me.packageName + '"');
                //</debug>
                me.resolveFn(me);
            }

            me.resolveFn = me.rejectFn = null;
        }
    }
});
