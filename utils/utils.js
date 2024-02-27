import * as SecureStore from 'expo-secure-store';

export const storeValue = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
        console.log(`La valeur ${value} a été stockée avec succès pour la clé ${key}`);
    } catch (error) {
        console.error('Erreur lors du stockage de la valeur :', error);
    }
};

export const retrieveValue = async (key) => {
    try {
        const value = await SecureStore.getItemAsync(key);
        if (value !== null) {
            console.log(`La valeur récupérée pour la clé ${key} est : ${value}`);
            console.log(`La valeur ${value} levi ${key}`);
            return value;
        } else {
            console.log(`Aucune valeur n'est associée à la clé ${key}`);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération de la valeur :', error);
    }
};

export const generateUniqueImageName = (prefix) => {
    // Générer une chaîne aléatoire unique
    const uniqueString = Math.random().toString(36).substring(2, 10); // Par exemple, "abc12345"
    // Concaténer le préfixe et la chaîne unique
    const imageName = `${prefix}-${uniqueString}.jpg`; // Par exemple, "ncash-abc12345.jpg"

    return imageName;
}

export function convertImageToBlob(imageUri) {
    return fetch(imageUri)
        .then(response => response.blob())
        .then(blob => blob)
        .catch(error => {
            console.error('Erreur lors de la conversion de l\'image en Blob :', error);
            return null;
        });
}
