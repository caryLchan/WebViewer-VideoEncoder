import React, {useState, useEffect} from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Player from './Player'
import UploadScript from './UploadScript';

const WebViewer = () => {
  const [init, setInit] = useState(false);
  const [view, setView] = useState(false);
  const startView = () => setView(true);
  const backButton = () => setView(false);
  const [playData, setPlayData] = useState([['','']])
  const [currVid, setVid] = useState(['','','','','']);
  const [quality, setQuality] = useState('');

  let plData: [string[]];
  const playlistQuery = async () => {
    try {
      const plFetch = await fetch(`http://localhost:3000/watch/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      plData = await plFetch.json();
      setPlayData(plData)
    } catch (error) {
      console.error('WebViewer.tsx/playlistQuery: ', error.message);
    }
  };

  let vidData: string[];
  const videoQuery = async (vidId:string) => {
    try {
      const id = vidId
      const vidFetch = await fetch(`http://localhost:3000/watch/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      vidData = await vidFetch.json();
      setVid(vidData);
    } catch (error) {
      console.error("WebViewer.tsx/videoQuery: ", error.message);
    }
  };

  const initialize = async () => {
    await playlistQuery();
    setInit(true);
  };

  const chooseVideo = async (vidId: string) => {
    await videoQuery(vidId)
    setQuality(vidData[3])
    startView()
  };

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: string | unknown}>) => setQuality(event.target.value as string);

  useEffect(()=>{
    initialize();
  },[init]);

  if (view && currVid && quality) {
    console.log(currVid)
    return (
      <>
        {view ? 
        <div className='video'>
          <h1>{currVid[0]}</h1>
          <Player path={quality} />
          <div>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Quality</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={quality}
                onChange={handleChange}
                label="Quality"
              >
                <MenuItem value={currVid[1]}>4k</MenuItem>
                <MenuItem value={currVid[2]}>1080p</MenuItem>
                <MenuItem value={currVid[3]}>480p</MenuItem>
                <MenuItem value={currVid[4]}>240p</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <button onClick={backButton}>Back</button>
          </div>
        </div>
        : <p>Loading...</p>}
      </>
    )
  }
  else {
    return (
      <>
        {init ? 
          <div className="select">
            {playData.map((video, index) => {
              return(
                <button className={classes.button} value={video[3]} key={`${video[1]}+${index}`} 
                onClick={() => {
                  chooseVideo(video[0])
                }}>{`Play ${video[1]}`}</button>
              )
            })}
            <div className={classes.form}>
              <UploadScript />
            </div>
          </div>
          : <p>Loading...</p>}
      </>
    )
  }
};

export default WebViewer;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: "640px",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: '5px'
    },
    form: {
      marginTop: '15px'
    },
  }),
);