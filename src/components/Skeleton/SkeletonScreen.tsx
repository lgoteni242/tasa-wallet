import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SkeletonScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement asynchrone
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ marginTop: 20 }}>
          <View style={{ width: 200, height: 20, backgroundColor: '#E0E0E0', marginBottom: 10 }} />
          <View style={{ width: 150, height: 20, backgroundColor: '#E0E0E0', marginBottom: 10 }} />
          <View style={{ width: 180, height: 20, backgroundColor: '#E0E0E0', marginBottom: 10 }} />
          {/* Ajoutez autant de placeholders que nécessaire pour représenter votre contenu */}
        </View>
      </View>
    );
  }

  // Contenu réel une fois le chargement terminé
  return (
    <View>
      <Text>Contenu réel de l'application</Text>
      {/* Affichez ici le contenu réel de votre application */}
    </View>
  );
};

export default SkeletonScreen;


