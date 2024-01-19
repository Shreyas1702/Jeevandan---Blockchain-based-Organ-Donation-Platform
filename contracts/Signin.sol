// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract enterDetails {
    struct Memo {
        string name;
        uint hospital_id;
        string email;
        int longitude;
        int latitude;
        uint timestamp;
        bool flag;
    }
    mapping(address => Memo) map;
    Memo[] memos;

    function registerHospital(
        string memory name,
        uint hospital_id,
        string memory email,
        int longitude,
        int latitude,
        address metamask_address
    ) public payable {
        Memo memory newMemo = Memo(
            name,
            hospital_id,
            email,
            longitude,
            latitude,
            block.timestamp,
            true
        );
        map[metamask_address] = newMemo;
        memos.push(newMemo);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function check(address id) public view returns (bool) {
        return map[id].flag;
    }

    struct RegDonor {
        address metamask_address;
        string name;
        int weight;
        int height;
        string link;
        string hla;
        string bloodgrp;
        string organs;
        int age;
        int kincontact;
        bool flag;
        bool check;
    }

    mapping(uint256 => RegDonor) isDonor;

    mapping(uint256 => RegDonor) RejectDonor;

    mapping(uint256 => bool) isRandom;

    struct RegRecieve {
        address metamask_address;
        string name;
        int weight;
        int height;
        string link;
        string hla;
        string bloodgrp;
        string organs;
        int contact;
        int age;
        bool flag;
        bool check;
    }

    mapping(uint256 => RegRecieve) isReceiver;

    mapping(uint256 => RegRecieve) RejectReceiver;

    uint randNonce = 0;

    function registerDonor(
        address metamask_address,
        string memory name,
        int weight,
        int height,
        string memory link,
        string memory hla,
        string memory bloodgrp,
        string memory organs,
        int age,
        int kincontact,
        bool flag
    ) public payable returns (uint) {
        RegDonor memory regDonor = RegDonor(
            metamask_address,
            name,
            weight,
            height,
            link,
            hla,
            bloodgrp,
            organs,
            age,
            kincontact,
            flag,
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

        if (flag == true) isDonor[id] = regDonor;
        else RejectDonor[id] = regDonor;

        return id;
    }

    function getRegDonor(uint256 id) public view returns (RegDonor memory) {
        return isDonor[id];
    }

    function checkDonor(uint256 id) public view returns (bool) {
        return isDonor[id].check;
    }

    function registerReceive(
        address metamask_address,
        string memory name,
        int weight,
        int height,
        string memory link,
        string memory hla,
        string memory bloodgrp,
        string memory organs,
        int contact,
        int age,
        bool flag
    ) public payable returns (uint) {
        RegRecieve memory regRecieve = RegRecieve(
            metamask_address,
            name,
            weight,
            height,
            link,
            hla,
            bloodgrp,
            organs,
            contact,
            age,
            flag,
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

        if (flag == true) isReceiver[id] = regRecieve;
        else RejectReceiver[id] = regRecieve;

        return id;
    }

    function getRegReceive(uint256 id) public view returns (RegRecieve memory) {
        return isReceiver[id];
    }

    function checkReceive(uint256 id) public view returns (bool) {
        return isReceiver[id].check;
    }
}
