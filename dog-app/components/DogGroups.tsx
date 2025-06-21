import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../types';

const fetchDogGroups = async (): Promise<{ data: Group[] }> => {
  const response = await fetch('https://dogapi.dog/api/v2/groups');
  if (!response.ok) throw new Error('Failed to fetch dog groups');
  return response.json();
};

const DogGroups: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dogGroups'],
    queryFn: fetchDogGroups,
  });

  if (isLoading) return <Text>Loading groups...</Text>;
  if (isError) return <Text>Error fetching groups!</Text>;

  return (
    <View>
      {data?.data.map((group) => (
        <Text key={group.id} style={{ marginVertical: 4 }}>
          {group.attributes.name}
        </Text>
      ))}
    </View>
  );
};

export default DogGroups;
