import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { api } from 'src/boot/axios';

export const userAuthStore = defineStore('auth', {
    state: () => ({
        user: LocalStorage.getItem('user'),
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        getUser: (state) => state.user,
        token: (state) => state.user.token,
    },
    actions: {
        login(form) {
            if (this.isAuthenticated) return this.validate();

            return api.post('auth/login', form).then((response) => {
                const user = response.data.data;
                this.user = user;
                LocalStorage.set('user', user);
                api.defaults.headers.common['Authorization'] = this.user ? 'Bearer ' + this.user.token : '';
                return response.data;
            });
        },
        validate() {
            if (!this.user) return Promise.resolve(null);

            api.defaults.headers.common['Authorization'] = this.user ? 'Bearer ' + this.user.token : '';

            return api
                .get('auth/validate')
                .then((response) => {
                    if (response.data.message === 'Malformed authentication token') {
                        localStorage.removeItem('user');
                        this.logout();
                    } else {
                        const user = response.data.data;
                        this.user = user;
                        LocalStorage.set('user', user);
                        api.defaults.headers.common['Authorization'] = this.user ? 'Bearer ' + this.user.token : '';
                        return response.data;
                    }
                })
                .catch((error) => {
                    this.logout();
                    if (error.response.status === 401) {
                        this.logout();
                    }
                    return null;
                });
        },
        logout() {
            this.user = null;
            LocalStorage.remove('user');
            api.defaults.headers.common['Authorization'] = this.user ? 'Bearer ' + this.user.token : '';
        },
    },
});
