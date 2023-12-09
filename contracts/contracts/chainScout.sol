// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; 

import "@openzeppelin/contracts/access/Ownable.sol";


contract chainScout is Ownable {
    
    uint256 totalAirdrops = 0;
    struct airdrop {
        uint256 id;
        string name;
        uint256 total;
        uint256 available;
        uint256 amount;
        bool anonAadharEnabled;
        string verification;
    }

    constructor(address initialOwner)
        Ownable(initialOwner)
    {}

    airdrop[] public airdrops;

    function createAirdrop (string memory name, uint256 _allowed, uint256 _amount, bool anonAEnabled, string memory verification) payable external{
        airdrops.push(airdrop(totalAirdrops, name, _allowed, _allowed, _amount, anonAEnabled, verification));
        require(msg.value >= _amount * 10 ** 18, "Amount sent is less");
        totalAirdrops += 1;

    }

    function sendAirdrop (uint256 id, address payable _recipient) payable public onlyOwner {
        require(airdrops[id].available > 0, "no more airdrops available");
        uint256 value = (airdrops[id].amount / airdrops[id].total) * 10 ** 18;

        bool sent = _recipient.send(value);
        require(sent, "Failed to send Ether");
        airdrops[id].available -= 1;
    }

    receive() external payable { }
    fallback() external payable { }

}