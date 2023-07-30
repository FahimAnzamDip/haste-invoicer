<template>
    <q-page>
        <div class="q-pa-md">
            <q-breadcrumbs class="text-brown">
                <template v-slot:separator>
                    <q-icon size="1.5em" name="chevron_right" color="primary" />
                </template>

                <q-breadcrumbs-el label="Home" icon="home" to="/" />
                <q-breadcrumbs-el label="Products" icon="list" />
            </q-breadcrumbs>
        </div>
    </q-page>
</template>

<script setup></script>
