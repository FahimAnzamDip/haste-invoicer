const routes = [
    {
        path: '/auth',
        redirect: '/auth/login',
        component: () => import('layouts/AuthLayout.vue'),
        meta: { guest: true },
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('pages/auth/LoginPage.vue'),
                meta: { title: 'Login' },
            },
        ],
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('pages/IndexPage.vue'),
            },
        ],
    },
    {
        path: '/categories',
        component: () => import('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            { path: '', name: 'categories', component: () => import('pages/products/categories/CategoryIndex.vue') },
            { path: 'add', name: 'categoriesAdd', component: () => import('pages/products/categories/CategoryAddEdit.vue') },
            { path: 'edit/:id', name: 'categoriesEdit', component: () => import('pages/products/categories/CategoryAddEdit.vue') },
        ],
    },
    {
        path: '/tags',
        component: () => import('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            { path: '', name: 'tags', component: () => import('pages/products/tags/TagIndex.vue') },
            { path: 'add', name: 'tagsAdd', component: () => import('pages/products/tags/TagAddEdit.vue') },
            { path: 'edit/:id', name: 'tagsEdit', component: () => import('pages/products/tags/TagAddEdit.vue') },
        ],
    },
    {
        path: '/taxes',
        component: () => import('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [
            { path: '', name: 'taxes', component: () => import('pages/taxes/TaxIndex.vue') },
            { path: 'add', name: 'taxesAdd', component: () => import('pages/taxes/TaxAddEdit.vue') },
            { path: 'edit/:id', name: 'taxesEdit', component: () => import('pages/taxes/TaxAddEdit.vue') },
        ],
    },
    {
        path: '/products',
        component: () => import('layouts/MainLayout.vue'),
        meta: { auth: true },
        children: [{ path: '', name: 'products', component: () => import('pages/products/ProductIndex.vue') }],
    },

    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
