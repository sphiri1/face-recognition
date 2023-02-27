import React , { Component } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

class SignIn extends Component {

    constructor(){
        super();
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail : event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onsubmitSignIn = () =>{  
        
        let data = {
            email: this.state.signInEmail,
            password: this.state.signInPassword
        }

        const auth = getAuth();  
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          this.props.onRouteChange('home');
        })
        .catch((error) => {
            console.log(error.code)
            console.log(error.message)
        });
    }

    render(){
        const { onRouteChange } = this.props;
    return(
    <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-1 center">
        <main className="pa4 black-80">
        <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
        <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset bg-transparent hover-bg-black hover-white w-100" 
            type="email" 
            name="email-address"  
            id="email-address"
            onChange={this.onEmailChange}/>
        </div>
        <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input className="b pa2 input-reset bg-transparent hover-bg-black hover-white w-100" 
            type="password" 
            name="password"  
            id="password"
            onChange={this.onPasswordChange}/>
        </div>
        </fieldset>
        <div className="">
        <input 
        onClick={this.onsubmitSignIn}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
        </div>
        <div className="lh-copy mt3">
        <p onClick={() =>  onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
        </div>
    </div>
    </main>
    </article>
    )
}
}

export default SignIn;