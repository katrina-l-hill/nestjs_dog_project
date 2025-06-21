import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDogs, deleteDog } from '@/hooks/api';
import type { Dog } from '@/types';

const DogList = () => {
  const queryClient = useQueryClient();

  const { data: dogs, isLoading, isError } = useQuery<Dog[]>({
    queryKey: ['dogs'],
    queryFn: fetchDogs,
  });

  const mutation = useMutation({
    mutationFn: deleteDog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dogs'] }),
  });

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.title}>Dogs List</Text>
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error loading dogs</Text>}

      {dogs?.map((item) => (
        <View key={item.id} style={styles.item}>
          <Text>{item.name} ({item.breed}) - Age {item.age}</Text>
          <Button title="Delete" onPress={() => mutation.mutate(item.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 8 },
  item: {
    padding: 8,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DogList;
