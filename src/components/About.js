import User from "./User";
import UserClass from "./UserClass";
import React from "react";

class About extends React.Component{

    constructor(props){
        super(props);
        console.log("Parent Constructor");
    }

    componentDidMount(){
        console.log("Parent Component Did Mount");
    }

    render(){

        console.log("Parent Render");

        return (
            <div>
                <h1>About</h1>
                <h2>This a Food ordering App</h2>
                <UserClass name={"First"} location={"Dehradun"} />
            </div>
        )
    }
}

export default About;