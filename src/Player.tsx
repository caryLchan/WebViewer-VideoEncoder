import React from 'react'
import ReactPlayer from 'react-player'

const Player = (props:{path:string}) => {
  return (
    <>
      <ReactPlayer 
        url={props.path}
        width='640px' 
        height='480px' 
        controls={true}
        playing={false}
      />
    </>
  )
};

export default Player;