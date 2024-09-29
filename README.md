# Lotto Spin -- pending work, unfinished

Welcome to Lotto Spin, a simple spin-to-win game built with blockchain technology. This project demonstrates the integration of Web3.js, Solidity smart contracts, and MetaMask, utilizing the SwisstronikPlugin for enhanced functionality.

## Important Note

**This game does not use real Ether.** We implemented the game without test points due to their unavailability. Instead, the game operates with simulated points to demonstrate the concept and functionality.

## Game Overview

Lotto Spin is an emoji-themed spinning game where players stake virtual points to participate. The objective is to correctly guess the winning emoji and accumulate as many points as possible.

## How to Play

1. **Stake Points**: Begin by staking a chosen amount of virtual points.
2. **Select an Emoji**: Choose one of four emojis: 🎉, 🍀, 💎, or 🍇.
3. **Spin the Wheel**: Initiate the spin to determine the winning emoji.
4. **Win or Lose**: If your chosen emoji matches the result, you win points.
5. **Continue or Cash Out**: Decide whether to keep playing or end the game.

## Technology Stack

- **Frontend**: React.js for a responsive and interactive user interface.
- **Blockchain Interaction**: Web3.js to facilitate communication with the blockchain.
- **Smart Contract**: Developed in Solidity to manage game logic and ensure fairness.
- **Blockchain Plugin**: SwisstronikPlugin for enhanced blockchain functionality.
- **Wallet Integration**: MetaMask for user authentication and transaction signing.

## Desired Behavior

1. **Game Initialization**:
   - Player enters stake amount and starts the game.
   - Smart contract initializes the game state, setting spins based on stake.

2. **Spinning Mechanism**:
   - Player selects an emoji and initiates a spin.
   - Contract generates a random winning emoji.
   - Winnings are updated if the player's guess is correct.
   - Remaining spins are decremented.

3. **Game Conclusion**:
   - Player can end the game at any time.
   - Winnings are finalized and added to the player's balance.
   - Game state is reset for the next round.

4. **Smart Contract Interaction**:
   - All game logic is handled by the Solidity smart contract.
   - Frontend interacts with the contract via Web3.js and MetaMask.

5. **Randomness and Fairness**:
   - Winning emojis are generated using secure blockchain-based randomness.

## Disclaimer

Lotto Spin is a simulated game using virtual points, not real cryptocurrency. It's designed for educational and entertainment purposes to demonstrate blockchain gaming concepts.

Enjoy exploring Lotto Spin and its underlying technologies!
