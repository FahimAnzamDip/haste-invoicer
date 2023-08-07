<template>
    <q-page>
        <div class="q-pa-md">
            <q-breadcrumbs class="text-brown q-mb-lg">
                <template v-slot:separator>
                    <q-icon size="1.5em" name="chevron_right" color="primary" />
                </template>

                <q-breadcrumbs-el label="Home" icon="home" to="/" />
                <q-breadcrumbs-el label="Taxes" icon="list" to="/taxes" />
                <q-breadcrumbs-el :label="route.params.id ? 'Edit' : 'Add'" :icon="route.params.id ? 'edit' : 'add_box'" />
            </q-breadcrumbs>
            <div class="row q-mb-lg">
                <div class="col-12">
                    <q-card>
                        <q-card-section>
                            <h5 v-if="route.params.id" class="q-mb-xl q-mt-none">Edit Tax</h5>
                            <h5 v-else class="q-mb-xl q-mt-none">Add Tax</h5>
                            <q-form @submit.prevent="addTag" autofocus class="q-gutter-lg">
                                <div class="row">
                                    <div class="col-12">
                                        <q-input
                                            v-model="form.name"
                                            square
                                            filled
                                            label="Tax Name"
                                            lazy-rules
                                            :rules="[(val) => (val && val.length > 0) || 'Please enter tax name']"
                                            :loading="loading"
                                        />
                                        <q-input
                                            v-model="form.percentage"
                                            square
                                            filled
                                            label="Percentage"
                                            lazy-rules
                                            :rules="[(val) => (val && val > 0) || 'Please enter tax name']"
                                            :loading="loading"
                                        />
                                    </div>
                                </div>

                                <div class="row justify-end">
                                    <q-btn type="submit" label="Save Changes" icon-right="done_all" color="accent" :loading="loading" />
                                </div>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import router from 'src/router';

const route = useRoute();
const $router = useRouter();
const $q = useQuasar();

let loading = ref(false);

let form = reactive({
    name: '',
    percentage: null,
});

onMounted(() => {
    if (route.params.id) {
        getTag();
    }
});

let getTag = () => {
    loading.value = true;
    api.get(`/taxes/${route.params.id}`)
        .then((response) => {
            form.name = response.data.data.name;
            form.percentage = response.data.data.percentage;
            loading.value = false;
        })
        .catch((error) => {
            $q.notify({
                message: `${response.data.data.message}`,
                color: 'negative',
                icon: 'error',
                position: 'top',
            });
            loading.value = false;
        });
};

let addTag = () => {
    loading.value = true;

    form.percentage = parseInt(form.percentage);

    if (route.params.id) {
        api.put(`/taxes/${route.params.id}`, form)
            .then((response) => {
                $q.notify({
                    message: `${response.data.message}`,
                    color: 'info',
                    icon: 'info',
                    position: 'top',
                });
                loading.value = false;
            })
            .catch((error) => {
                $q.notify({
                    message: `${response.data.message}`,
                    color: 'negative',
                    icon: 'error',
                    position: 'top',
                });
                loading.value = false;
            });
    } else {
        api.post('/taxes', form)
            .then((response) => {
                $q.notify({
                    message: `${response.data.message}`,
                    color: 'positive',
                    icon: 'done_all',
                    position: 'top',
                });
                loading.value = false;

                $router.push({ path: '/taxes' });
            })
            .catch((error) => {
                $q.notify({
                    message: `${response.data.message}`,
                    color: 'negative',
                    icon: 'error',
                    position: 'top',
                });
                loading.value = false;
            });
    }
};
</script>
