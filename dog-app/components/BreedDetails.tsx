import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Breed } from '../types';

interface BreedDetailsProps {
  breedId: string | null;
}

const fetchBreedDetails = async (id: string): Promise<{ data: Breed }> => {
  const res = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  if (!res.ok) throw new Error('Failed to fetch breed details');
  return res.json();
};

const BreedDetails: React.FC<BreedDetailsProps> = ({ breedId }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['breedDetails', breedId],
    queryFn: () => fetchBreedDetails(breedId!),
    enabled: !!breedId,
  });

  if (!breedId) return <Text>Select a breed to view details</Text>;
  if (isLoading) return <Text>Loading details...</Text>;
  if (isError) return <Text>Error fetching breed details!</Text>;

  const { name, description } = data!.data.attributes;

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
      <Text>{description || 'No description available.'}</Text>
    </View>
  );
};

export default BreedDetails;
