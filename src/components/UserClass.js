import React from "react";

class UserClass extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userData : {
                name : "XYZ",
                location : "Default"
            }
        }
        console.log(this.props.name + " Child Constructor");
    }

    async componentDidMount(){
        const data = await fetch(" https://api.github.com/users/akshaymarch7");
        const json = await data.json();

        console.log("Component Did Mount");

        console.log(json);



        this.setState({
            userData : json
        })

    }

    componentDidUpdate(){
        console.log("Component Did Update");
    }

    componentWillUnmount(){
        console.log("Component Wil Unmount");
    }

    render(){

        console.log(this.props.name + " Child Render");

        const { name, location, avatar_url } = this.state.userData;

        return (
            <div className="user-card">
                <img src={avatar_url}></img>
                <h2>Name : {name}</h2>
                <h3>Location : {location} </h3>
                <h3>Contact : @FaizanNafees0</h3>
            </div>
        )
    }
}

export default UserClass;