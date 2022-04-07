import logo from './logo.svg';
import './App.css';
import React from 'react';

class Rentals extends React.Component{
  constructor(props){
    super(props);
    this.state={
      filter: "",
      cars: [],
      carsFound: [],
      filterType: "name"
    };
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
    this.filterData = this.filterData.bind(this);
  }
 
  
  handleChange(e) {
    this.setState({filter: e.target.value});
    this.filterData();
  }

  componentDidMount() {
    this.getData();
  }
  filterData() {
    const arr = [...this.state.cars];
    const filteredArr = []

    switch(this.state.filterType) {
      case "name":arr.map(car => {
        if(car.name.toLowerCase().includes(this.state.filter.toLowerCase()))
          filteredArr.push(car);
      }); break;
      case "num_seat":arr.map(car => {
        if(car.author.toLowerCase().includes(this.state.filter.toLowerCase()))
          filteredArr.push(car);
      }); break;
      case "num_doors":arr.map(car => {
        if(car.num_doors.toLowerCase().includes(this.state.filter.toLowerCase()))
          filteredArr.push(car);
      }); break;
      case "fuel":arr.map(car => {
        if(car.fuel.toLowerCase().includes(this.state.filter.toLowerCase()))
          filteredArr.push(car);
      }); break;
      case "available":arr.map(car => {
        if(car.available.toString().toLowerCase().includes(this.state.filter.toLowerCase()))
          filteredArr.push(car);
      }); break;
      default: console.log("bruh")
      }
      this.setState({booksFound: filteredArr});
    }
  
    async getData() {
      const response = await fetch("http://localhost:8080/carshttp://localhost:8080/cars");
      try {
        const json = await response.json();
        this.setState({cars: json, carsFound: json});
        return console.log(this.state.cars);
      } catch(error) {
        console.log('Error happened here!')
        console.error(error)
      }
    }
    render() {
      return(
      <div>
        <h1>Rental Cars</h1>
        <input type="text" value={this.state.filter} onChange={this.handleChange}></input>
        <select onChange={(event) => {
          this.setState({filterType: event.target.value})
        }} name="filterType">
          <option value="name">Filter by name</option>
          <option value="num_seat">Filter by the number of the seats</option>
          <option value="num_doors">Filter by the number of the doors</option>
          <option value="fuel">Filter by fuel</option>
          <option value="available">Filter by availability</option>
        </select>
        <button onClick={() => {
          console.log(this.state.filterType)
        }}>Test</button>
        <ul>
          {this.state.carsFound.map(car => <li key={car.id}>{car.name}</li>)}
        </ul>
      </div>
      )
    }

} 
export default function App(){
  return <div>
    <Rentals />
  </div>
}

