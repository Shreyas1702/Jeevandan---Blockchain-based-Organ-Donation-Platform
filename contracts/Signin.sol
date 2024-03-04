// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract register is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Oragan Donation", "OD") {}

    uint[] donor;
    uint[] isRop;
    uint[] isRon;
    uint[] isRap;
    uint[] isRan;
    uint[] isRbp;
    uint[] isRbn;
    uint[] isRabn;
    uint[] isRabp;

    uint[] receiver;
    struct Memo {
        string username;
        uint id;
        uint timestamp;
        bool flag;
    }

    mapping(address => Memo) map;

    Memo[] memos;

    function registerHospital(
        string memory name,
        uint hospital_id,
        address metamask_address
    ) public payable {
        Memo memory newMemo = Memo(name, hospital_id, block.timestamp, true);
        map[metamask_address] = newMemo;
        memos.push(newMemo);
    }

    function check(address id) public view returns (bool) {
        return map[id].flag;
    }

    struct RegDonor {
        address metamask_address;
        string hla;
        string bloodgrp;
        string[] organs;
        bool flag;
    }

    struct RegRecieve {
        address metamask_address;
        string hla;
        string bloodgrp;
        string[] organs;
        bool flag;
    }

    mapping(uint256 => RegDonor) isDonor;

    mapping(uint256 => RegDonor) RejectDonor;

    mapping(uint256 => RegRecieve) isReceiver;

    mapping(uint256 => RegRecieve) RejectReceiver;

    mapping(uint256 => bool) isRandom;

    uint randNonce = 0;

    //NFT--Minting
    function awardItem(
        address player,
        string memory tokenURI
    ) public returns (uint256) {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    //Registering Donor

    function registerDonor(
        address metamask_address,
        string memory hla,
        string memory bloodgrp,
        string[] memory organs,
        bool status
    ) public returns (uint256) {
        RegDonor memory regDonor = RegDonor(
            metamask_address,
            hla,
            bloodgrp,
            organs,
            true
        );

        randNonce++;
        uint256 id = 0;

        do {
            id =
                uint(
                    keccak256(
                        abi.encodePacked(block.timestamp, msg.sender, randNonce)
                    )
                ) %
                1000000;
        } while (isRandom[id] == true);

        isRandom[id] = true;

        if (status == true) {
            isDonor[id] = regDonor;
            donor.push(id);
        } else {
            RejectDonor[id] = regDonor;
            donor.push(id);
        }

        return id;
    }

    function getDonorId() public view returns (uint256) {
        return donor[donor.length - 1];
    }

    function getRegDonor(uint256 id) public view returns (RegDonor memory) {
        return isDonor[id];
    }

    function checkDonor(uint256 id) public view returns (bool) {
        return isDonor[id].flag;
    }

    function registerReceive(
        address metamask_address,
        string memory hla,
        string memory bloodgrp,
        string[] memory organs,
        bool status
    ) public returns (uint256) {
        RegRecieve memory regRecieve = RegRecieve(
            metamask_address,
            hla,
            bloodgrp,
            organs,
            true
        );

        randNonce++;
        uint256 id = 0;

        do {
            id =
                uint(
                    keccak256(
                        abi.encodePacked(block.timestamp, msg.sender, randNonce)
                    )
                ) %
                1000000;
        } while (isRandom[id] == true);

        isRandom[id] = true;

        if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("O+")) &&
            status == true
        ) {
            isRop.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("O-")) &&
            status == true
        ) {
            isRon.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("A+")) &&
            status == true
        ) {
            isRap.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("A-")) &&
            status == true
        ) {
            isRan.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("B+")) &&
            status == true
        ) {
            isRbp.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("B-")) &&
            status == true
        ) {
            isRbn.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("AB+")) &&
            status == true
        ) {
            isRabp.push(id);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("AB-")) &&
            status == true
        ) {
            isRabn.push(id);
        }

        if (status == true) {
            isReceiver[id] = regRecieve;
            receiver.push(id);
        } else {
            RejectReceiver[id] = regRecieve;
            receiver.push(id);
        }

        return id;
    }

    function getRecieverId() public view returns (uint256) {
        return receiver[receiver.length - 1];
    }

    function getRegReceive(uint256 id) public view returns (RegRecieve memory) {
        return isReceiver[id];
    }

    function checkReceive(uint256 id) public view returns (bool) {
        return isReceiver[id].flag;
    }

    function printArraydonor() public view returns (uint[] memory) {
        return donor;
    }

    function printArrayreceiver() public view returns (uint[] memory) {
        return receiver;
    }

    uint[] matched_receiver;

    function matchDonorwReceiver(
        uint[] memory receivers,
        uint id,
        string memory org
    ) public returns (uint[] memory) {
        delete matched_receiver;

        for (uint j = 0; j < receivers.length; j++) {
            if (
                keccak256(abi.encode(isDonor[id].hla)) ==
                keccak256(abi.encode(isReceiver[receiver[j]].hla))
            ) {
                for (
                    uint i = 0;
                    i < isReceiver[receiver[j]].organs.length;
                    i++
                ) {
                    if (
                        keccak256(abi.encode(org)) ==
                        keccak256(abi.encode(isReceiver[receiver[j]].organs[i]))
                    ) {
                        matched_receiver.push(receivers[j]);
                    }
                }
            }
        }
        return matched_receiver;
    }

    function getMatchedArray() public view returns (uint[] memory) {
        return matched_receiver;
    }

    uint[] ans;

    function passbloodgrpid(
        string memory bloodgrp,
        uint id,
        string memory organ
    ) public returns (uint[] memory) {
        delete ans;

        if (keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("O+"))) {
            ans = matchDonorwReceiver(isRop, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("O-"))
        ) {
            ans = matchDonorwReceiver(isRon, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("A+"))
        ) {
            ans = matchDonorwReceiver(isRap, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("A-"))
        ) {
            ans = matchDonorwReceiver(isRan, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("B+"))
        ) {
            ans = matchDonorwReceiver(isRbp, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("B-"))
        ) {
            ans = matchDonorwReceiver(isRbn, id, organ);
        } else if (
            keccak256(abi.encode(bloodgrp)) == keccak256(abi.encode("AB+"))
        ) {
            ans = matchDonorwReceiver(isRabp, id, organ);
        } else {
            ans = matchDonorwReceiver(isRabn, id, organ);
        }

        return ans;
    }
}
