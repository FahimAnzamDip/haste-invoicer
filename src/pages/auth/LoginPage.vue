<template>
    <q-page class="bg-secondary">
        <div class="row flex-center" style="height: 100vh">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                <q-form @submit.prevent="login" autofocus>
                    <q-card class="q-pa-md">
                        <q-card-section>
                            <h4 class="text-weight-bold text-center q-mb-md">Haste Invoicer</h4>
                        </q-card-section>
                        <q-card-section>
                            <q-input
                                class="q-mb-md"
                                square
                                filled
                                clearable
                                v-model="form.email_or_mobile"
                                type="email"
                                label="email"
                                lazy-rules
                                :rules="[(val) => (val && val.length > 0) || 'Please enter username']"
                            />
                            <q-input
                                class=""
                                square
                                filled
                                clearable
                                lazy-rules
                                :rules="[(val) => (val && val.length > 0) || 'Please enter password']"
                                v-model="form.password"
                                type="password"
                                label="password"
                            />
                        </q-card-section>
                        <q-card-actions class="q-px-md q-pb-md">
                            <q-btn type="submit" :loading="loading" unelevated color="accent" size="lg" class="full-width" label="Login" />
                        </q-card-actions>
                    </q-card>
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { userAuthStore } from 'src/stores/auth-store';

const $q = useQuasar();
const $router = useRouter();
const $store = userAuthStore();

let loading = ref(false);

let form = reactive({
    email_or_mobile: '',
    password: '',
});

let login = () => {
    loading.value = true;

    $store
        .login(form)
        .then((response) => {
            loading.value = false;
            if (response.status) {
                if (response.data.is_admin) {
                    $router.push({ path: '/' });
                    $q.notify({
                        color: 'positive',
                        position: 'top',
                        message: 'Login Successful',
                        icon: 'verified_user',
                    });
                }
            } else {
                $q.notify({
                    color: 'negative',
                    position: 'top',
                    message: 'Your credentials does not match',
                    icon: 'error',
                });
            }
        })
        .catch((error) => {
            loading.value = false;
            $q.notify({
                color: 'negative',
                position: 'top',
                message: error.message,
                icon: 'error',
            });
        });
};
</script>

<style lang="sass"></style>
