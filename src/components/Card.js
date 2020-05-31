import React from 'react'
//We're not writing HTML we're writing JSX and we need to import React so that our program understands JSX.
// This HTML-like syntax

const card = ({name, email, id}) => {
   //we're just receiving props and we're destructuring the props right inside of the brackets here
    //destructing
    // const { name, email, id} = props;
    return(
        <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
            <img alt='robots' src={`https://robohash.org/${id}?200x200`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default card;