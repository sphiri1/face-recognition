import React , { Component } from "react";
import { db } from "../../firebase";
import { setDoc, doc } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



class Register extends Component {

    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            entries:0
        }
    }

    onNameChange = (event) =>{
        this.setState({name : event.target.value})
    }

    onEmailChange = (event) =>{
        this.setState({email : event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value})
    }

    onsubmitSignIn = () =>{
        let data = {
            ...this.state
        }
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                updateProfile(auth.currentUser, {
                 displayName: data.name
                }).then(async () => {  
                await setDoc(doc(db, auth.currentUser.uid), {...data});
                this.props.onRouteChange('home');
                });
            })
            .catch((error) => {
                console.log(error.code)
                console.log(error.message)
            });  
    }

    render() {
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-1 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">name</label>
                                <input className="pa2 input-reset bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    onChange={this.onNameChange}/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">email</label>
                                <input className="pa2 input-reset bg-transparent hover-bg-black hover-white w-100"
                                     type="email" 
                                     name="email-address" 
                                     id="email-address"
                                     onChange={this.onEmailChange} />
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
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;