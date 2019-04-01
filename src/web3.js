import Web3 from 'web3';

/*const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const provider = new HDWalletProvider(
    'game saddle oyster laundry equal loop lunch allow cactus endless hover unfair',
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
  );
*/
const web3 = new Web3(window.web3.currentProvider);

export default web3;
