// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lotto3 {
    struct Game {
        uint userStake;
        uint spinsRemaining;
        uint winnings;
        bool isActive;
    }

    mapping(address => Game) public games;
    mapping(string => uint) public emojiMultipliers;

    constructor() {
        // Initialize emoji multipliers (using names instead of actual emoji)
        emojiMultipliers["confetti"] = 2; // 🎉
        emojiMultipliers["clover"] = 3; // 🍀
        emojiMultipliers["diamond"] = 5; // 💎
        emojiMultipliers["grapes"] = 4; // 🍇
    }

    // Start a game with a specific stake
    function startGame(uint stake, uint pricePerSpin) external {
        require(!games[msg.sender].isActive, "Game already active");
        uint spins = stake / pricePerSpin;
        require(spins > 0, "Not enough stake for at least one spin");

        games[msg.sender] = Game(stake, spins, 0, true);
    }

    // Perform a spin with the user's guess
    function spin(string memory guessedEmoji) external {
        Game storage game = games[msg.sender];
        require(game.isActive, "No active game");
        require(game.spinsRemaining > 0, "No spins remaining");

        // Deduct stake per spin
        uint stakePerSpin = game.userStake / game.spinsRemaining;
        game.userStake -= stakePerSpin;

        // Randomly select an emoji
        uint random = uint(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        ) % 4;
        string memory resultEmoji;

        if (random == 0) resultEmoji = "confetti";
        else if (random == 1) resultEmoji = "clover";
        else if (random == 2) resultEmoji = "diamond";
        else resultEmoji = "grapes";

        // Compare guessed emoji to result
        if (keccak256(bytes(resultEmoji)) == keccak256(bytes(guessedEmoji))) {
            uint multiplier = emojiMultipliers[resultEmoji];
            game.winnings += stakePerSpin * multiplier;
        }

        game.spinsRemaining--;

        // End the game if spins are done
        if (game.spinsRemaining == 0) {
            game.isActive = false;
        }
    }

    // Stop the game and calculate total winnings
    function stopGame() external {
        Game storage game = games[msg.sender];
        require(game.isActive, "No active game");

        // End the game
        game.isActive = false;
    }

    // Withdraw winnings
    function getWinnings() external {
        Game storage game = games[msg.sender];
        require(!game.isActive, "Game still active");
        require(game.winnings > 0, "No winnings to withdraw");

        uint amount = game.winnings;
        game.winnings = 0;

        payable(msg.sender).transfer(amount);
    }

    // Fallback function to allow contract to accept ETH
    receive() external payable {}
}
