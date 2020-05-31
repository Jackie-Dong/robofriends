import React, { Component } from 'react';
// import {robots} from '../robots';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'

//We have our "App" component that has two states - "robots" and "searchfield"
//And because "App" owns the state, any component that has "state" uses the "class" syntax
// so they can use the "constructor" function to create "this.state",
// and this "state" is what changes in an app. It's what describes the app
//the virtual DOM is just a javascript object that collects this entire state
// and React uses this state to render and pass them down as props to these components
// so that these components that are just pure functions can just render
//And we always know that the app is going to look the same
// because they're just simple pure functions
//We manage this state in here, the app is the only thing that can change this state
//But it can pass down things such as props,
// so we passed down "onSearchChange" to the "SearchBox",
// and the "SearchBox", every time there's an "onChange" on the input, it lets the app know
// "Hey, there was a change, Run this function"
//It runs the function with the event and updates the state of the "searchfield" to whatever we type
//Now with the information that we have from the search box we can now communicate to the card list
//and tell it "Hey, I want to filter the "robots" state to now have only what includes in the "searchfield"
//and instead of passing that "this.state.robots" we just passed the "filteredRobots"
//You might be asking yourself "Well, "robots" never really changes, does it?"
//"We always just create a new array called "filterRobots" and we always pass that down"
//"Does this need to be part of the state"
//And right now not really, because we just have a hard coded "robots",
// but when we get later on in the course you'll see that that's not the case
//Most of the time you're getting the users or robots from another place over the internet
//in which case we will need "robots" to change from an empty array to an array after we go and grab all of our users

class App extends Component {
    constructor() {
        //"super()" which calls the constructor of component
        super();
        //because "App" now owns "state" that includes "robots", it's allowed to change it.
        this.state = {
            robots: [],
            searchfield: ''
        }
        //we have these two values, and ideally in the search box I have something called "onSearchChange()"
    }

    componentDidMount() {
        //We're just saying make this HTTP request, and fetch receives this.
        //This is going to receive a response
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            //we're simply updating state after we fetch.
            .then(users => {this.setState({robots:users})});
    }

    //"onSearchChange()" I want to say that every time the input changes, just like we did with DOM manipulation,
    //we get an event, and within this event I'm going to "console.log" this event
    onSearchChange = (event) => {
        //I'm changing the state so that the "searchfield" always gets updated
        this.setState({searchfield: event.target.value})

        //"event.target.value" which should give us the value of the search term
        // console.log(event.target.value)
        //<======And now this function gets run
        //But now that I have the value of the search input, I can now directly communicate that search input to the "robots" list
    }

    render() {
        const { robots, searchfield} = this.state;

        //we're filtering the robots according to the changed "searchfield"
        const filterRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })

        //this is how you build real apps with react, you have a loading bar, they can just add here,
        // make requests on componentDidMount() and interact with components.
        //robots.length === 0
        //if...else ternary operator
        return !robots.length?
         <h1>Loading</h1>:
         (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                {/*I want any time this input changes to trigger "console.log". So we can pass this actually now.*/}
                {/*because this is an object we have to say "this" so that it says "this" (which is the "App") ".*/}
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default App;