var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'conjoon Tests',
    disableCaching : true,
    loaderPath     : {


        'conjoon.Application'    : '../app/Application.js',
        'conjoon.view'           : '../classic/src/view',

        /**
         * Classic app-cn_navport
         */
        'coon.navport.view.pages'              : '../../packages/local/lib-cn_navport/classic/src/view/pages',
        'coon.navport.view.ContentContainer'   : '../../packages/local/lib-cn_navport/classic/src/view/ContentContainer.js',
        'coon.navport.view.ContentWrap'        : '../../packages/local/lib-cn_navport/classic/src/view/ContentWrap.js',
        'coon.navport.view.NavigationToolbar'  : '../../packages/local/lib-cn_navport/classic/src/view/NavigationToolbar.js',
        'coon.navport.view.NavigationTree'     : '../../packages/local/lib-cn_navport/classic/src/view/NavigationTree.js',
        'coon.navport.view.NavigationViewport' : '../../packages/local/lib-cn_navport/classic/src/view/NavigationViewport.js',

        /**
         * Universal app-cn_navport
         */
        'coon.navport' : '../../packages/local/lib-cn_navport/src',


        /**
         * Classic
         */
        'conjoon.overrides.coon.comp.window.Toast'    : '../classic/overrides/coon.comp.window.Toast.js',
        'conjoon.cn_mail.view' : '../../packages/local/app-cn_mail/classic/src/view',


        /**
         * Requirements
         */
        'coon.user.view'      : '../../packages/local/lib-cn_user/classic/src/view',
        'coon.core'           : '../../packages/local/lib-cn_core/src',
        'coon.comp.container' : '../../packages/local/lib-cn_comp/classic/src/container',
        'coon.comp.app'       : '../../packages/local/lib-cn_comp/src/app',
        'coon.comp.list'      : '../../packages/local/lib-cn_comp/classic/src/list',
        'coon.comp.window'    : '../../packages/local/lib-cn_comp/classic/src/window',
        'coon.comp.form'      : '../../packages/local/lib-cn_comp/classic/src/form'
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
        pageUrl : '../index.html',
        items   : [
            'app/ApplicationTest.js'
        ]
    }]
    },{
    group : 'classic',
    items : [{
        group : 'overrides',
        items : ['classic/overrides/coon.comp.window.ToastTest.js']


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
