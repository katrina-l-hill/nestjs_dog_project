// components/DogForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDog } from '@/hooks/api';

const DogForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addDog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dogs'] });
      setName('');
      setBreed('');
      setAge('');
    },
  });

  return (
    <View>
      <Text style={styles.title}>Add a Dog</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Breed" value={breed} onChangeText={setBreed} style={styles.input} />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title="Add Dog"
        onPress={() => mutation.mutate({ name, breed, age: Number(age) })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
});

export default DogForm;
