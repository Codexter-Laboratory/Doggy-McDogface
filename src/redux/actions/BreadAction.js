import http from '../../http-common';
import {dogAction} from '../slices/BreedSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

//fetch all breeds and sub breeds
export const fetchBreeds = () => {
  return async dispatch => {
    const dogs = async () => {
      let req = await http.get('/breeds/list/all');
      const jsonObj = JSON.stringify(req.data.message);
      await AsyncStorage.setItem('@dogs', jsonObj);
      return req.data.message;
    };
    try {
      let storedData = await AsyncStorage.getItem('@dogs');
      let dogData = await dogs();
      dispatch(
        dogAction.FETCH_BREEDS({
          data: storedData !== null ? JSON.parse(storedData) : dogData,
        }),
      );
    } catch (e) {
      console.log('error: ', e);
    }
  };
};

//fetch breed images
export const getDogImage = breedName => {
  return async dispatch => {
    const fetchImages = async () => {
      let req = await http
        .get(`/breed/${breedName}/images/random/2`)
        .then(res => res);
      return req.data.message;
    };
    try {
      let images = await fetchImages();
      dispatch(
        dogAction.FETCH_IMAGES({
          images: images,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };
};

//fetch sub breed images
export const getSubBreedImage = (breedName, subBreedName) => {
  return async dispatch => {
    const fetchImages = async () => {
      let req = await http
        .get(`/breed/${breedName}/${subBreedName}/images/random/2`) //TODO: DOG BREED
        .then(res => res);
      return req.data.message;
    };
    try {
      let images = await fetchImages();
      dispatch(
        dogAction.FETCH_IMAGES({
          images: images,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };
};
