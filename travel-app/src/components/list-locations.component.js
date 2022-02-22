import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Location = props => (
    <tr>
        <td>{props.location.username}</td>
        <td>{props.location.place}</td>
        <td>{props.location.description}</td>
        <td>{props.location.rating}</td>
        <td>{props.location.latitude}</td>
        <td>{props.location.longitude}</td>
        <td>
             <Link to={"/edit/"+props.location._id}>edit</Link> | { <a href="/" onClick={() => {props.deleteLocation(props.location._id)}}>delete</a> } 
            
        </td>
    </tr>
)

export default class ListLocations extends Component {
    constructor(props) {
        super(props);
        this.deleteLocation = this.deleteLocation.bind(this);
        this.state = {locations: []};
    }

    componentDidMount() {
        axios.get("http://localhost:3001/locations/")
        .then(response => {
        this.setState({locations: response.data}) //in this case we want all the fields
    })
    .catch((error)=> {
        console.log(error);
    })
}

//delete location from database and what is shown to user
deleteLocation(id) {
    axios.delete("http://localhost:3001/locations/"+id)
    .then(response => {console.log(response.data)});
//_id is automatically created in mongo
    this.setState({
        locations: this.state.locations.filter(el => el._id !==id)
    })
}

//pass in the current location, delete location method, and the key
fullList() {
    return this.state.locations.map(currentlocation => {
        return <Location location={currentlocation} deleteLocation={this.deleteLocation} key ={currentlocation._id} />;
    })
}

render(){
    return  (
        <div>
        <h2> Locations</h2>
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Place</th>
                    <th>Description</th>
                    <th>Rating</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.fullList()}
            </tbody>
        </table>
        </div>
    )
    }
}

