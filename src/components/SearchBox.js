import React from 'react'

//"SearchBox" accepts "searchChange" as "props" even though in the App.js it's a "state".
//I now have "searchChange" as a function
//the searchChange function which is a prop is the "onSearchChange" function that is defined in the App
// That's how we communicate with the parent
//It triggers the event, the parent(App) says "Oh, run this function"=======>App.js
//But now that I have the value of the search input, I can now directly communicate that search input to the "robots" list
const SearchBox = ({searchChange}) => {
    return (
        <div className='pa2'>
            <input
                className='pa3 ba b--green bg-lightest-blue'
                type='search'
                placeholder='search robots'
                //every time the onchange event is triggered, call the searchChange function
                //Any time the searchBox changes, on change I'm going to run the function, I'm going to call this function
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;