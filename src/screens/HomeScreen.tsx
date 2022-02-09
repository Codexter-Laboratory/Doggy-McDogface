import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBreeds} from '../redux/actions/BreadAction';
import {ListView} from '../components/ListView';
const dropdownArrow = require('../../assets/images/dropdown.png');

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const dogData = useSelector(state => state.data);

  const [dogs, setDogs] = useState(dogData);
  const [search, setSearch] = useState('');

  const [isClicked, setClicked] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBreeds());
    if (!search.length) {
      setDogs(dogData);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [dogData]);

  const onDropdownPress = () => {
    setClicked(!isClicked);
  };

  const onChange = e => {
    setSearch(e);
    let filteredKeys = Object.keys(dogData).filter(k =>
      k.toLowerCase().startsWith(e.toLowerCase()),
    );
    let tempObj = {};
    filteredKeys.map(i => {
      if (Object.keys(dogData).includes(i)) {
        Object.assign(tempObj, {[i]: dogData[i]});
      }
    });
    setDogs(tempObj);
  };

  const onSubBreedClick = () => {
    let a = Object.keys(dogData).map(k => k);
    let f = {};
    a.map(i => {
      if (Object.keys(dogData).includes(i)) {
        Object.assign(f, {[i]: dogData[i]});
      }
    });
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={onChange}
          value={search}
          placeholder="Filter Breeds"
          placeholderTextColor="black"
          style={styles.searchBox}
        />
        <View style={styles.filters}>
          <Text>Filters</Text>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={onDropdownPress}>
            <Image
              source={dropdownArrow}
              style={isClicked ? styles.dropDownClicked : styles.dropdown}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isClicked ? (
        <View style={styles.filtersContainer}>
          <TouchableOpacity
            style={styles.filterButtons}
            onPress={onSubBreedClick}>
            <Text style={{color: 'white'}}>Sub-breeds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons}>
            <Text style={{color: 'white'}}>No Sub Breeds</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButtons}>
            <Text style={{color: 'white'}}>All breeds</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {loading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ListView data={dogs} navigation={navigation} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: 100,
    backgroundColor: '#CFD8DC',
    zIndex: 3,
    justifyContent: 'space-around',
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%',
    paddingLeft: '1%',
    color: 'black',
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '3%',
    paddingRight: '2%',
    width: '100%',
    height: 40,
    backgroundColor: '#CFD8DC',
    alignItems: 'center',
    marginTop: 'auto',
  },
  imageButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
  },
  dropdown: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },
  dropDownClicked: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    transform: [
      {scaleY: -1}, //vertically
    ],
  },
  filtersContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#566c76',
    paddingLeft: '2%',
    paddingRight: '2%',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: '2%',
  },
  filterButtons: {
    width: 110,
    height: 40,
    backgroundColor: '#818181',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    height: 80,
    paddingTop: 20,
  },
});
