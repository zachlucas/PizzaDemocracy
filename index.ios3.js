/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;
var GridView = require('react-native-grid-view');

var PAGE_SIZE = 25;
var REQUEST_URL = 'https://api.myjson.com/bins/2pc5t';
var GIFS_PER_ROW = 2;

var Movie = React.createClass({
  render: function() {
      return <View style={styles.movie} >
      	<View style={styles.stretcher}>
           <Image
          source={{uri: this.state.gifs.uri}}
          style={styles.thumbnail}
          />
         </View>
         <Image 
          source={{uri: 'http://www.howtosellthingsfromamerica.com/images/arrow_di9g.png'}}
          style={styles.downVote}
         />
         <Image 
          source={{uri: 'http://www.clipartbest.com/cliparts/yik/Mpe/yikMpeBiE.png'}}
          style={styles.upVote}
         />
      </View>
  },
});


var PizzaDemocracy = React.createClass({
  getInitialState: function() {
    return {
      dataSource: null,
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          gifs: responseData.gifs,
          loaded: true,
        });
      })
      .done();
  },



  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <GridView
        items={this.state.dataSource}
        itemsPerRow={GIFS_PER_ROW}
        renderItem={this.renderItem}
        style={styles.listView}
      />
    );
  },

  renderItem: function(item) {
    //return <Movie movie={item} />
    return <Text>{this.state.gifs}</Text>
  },


  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
   movie: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },

  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
  	flex: 1,
    width: 200,
    height: 200,
  },
    upVote: {
    flex: 1,
    width: 200,
    height: 50,
    opacity: 0.5,
    position: 'absolute',
    top: 100,
  },
      downVote: {
    flex: 1,
    width: 200,
    height: 50,
    opacity: 0.2,
    position: 'absolute',
    top: 100,
  },

  stretcher: {
  	flex: 1,
  	alignItems: 'stretch',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


AppRegistry.registerComponent('PizzaDemocracy', () => PizzaDemocracy);
