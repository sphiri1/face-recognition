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
  apiKey: 'daa8741eea4f429b9f3efdd4dc7c5061'
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
   }

   onInputChange = (event) =>{
    this.setState({input: event.target.value});
   }

//    getDocumentId = async () => {
//     const docSnap = await getDocs(db);
//     docSnap.forEach((querySnapshot) => {
//         this.setState({id: querySnapshot.data()});
//     });
// } 
  //  updateEntries = async () =>{
  //   this.getDocumentId();
  //   console.log(this.state.id + " hey");
  //   const entriesRef = doc(firestore, "users", this.state.id);
  //   await updateDoc(entriesRef, {
  //     'entries': increment(1)
  //   })
  //  }

   onButtonSubmit = () =>{
    this.setState({ImageUrl: this.state.input});
    this.setState({entry: this.state.entry + 1});

    app.models.predict({
      id: "face-detection",
     version: "6dc7e46bc9124c5c8824be4822abe105"
    },this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
   }

   onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
   }

  render(){
    const { isSignedIn, ImageUrl, route, box } = this.state;
    return (
    <div className="App">
      <Particles
      color="#15314e"
      type='cobweb' 
      bg={true}/>
     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     {
        route === 'home' 
      ? <div>
        <Logo/>
        <Rank 
         entry={this.state.entry}/>
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
