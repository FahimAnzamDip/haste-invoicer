<template>
    <q-page>
        <div class="q-pa-md">
            <q-breadcrumbs class="text-brown q-mb-lg">
                <template v-slot:separator>
                    <q-icon size="1.5em" name="chevron_right" color="primary" />
                </template>

                <q-breadcrumbs-el label="Home" icon="home" to="/" />
                <q-breadcrumbs-el label="Categories" icon="list" />
            </q-breadcrumbs>

            <div class="row q-mb-lg">
                <div class="col-12">
                    <div class="row justify-between items-center">
                        <h5 class="q-mb-none q-mt-none">Product Categories</h5>
                        <q-btn color="secondary" icon-right="add" label="Add Category" tag="a" to="/categories/add" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <q-table
                        :columns="columns"
                        :rows="categories"
                        row-key="ID"
                        :loading="loading"
                        table-header-class="bg-blue-grey-1"
                        :pagination="{ rowsPerPage: 10 }"
                    >
                        <template #body-cell-action="props">
                            <q-td :props="props">
                                <q-btn
                                    round
                                    color="info"
                                    icon="edit"
                                    size="sm"
                                    class="q-mr-sm"
                                    tag="a"
                                    :to="{ path: `/categories/edit/${props.key}` }"
                                />
                                <q-btn @click="confirm(props.key)" round color="negative" icon="delete" size="sm" :loading="loading" />
                            </q-td>
                        </template>
                    </q-table>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();

onMounted(() => {
    getCategories();
});

let columns = [
    {
        name: 'ID',
        label: 'Category ID',
        field: (row) => row.ID,
        align: 'center',
        sortable: true,
    },
    {
        name: 'name',
        label: 'Name',
        field: (row) => row.name,
        align: 'center',
        sortable: false,
    },
    {
        name: 'description',
        label: 'Description',
        field: (row) => row.description,
        format: (val) => (val == '' ? 'No description' : val),
        align: 'center',
        sortable: false,
    },
    {
        name: 'action',
        label: 'Action',
        align: 'center',
        sortable: false,
    },
];

let categories = reactive([]);
let loading = ref(false);

async function getCategories() {
    loading.value = true;
    const response = await api.get('/categories');
    loading.value = false;

    if (response.data.status) {
        categories = response.data.data;
    } else {
        console.log(response.data.message);
    }
}

let confirm = (id) => {
    $q.dialog({
        title: 'Confirm',
        message: 'Are you sure? Record will be deleted permanently.',
        persistent: false,
        ok: {
            color: 'negative',
            label: 'Delete',
        },
        cancel: {
            label: 'Cancel',
            color: 'grey',
        },
    }).onOk(() => {
        loading.value = true;
        api.delete(`/categories/${id}`)
            .then((response) => {
                if (response.data.status) {
                    categories = categories.filter((category) => category.ID != id);
                    $q.notify({
                        message: `${response.data.message}`,
                        type: 'warning',
                        position: 'top',
                        icon: 'warning',
                    });
                } else {
                    $q.notify({
                        message: `${response.data.message}`,
                        type: 'error',
                        position: 'top',
                        icon: 'error',
                    });
                }
                loading.value = false;
            })
            .catch((error) => {
                $q.notify({
                    message: `${error.message}`,
                    type: 'error',
                    position: 'top',
                    icon: 'error',
                });
                loading.value = false;
            });
    });
};
</script>
