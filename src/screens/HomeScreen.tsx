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

  const [isClicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterClicked, setFilterClicked] = useState({
    withSubs: false,
    withoutSubs: false,
  });

  useEffect(() => {
    dispatch(fetchBreeds());
    if (!search) {
      if (!filterClicked.withSubs) {
        if (!filterClicked.withoutSubs) {
          setDogs(dogData);
        }
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });

  const onDropdownPress = () => {
    setClicked(!isClicked);
  };

  //filter data when entering values in the search box
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

  //only show data that has sub breeds
  const onSubBreedPress = () => {
    setFilterClicked({withSubs: true, withoutSubs: false});
    let a = Object.values(dogData).filter(k => k.length);
    let temp = {};

    a.map(i => {
      return Object.keys(dogData).map(k => {
        if (dogData[k] === i) {
          Object.assign(temp, {[k]: i});
        }
      });
    });
    console.log(temp);
    setDogs(temp);
  };

  //show data with no sub breeds (why not)
  const noSubPress = () => {
    setFilterClicked({withSubs: false, withoutSubs: true});
    let a = Object.keys(dogData).filter(k => !dogData[k].length);
    let temp = {};
    a.map(i => {
      if (Object.keys(dogData).includes(i)) {
        Object.assign(temp, {[i]: dogData[i]});
      }
    });
    console.log(temp);
    setDogs(temp);
  };

  const onAllPress = () => {
    setFilterClicked({withSubs: false, withoutSubs: false});
    setDogs(dogData);
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
            style={
              filterClicked.withSubs
                ? styles.filterButtonsClicked
                : styles.filterButtons
            }
            onPress={onSubBreedPress}>
            <Text style={{color: filterClicked.withSubs ? '#000' : '#fff'}}>
              Sub-breeds
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={noSubPress}
            style={
              filterClicked.withoutSubs
                ? styles.filterButtonsClicked
                : styles.filterButtons
            }>
            <Text style={{color: filterClicked.withoutSubs ? '#000' : '#fff'}}>
              No Sub Breeds
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onAllPress}
            style={
              !filterClicked.withSubs && !filterClicked.withoutSubs
                ? styles.filterButtonsClicked
                : styles.filterButtons
            }>
            <Text
              style={{
                color:
                  filterClicked.withSubs || filterClicked.withoutSubs
                    ? '#fff'
                    : '#000',
              }}>
              All breeds
            </Text>
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
  filterButtonsClicked: {
    width: 110,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    height: 80,
    paddingTop: 20,
  },
});
