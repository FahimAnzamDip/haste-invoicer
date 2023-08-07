<template>
    <q-page>
        <div class="q-pa-md">
            <q-breadcrumbs class="text-brown q-mb-lg">
                <template v-slot:separator>
                    <q-icon size="1.5em" name="chevron_right" color="primary" />
                </template>

                <q-breadcrumbs-el label="Home" icon="home" to="/" />
                <q-breadcrumbs-el label="Taxes" icon="list" />
            </q-breadcrumbs>

            <div class="row q-mb-lg">
                <div class="col-12">
                    <div class="row justify-between items-center">
                        <h5 class="q-mb-none q-mt-none">Product Taxes</h5>
                        <q-btn color="secondary" icon-right="add" label="Add Tax" tag="a" to="/taxes/add" />
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    <q-table
                        :columns="columns"
                        :rows="taxes"
                        row-key="ID"
                        :loading="loading"
                        table-header-class="bg-blue-grey-1"
                        :pagination="{ rowsPerPage: 10 }"
                    >
                        <template #body-cell-action="props">
                            <q-td :props="props">
                                <q-btn round color="info" icon="edit" size="sm" class="q-mr-sm" tag="a" :to="{ path: `/taxes/edit/${props.key}` }" />
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
import { onMounted, ref, reactive } from 'vue';
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
const $q = useQuasar();

onMounted(() => {
    getTaxes();
});

let columns = [
    {
        name: 'ID',
        label: 'Tax ID',
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
        name: 'percentage',
        label: 'Percentage (%)',
        field: (row) => row.percentage,
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

let taxes = reactive([]);
let loading = ref(false);

async function getTaxes() {
    loading.value = true;
    const response = await api.get('/taxes');
    loading.value = false;

    if (response.data.status) {
        taxes = response.data.data;
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
        api.delete(`/taxes/${id}`)
            .then((response) => {
                if (response.data.status) {
                    taxes = taxes.filter((tax) => tax.ID != id);
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
