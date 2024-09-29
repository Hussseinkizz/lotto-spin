import { Web3 } from 'web3';

//2. import swisstronik plugin
import { SwisstronikPlugin } from '@swisstronik/web3-plugin-swisstronik';

//3. import ABI of counter contract
import ABI from './constants/index';

function App() {
  //4. initialize the web3 object
  const web3 = new Web3(window.ethereum);

  //5. register swisstronik plugin
  web3.registerPlugin(
    new SwisstronikPlugin('https://json-rpc.testnet.swisstronik.com/')
  );

  //6. initialize contract
  const contract = new web3.eth.Contract(
    ABI,
    '0xba6e17639e60faea001194882673f20a627391b3'
  );

  //7. call the contract
  async function readCount() {
    console.log(await web3.eth.getChainId());

    const result = await contract.methods.readCount().call();
    console.log('current count', result);
  }

  async function addCount() {
    // connect user's account
    const accounts = await web3.eth.requestAccounts();

    // call the writing function "addCount"
    const receipt = await contract.methods
      .addCount()
      .send({ from: accounts[0] });
    console.log('tx receipt:', receipt);
  }

  return (
    <div className="App">
      <button onClick={readCount}>Count (reading fn)</button>
      <button onClick={addCount}>Add Count (writing fn)</button>
    </div>
  );
}

export default App;
