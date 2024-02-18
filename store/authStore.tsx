// authStore.js
import { observable, action } from 'mobx';

class AuthStore {
    @observable isLoggedIn = false;
    @observable user = null;
    @observable token = null;

    @action
    login = async () => {
        this.isLoggedIn = true;
    }

    @action
    logout() {
        // Déconnectez l'utilisateur et effacez les informations d'identification
        this.isLoggedIn = false;
        this.user = null;
        this.token = null;
    }
}

const authStore = new AuthStore();
export default authStore;
