import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, FlatList } from 'react-native';


const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    scoreContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    scoreText: {
        fontSize: 18
    }
});

const LeaderboardScreen = () => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Person A\t', score: 3000 },
    { id: 2, name: 'Person B\t', score: 2800 },
    { id: 3, name: 'Person C\t', score: 2400 },
    { id: 4, name: 'Person D\t', score: 2100 },
    { id: 5, name: 'Person E\t', score: 1700 }
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.scoreText}>{item.score}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.scoresContainer}>
        <Text style={styles.titleText}>Leaderboard</Text>
        <FlatList
            data={leaderboardData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
}

export default LeaderboardScreen;