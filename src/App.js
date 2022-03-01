import React,{ Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Signin from './Components/signin/signin';
import Register from './Components/Register/Register';
import Particles from "react-tsparticles";
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank';
import FaceRecognation from './Components/FaceRecognation/FaceRecognation'
import Clarifai from 'clarifai'; 
import './App.css';
import 'tachyons'


/*API Key */

process.nextTick = setImmediate
const app = new Clarifai.App({
  apiKey: '566536e92cdb479ea9fc6e2eb244ee41'
 });

 /* Particles Background */

 const particlesOptions = {
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 50,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 3,
    }
  }
}
const intialstate = {
  input:'',
  imgURL:'',
  box:{},
  route:'signin',
  isSignedIn: false,
  user :{
    id : '',
    name : '',
    email : '',
    entries : 0,
    joined : ''
  }
}
 
class App extends Component{
  constructor () {
    super();
    this.state = intialstate
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  faceCalculation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageValue');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
  
displayBox = (box)=>{
    this.setState({box:box});
  }
onInputChange =(event)=>{
  this.setState({input:event.target.value})
  }

onButtonChange = () => {
  this.setState({imgURL:this.state.input})
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,
    this.state.input)
    .then((response =>{
      if (response) {
        fetch('https://infinite-reaches-49903.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })

      }
      this.displayBox(this.faceCalculation(response))
    }))
    .catch(err =>console.log(err))
    }
    
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(intialstate)
    } else if (route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }
  

  render(){
    const {isSignedIn ,box ,imgURL,route} = this.state;
    return (
      <div className='App'>
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
        { route === 'home'
        ? <div>
         <Logo />
        <Rank 
        name = {this.state.user.name} 
        entries = {this.state.user.entries}/>
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonChange={this.onButtonChange}
        />
        <FaceRecognation imgURL={imgURL} box={box} />
        </div>
         
        : (
          route === 'signin' 
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
      </div>
    )
  }
}

export default App;