import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Fact } from '../types';

const fetchDogFacts = async (): Promise<{ data: Fact[] }> => {
  const response = await fetch('https://dogapi.dog/api/v2/facts');
  if (!response.ok) throw new Error('Failed to fetch dog facts');
  return response.json();
};

const DogFacts: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dogFacts'],
    queryFn: fetchDogFacts,
  });

  if (isLoading) return <Text>Loading facts...</Text>;
  if (isError) return <Text>Error fetching facts!</Text>;

  return (
    <View>
      {data?.data.map((fact) => (
        <Text key={fact.id} style={{ marginBottom: 10 }}>
          {fact.attributes?.body ?? 'No fact available'}
        </Text>
      ))}
    </View>
  );
};

export default DogFacts;
