import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDogImage, getSubBreedImage} from '../redux/actions/BreadAction';
import FastImage from 'react-native-fast-image';

//Screen to display images
export const DetailScreen = ({route}) => {
  const dispatch = useDispatch();
  //get the params
  let {name} = route.params;
  let {subBreed} = route.params;

  //get the state from the store
  const images = useSelector(state => state.images);

  const [loading, setLoading] = useState(true);

  //fetch breed and sub breed images
  useEffect(() => {
    if (subBreed) {
      dispatch(getSubBreedImage(name, subBreed));
    } else {
      dispatch(getDogImage(name));
    }

    //hide the activity indicator
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [name]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View>
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <FastImage
            source={{
              uri: images[0],
              priority: FastImage.priority.high,
              cache: FastImage.cacheControl.web,
            }}
            style={styles.firstImage}
          />
          <FastImage source={{uri: images[1]}} style={styles.secondImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#CFD8DC',
  },
  firstImage: {
    height: '50%',
    width: '80%',
    resizeMode: 'contain',
  },
  secondImage: {
    height: '40%',
    width: '80%',
    resizeMode: 'contain',
  },
  activityIndicator: {
    height: 80,
    paddingTop: 20,
  },
});
