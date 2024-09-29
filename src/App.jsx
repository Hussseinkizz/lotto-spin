import React, { useState } from 'react';
import Web3 from 'web3';
import { SwisstronikPlugin } from '@swisstronik/web3-plugin-swisstronik';
import ABI from './constants/index'; // Contract ABI

const emojiDisplay = {
  confetti: '🎉',
  clover: '🍀',
  diamond: '💎',
  grapes: '🍇',
};

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [stake, setStake] = useState('');
  const [guessedEmoji, setGuessedEmoji] = useState('confetti');
  const [spinsRemaining, setSpinsRemaining] = useState(0);
  const [winnings, setWinnings] = useState(0);
  const [spinning, setSpinning] = useState(false); // Track the spin state
  const [winningEmoji, setWinningEmoji] = useState(null);

  // Initialize web3 and the contract
  async function initWeb3() {
    const web3Instance = new Web3(window.ethereum);
    web3Instance.registerPlugin(
      new SwisstronikPlugin('https://json-rpc.testnet.swisstronik.com/')
    );
    const contractInstance = new web3Instance.eth.Contract(
      ABI,
      '0xba6e17639e60faea001194882673f20a627391b3'
    );

    setWeb3(web3Instance);
    setContract(contractInstance);

    // Get user's wallet address
    const accounts = await web3Instance.eth.requestAccounts();
    setUserAddress(accounts[0]);
  }

  // Start a game
  async function startGame() {
    const pricePerSpin = 0.001; // Reduced price per spin for testing
    await contract.methods
      .startGame(web3.utils.toWei(stake, 'ether'), pricePerSpin)
      .send({ from: userAddress });
    alert('Game started!');
  }

  // Spin the wheel
  async function spin() {
    setSpinning(true);
    await contract.methods.spin(guessedEmoji).send({ from: userAddress });
    const result = await contract.methods.games(userAddress).call();
    setSpinsRemaining(result.spinsRemaining);
    setWinnings(web3.utils.fromWei(result.winnings, 'ether'));

    // Show the winning emoji
    const randomEmoji =
      Object.keys(emojiDisplay)[Math.floor(Math.random() * 4)];
    setWinningEmoji(emojiDisplay[randomEmoji]);

    setTimeout(() => {
      setSpinning(false);
    }, 2000); // Simulate spin duration
  }

  // Stop the game
  async function stopGame() {
    await contract.methods.stopGame().send({ from: userAddress });
    alert('Game stopped');
  }

  // Withdraw winnings
  async function getWinnings() {
    await contract.methods.getWinnings().send({ from: userAddress });
    alert('Winnings withdrawn!');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-6">Lotto Spin 3</h1>

        {!web3 ? (
          <button
            onClick={initWeb3}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full">
            Connect Wallet
          </button>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Your Address:</p>
              <p className="text-lg font-semibold text-gray-800 truncate w-full">
                {userAddress}
              </p>
            </div>

            {/* Top 60% Section: Spinning Emojis */}
            <div className="relative h-60 mb-6 flex items-center justify-center">
              {spinning ? (
                <div className="animate-spin-slow rounded-full border-4 border-dashed h-48 w-48">
                  {Object.values(emojiDisplay).map((emoji, index) => (
                    <span
                      key={index}
                      className="absolute"
                      style={{
                        transform: `rotate(${index * 90}deg) translate(100px)`,
                      }}>
                      {emoji}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-5xl">{winningEmoji}</div>
              )}
            </div>

            {/* Bottom 40% Section: User Inputs */}
            <div className="mb-6">
              <h2 className="block text-left text-gray-600 mb-2">
                Stake (ETH):
              </h2>
              <input
                type="number"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-500"
              />
              <button
                onClick={startGame}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Start Game
              </button>
            </div>

            <div className="mb-6">
              <h2 className="block text-left text-gray-600 mb-2">
                Guess Emoji:
              </h2>
              <select
                value={guessedEmoji}
                onChange={(e) => setGuessedEmoji(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-blue-500">
                {Object.keys(emojiDisplay).map((key) => (
                  <option key={key} value={key}>
                    {emojiDisplay[key]}
                  </option>
                ))}
              </select>
              <button
                onClick={spin}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg mt-4 w-full">
                Spin
              </button>
            </div>

            <div className="mb-6">
              <p className="text-lg text-gray-700">
                Spins Remaining:{' '}
                <span className="font-bold">{spinsRemaining}</span>
              </p>
              <p className="text-lg text-gray-700">
                Winnings: <span className="font-bold">{winnings} ETH</span>
              </p>
            </div>

            <div className="flex justify-between space-x-4">
              <button
                onClick={stopGame}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg w-full">
                Stop Game
              </button>
              <button
                onClick={getWinnings}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg w-full">
                Withdraw Winnings
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
