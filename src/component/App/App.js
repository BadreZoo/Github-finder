import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { Input,Card,Image,Icon  } from 'semantic-ui-react';
import axios from 'axios';

function App() {
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [animationTrigger, setAnimationTrigger] = useState(false);

 


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target[0].value);
    setAnimationTrigger(true);
    e.target.reset();
    
  };
  

  useEffect(() => {
    const fetchGithub = async () => {
      axios.get(`https://api.github.com/users/${search}`)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchGithub();
  }, [search]);

  useEffect(() => {
    // Réinitialise l'état d'animationTrigger après 1 seconde
    const timeout = setTimeout(() => {
      setAnimationTrigger(false);
    }, 1000);
    
    // Déclenche l'animation de "socials-case" 1 seconde après "github-first-case"

    return () => clearTimeout(timeout);
  }, [animationTrigger]);


  return (
    <div className="App">
      <section>
        <div className="search-container">
          <div className="search">
            <div className="github-finder">
              <h1  > Github Finder 🔍 </h1>
           
            </div>
            <div className="search-bar">
              <form onSubmit={handleSubmit}> 
                <Input  ref={searchInputRef} icon='search'placeholder='👀....' />
             
              </form>
            </div>
          </div>
          <div className="github-result">
           {search ?

             <div className={`animation-github-infos `} >
           <Card  className={`github-first-case-infos ${animationTrigger && "github-first-case-infos anim-test"} `}>
           <Image src={data.avatar_url} wrapped ui={false} />
           <Card.Content>
             <Card.Header>{data.name}</Card.Header>
             <Card.Meta>
               <span className='date'>Joined in {data.created_at}</span> 
             </Card.Meta>
            {data.bio ?  <Card.Content className='bio-on'>
              Bio: {data.bio}
    </Card.Content>:<p className='p-no-bio'>Bio: <s>aucune Bio</s> <Icon name='close'/> </p>}
    {data.twitter_username &&
    <Card.Content>  <a href='*'>
    <Icon name='twitter' />:
    <a  target="_blank" rel="noreferrer" href={`https://twitter.com/${data.twitter_username} ` }>{data.twitter_username}</a>
  </a></Card.Content>}
    
           </Card.Content>
           <Card.Content extra className="fllwer-fllwing">
           <a href='*' onClick={(e)=> e.preventDefault()}>
        <Icon name='user' />
        {data.following} Following
      </a>
      <a href='*' onClick={(e)=> e.preventDefault()}>
      <Icon name='user' />
      {data.followers}Followers
      </a>
           
          
           </Card.Content>
         </Card>
         </div>: <h1 className='ready-tofindit'> <u> Ready to find?!</u></h1>}
       
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default App;
