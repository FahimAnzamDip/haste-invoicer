import { Notify } from 'quasar';

Notify.setDefaults({
    position: 'top',
    timeout: 1500,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }],
});
