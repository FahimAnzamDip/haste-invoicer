<template>
    <q-layout view="lHh LpR lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" aria-label="Menu" />
                <q-toolbar-title class="text-weight-bold"> Haste Invoicer </q-toolbar-title>

                <q-avatar class="shadow-5" size="md">
                    <img src="https://www.gravatar.com/avatar/sfsdfsdsdf" />
                </q-avatar>
                <q-item>
                    <q-item-section class="text-subtitle1"> {{ $store.getUser.name }} </q-item-section>
                </q-item>
                <q-btn flat round dense icon="more_vert">
                    <q-menu style="width: 170px" transition-show="flip-right" transition-hide="flip-left">
                        <q-list>
                            <q-item clickable v-close-popup>
                                <q-item-section avatar>
                                    <q-icon color="info" name="account_circle" />
                                </q-item-section>
                                <q-item-section class="text-weight-medium">My Profile</q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item @click="logout" clickable v-close-popup>
                                <q-item-section avatar>
                                    <q-icon color="negative" name="logout" />
                                </q-item-section>
                                <q-item-section class="text-weight-medium">Logout</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above :width="300" :breakpoint="500" class="bg-grey-3 shadow-6">
            <q-list>
                <q-item clickable tag="a" to="/">
                    <q-item-section avatar>
                        <q-icon name="dashboard" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-weight-medium">Dashboard</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/categories">
                    <q-item-section avatar>
                        <q-icon name="category" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-weight-medium">Categories</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/tags">
                    <q-item-section avatar>
                        <q-icon name="sell" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-weight-medium">Tags</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/products">
                    <q-item-section avatar>
                        <q-icon name="inventory" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-weight-medium">Product List</q-item-label>
                    </q-item-section>
                </q-item>

                <q-expansion-item class="text-weight-medium" icon="settings" label="Settings">
                    <q-list class="q-pl-lg">
                        <q-item clickable tag="a" to="/taxes">
                            <q-item-section avatar>
                                <q-icon name="attach_money" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-weight-medium">Taxes</q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer>
            <q-toolbar>
                <q-toolbar-title class="text-center text-subtitle1">
                    Copyright &copy; {{ currentYear }} | All rights reserved by
                    <a style="color: #fff" href="https://github.com/FahimAnzamDip" target="_blank">Haste Invoicer</a>
                </q-toolbar-title>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { date } from 'quasar';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { userAuthStore } from 'src/stores/auth-store';

const $q = useQuasar();
const $router = useRouter();
const $store = userAuthStore();

const timeStamp = Date.now();
const currentYear = date.formatDate(timeStamp, 'YYYY');

const leftDrawerOpen = ref(false);

let logout = () => {
    $store.logout();
    $router.push({ name: 'login' });
    $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Logout Successful',
        icon: 'logout',
    });
};
</script>

<style lang="sass" scoped>
.q-item.q-router-link--active, .q-item--active
  background: #D2D9EB
</style>
