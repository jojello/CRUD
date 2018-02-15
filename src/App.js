import React, { Component } from "react";
import Cafe from "./Cafe";
import firebase from "firebase";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    const config = {
      apiKey: "AIzaSyBBC6g0heXea-wTDy1aZOimhpq-g6X_4r8",
      authDomain: "coffee-favourite.firebaseapp.com",
      databaseURL: "https://coffee-favourite.firebaseio.com",
      projectId: "coffee-favourite",
      storageBucket: "coffee-favourite.appspot.com",
      messagingSenderId: "426214258482"
    };

    firebase.initializeApp(config);
    //references the database calls for only one product(gives access to all products in api)

    this.addNewCafe = this.addNewCafe.bind(this);
  }
  state = {
    cafes: [
      {
        name: "Gloria Jeans",
        address: "Parramatta",
        rating: 4
      }
    ]
  };

  addNewCafe(event) {
    console.log(this.state);
    event.preventDefault();
    const newCafes = this.state.cafes;
    const newCafe = {
      name: this.nameInput.value,
      address: this.addressInput.value,
      rating: parseInt(this.ratingInput.value)
    };
    newCafes.push(newCafe);

    this.setState({
      cafes: newCafes
    });
    firebase
      .database()
      .ref("cafes/" + newCafe.name)
      .set(newCafe);
  }

  //ref can also be used to make sure that the button can access the input when the form is
  //submitted - does the same thing as the onChange method.

  componentDidMount() {
    firebase
      .database()
      .ref("cafes")
      .on("value", snapshot => {
        console.log(snapshot.val());
        const cafes = snapshot.val();
        this.setState({
          cafes: Object.keys(cafes).map(cafeId => {
            return cafes[cafeId];
          })
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>My favourite places for coffee</h1>
        <h2>Add a Cafe</h2>
        <form>
          <label>Name</label>
          <input type="text" ref={ref => (this.nameInput = ref)} />
          <label>Address</label>
          <input type="text" ref={ref => (this.addressInput = ref)} />
          <label>Rating</label>
          <input type="text" ref={ref => (this.ratingInput = ref)} />
          <button type="submit" onClick={this.addNewCafe}>
            Add cafe
          </button>
        </form>
        <h2>Favourites</h2>
        {this.state.cafes.map(cafe => (
          <Cafe
            name={cafe.name}
            address={cafe.address}
            rating={cafe.rating}
            key={cafe.name}
          />
        ))}
      </div>
    );
  }
}

export default App;
