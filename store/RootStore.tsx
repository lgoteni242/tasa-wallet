// RootStore.js

import AuthStore from './authStore';

const RootStore = {
    authStore: new AuthStore(),
    // Ajoutez d'autres stores ici
};

export default RootStore;
