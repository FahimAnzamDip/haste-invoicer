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
