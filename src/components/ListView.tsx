import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface IProps {
  data: any;
  navigation: any;
}

//A component to display breeds and sub breed in a form of a list
export const ListView = (props: IProps) => {
  let dogs = props.data;
  let navigation = props.navigation;

  return (
    <ScrollView>
      {/*mapping over the object to display both breeds and sub breeds*/}
      {Object.keys(dogs).map((breed, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              key={index}
              style={styles.breedSection}
              onPress={() => navigation.navigate('Details', {name: breed})}>
              <Text style={styles.breedTitle}>
                {breed.charAt(0).toUpperCase() + breed.slice(1)}
              </Text>
            </TouchableOpacity>
            {/*display sub breeds under their corresponding breed, if they have any*/}
            {dogs[breed].length
              ? dogs[breed].map((subBreed, key) => (
                  <TouchableOpacity
                    style={styles.subBreedSection}
                    key={key}
                    onPress={() =>
                      navigation.navigate('Details', {
                        name: breed,
                        subBreed: subBreed,
                      })
                    }>
                    <Text style={styles.subBreedTitle}>
                      {subBreed.charAt(0).toUpperCase() + subBreed.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  breedSection: {
    backgroundColor: '#566c76',
    marginBottom: 2,
    height: 40,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  subBreedSection: {
    backgroundColor: '#78909C',
    height: 40,
    marginBottom: 2,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  breedTitle: {
    color: 'white',
    fontSize: 24,
    textAlignVertical: 'center',
  },
  subBreedTitle: {
    color: 'white',
    fontSize: 18,
  },
});
