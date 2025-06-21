import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Breed } from '../types';

interface DogBreedsProps {
  onSelectBreed?: (id: string) => void;
}

const fetchBreeds = async (): Promise<{ data: Breed[] }> => {
  const response = await fetch('https://dogapi.dog/api/v2/breeds');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const DogBreeds: React.FC<DogBreedsProps> = ({ onSelectBreed }) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['breeds'],
    queryFn: fetchBreeds,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching breeds!</Text>;

  return (
    <View>
      {isSuccess && <Text>Breeds fetched successfully!</Text>}
      {data?.data.map((breed) => (
        <Pressable key={breed.id} onPress={() => onSelectBreed?.(breed.id)}>
          <Text style={{ marginVertical: 4 }}>{breed.attributes.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default DogBreeds;
