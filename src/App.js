import Navigation from './Componenets/Navigation/Navigation';
import Logo from './Componenets/Logo/Logo';
import ImageLinkForm from './Componenets/ImageLinkForm/ImageLinkForm';
import Rank from './Componenets/Rank/Rank';
import FaceRecognition from './Componenets/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'particles-bg';
import { Component } from 'react';
import Clarifai from 'clarifai';
import SignIn from './Componenets/SignIn/SignIn';
import Register from './Componenets/Register/Register';
 
const app = new Clarifai.App({
  apiKey: 'API_KEY HERE'
});

class App extends Component{
   constructor(){
    super();
    this.state = {
      input: ``,
      ImageUrl: ``,
      box: {},
      route: 'signin',
      isSignedIn: false,
      entry:0
    }
   }

   calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
   }

   displayFaceBox = (grid) =>{
    this.setState({box: grid});
    this.setState({entry: 0});
   }

   onInputChange = (event) =>{
    this.setState({input: event.target.value});
   }


   onButtonSubmit = () =>{
    if(this.state.input){
    this.setState({ImageUrl: this.state.input});
    this.setState({entry: this.state.entry + 1});
    
    app.models.predict({
      id: "face-detection",
     version: "6dc7e46bc9124c5c8824be4822abe105"
    },this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }else{
    alert("Please enter an image url");
  }
   }

   onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({input: '', box: {}, ImageUrl: ''});
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
   }

  render(){
    const { isSignedIn, ImageUrl, route, box, entry } = this.state;
    return (
    <div className="App">
      <Particles
      color="#15314e"
      type='cobweb' 
      bg={true}/>
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          />
     {
        route === 'home' 
      ? <div>
        <Logo/>
        <Rank 
         entry={entry}/>
        <ImageLinkForm 
         onInputChange={this.onInputChange} 
         onButtonSubmit={this.onButtonSubmit}/>
         <FaceRecognition box={box} ImageUrl={ImageUrl} />
        </div>
      : (
        route === 'signin' ?
        <SignIn onRouteChange={this.onRouteChange}/>
        : 
        <Register onRouteChange={this.onRouteChange}/> 
      )
       
      }
     </div>
  );
}
}

export default App;
