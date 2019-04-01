import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import ensContract from './ensContract';

class App extends Component {
  state = {
    
    events: [],
    address: '',
    averageTransactions: 0,
    numberOfDays: 0,
    message: ''
  };

  async componentDidMount() {
    const averageTransactions = 6000;
    const numberOfDays = 2;

    await ensContract.getPastEvents("BidRevealed", {
      fromBlock: (await web3.eth.getBlockNumber()) - (averageTransactions * numberOfDays),
      toBlock: "latest"
    }, (error, events)=> { this.setState({ events}); })
    .then((events) => {
        console.log(JSON.stringify(events)) 
    }); 


    const address = ensContract.options.address;
    const message = "Ens Contract events visulization";
    this.setState({averageTransactions});
    this.setState({message});
    this.setState({numberOfDays});
    this.setState({ address})

  }

  
  onSubmit = async event => {
    event.preventDefault();

 

   const events = await ensContract.getPastEvents("BidRevealed", {
    fromBlock: (await web3.eth.getBlockNumber()) - (this.state.averageTransactions * this.state.numberOfDays),
    toBlock: "latest"
  });
  this.setState({events});
  
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await ensContract.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };

  render() {
    return (
      <div style={{float : 'left', width : '100%'}}> 
        <h2>Ens Contract - BidRevealed (unsealBid function) event visualization </h2>
        <p>
          The ENS  contract address is  {this.state.address}. 
        </p>

        <hr />

        <form onSubmit={this.onSubmit} >
          <h4>Want to change default parameters?</h4>
          <div style={{float : 'left', width : '40%'}}>
            <label>Average Blocks mined per day</label>
            <input
              value={this.state.averageTransactions}
              onChange={event => this.setState({ averageTransactions: event.target.value })}
            />
          </div>
          <div style={{float : 'left', width : '40%'}}>
            <label>Number of Days</label>
            <input
              value={this.state.numberOfDays}
              onChange={event => this.setState({ numberOfDays: event.target.value })}
            />
          </div>
          <button>Refresh Data</button>
        </form>

        <hr />

        <h4>Events Detail</h4>
        
        <div style={{float : 'left', width : '100%'}}>
        <textarea
             cols={100} rows={10}
              value= { JSON.stringify(this.state.events) }
              
        />

        <hr />

        <h1>{this.state.message}:</h1>
	<h4>There are currently{' '}
          {this.state.events.length} BidRevealed events occured, considering avg {' '}
          {this.state.averageTransactions} blocks mined per day for {' '}
          {this.state.numberOfDays} days!</h4>
        </div>

      
      </div>
    );
  }
}

export default App;
