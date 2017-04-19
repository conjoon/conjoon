var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'My Tests',
    disableCaching : true,
    loaderPath     : {


        'conjoon.Application' : '../app/Application.js',

        'conjoon.view' : '../classic/src/view',

        'conjoon.test.view.mock' : './classic/src/view/mock',

        /**
         * Universal
         */
        'conjoon.cn_treenavviewport' : '../../packages/local/app-cn_treenavviewport/src',

        /**
         * Classic
         */
        'conjoon.overrides' : '../classic/overrides',
        'conjoon.cn_treenavviewport.view' : '../../packages/local/app-cn_treenavviewport/classic/src/view',
        'conjoon.cn_mail.view'            : '../../packages/local/app-cn_mail/classic/src/view',

        /**
         * Requirements
         */
        'conjoon.cn_user.view'      : '../../packages/local/app-cn_user/classic/src/view',
        'conjoon.cn_core'           : '../../packages/local/lib-cn_core/src',
        'conjoon.cn_comp.container' : '../../packages/local/lib-cn_comp/classic/src/container',
        'conjoon.cn_comp.app'       : '../../packages/local/lib-cn_comp/src/app',
        'conjoon.cn_comp.list'      : '../../packages/local/lib-cn_comp/classic/src/list',
        'conjoon.cn_comp.window'    : '../../packages/local/lib-cn_comp/classic/src/window',
        'conjoon.cn_comp.form'      : '../../packages/local/lib-cn_comp/classic/src/form'
    },
    preload        : [
        conjoon.tests.config.paths.extjs.css.url,
        conjoon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : 'universal',
    items : [{
        group   : 'app',
        pageUrl : '../index.html?unittest',
        items   : [
            'app/ApplicationTest.js'
        ]
    }]
    },{
    group : 'classic',
    items : [{
        group : 'overrides',
        items : [{
            group : 'cn_user',
            items : [{
                group : 'view',
                items : [{
                    group : 'authentication',
                    items : [
                        'classic/overrides/cn_user/view/authentication/AuthWindowTest.js'
                    ]
                }]
            }]
        }]


    }, {
        group : 'view',
        items : [{
            group : 'main',
            items : [
                'classic/src/view/main/ViewportTest.js',
                {
                group : 'controller',
                items : [
                    'classic/src/view/main/controller/ViewportControllerTest.js',
                ]}
            ]
        }]
    }]
});
