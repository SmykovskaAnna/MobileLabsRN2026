import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View, } from 'react-native';
import { items as seedItems } from '../data/items';
import { styles } from '../styles/mainScreenStyles';

const PAGE_SIZE = seedItems.length;

function makeItems(page) {
  return seedItems.map((item, index) => {
    const id = String(page * PAGE_SIZE + index + 1);
    return {
      ...item,
      id,
      title: `${item.title} #${id}`,
      image: page === 0 ? item.image : `https://picsum.photos/seed/news-${id}/600/400`,
    };
  });
}

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(() => makeItems(0));
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageRef = useRef(1);

  const onRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => {
      pageRef.current = 1;
      setData(makeItems(0));
      setRefreshing(false);
    }, 1000);
  };

  const onEndReached = () => {
    if (loadingMore || refreshing) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = pageRef.current;
      pageRef.current += 1;
      setData((prev) => [...prev, ...makeItems(nextPage)]);
      setLoadingMore(false);
    }, 1000);
  };

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        <Text style={styles.title}>News</Text>
        <Text style={styles.subtitle}>Latest updates for you</Text>
      </View>
    ),
    []
  );

  const listFooter = useMemo(
    () => (
      <View style={styles.footer}>
        {loadingMore ? (
          <>
            <ActivityIndicator size="small" />
            <Text style={styles.footerText}>Loading more…</Text>
          </>
        ) : (
          <Text style={styles.footerText}>End of list</Text>
        )}
      </View>
    ),
    [loadingMore]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('Details', {
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
              })
            }
            style={styles.card}
          >
            <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </Pressable>
        )}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={7}
      />
      <StatusBar style="auto" />
    </View>
  );
}
