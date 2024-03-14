// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";

contract register {
    uint256[] isRop;
    uint256[] isRon;
    uint256[] isRap;
    uint256[] isRan;
    uint256[] isRbp;
    uint256[] isRbn;
    uint256[] isRabn;
    uint256[] isRabp;
    uint256[] donor;
    uint256[] receiver;

    // *************************************Registering A Hospital*****************************************//
    struct Memo {
        string username;
        uint256 id;
        uint256 timestamp;
        bool flag;
    }

    mapping(address => Memo) map;

    function registerHospital(
        string memory name,
        uint256 hospital_id,
        address metamask_address
    ) public payable {
        Memo memory newMemo = Memo(name, hospital_id, block.timestamp, true);
        map[metamask_address] = newMemo;
    }

    function check(address id) public view returns (bool) {
        return map[id].flag;
    }

    // *****************************************************************************************************//

    // *************************************Registering A Donor*****************************************//

    struct RegDonor {
        address metamask_address;
        string hla;
        string bloodgrp;
        string[] organs;
        bool flag;
        bool status;
        bool braindead;
    }

    mapping(uint256 => bool) isRandom;

    mapping(uint256 => bool) isDead;

    mapping(uint256 => RegDonor) isDonor;

    mapping(uint256 => RegDonor) RejectDonor;

    uint256 randNonce = 0;

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
            true,
            status,
            false
        );

        randNonce++;
        uint256 id = 0;

        do {
            id =
                uint256(
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

    // ****************************************************************************************************//

    // *************************************Registering A Reciever*****************************************//

    mapping(uint256 => RegDonor) isReceiver;

    mapping(uint256 => RegDonor) transplant_recipent;

    mapping(uint256 => RegDonor) RejectReceiver;

    function registerReceive(
        address metamask_address,
        string memory hla,
        string memory bloodgrp,
        string[] memory organs,
        bool status
    ) public returns (uint256) {
        RegDonor memory regRecieve = RegDonor(
            metamask_address,
            hla,
            bloodgrp,
            organs,
            true,
            status,
            false
        );

        randNonce++;
        uint256 id = 0;

        do {
            id =
                uint256(
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

    function getRegReceive(uint256 id) public view returns (RegDonor memory) {
        return isReceiver[id];
    }

    // ********************************************************************************************************//

    // ****************************************Matching Organs*************************************************//

    uint256[] matched_receiver;

    function matchDonorwReceiver(
        uint256[] memory receivers,
        uint256 id,
        string memory org
    ) public returns (uint256[] memory) {
        delete matched_receiver;

        for (uint256 j = 0; j < receivers.length; j++) {
            if (
                keccak256(abi.encode(isDonor[id].hla)) ==
                keccak256(abi.encode(isReceiver[receiver[j]].hla))
            ) {
                for (
                    uint256 i = 0;
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

    function getMatchedArray() public view returns (uint256[] memory) {
        return matched_receiver;
    }

    uint256[] ans;

    function passbloodgrpid(
        string memory bloodgrp,
        uint256 id,
        string memory organ
    ) public returns (uint256[] memory) {
        delete ans;
        bool flag = false;

        require(
            isDead[id] == false,
            "Sorry the patient organs have already been pledged"
        );

        require(isDonor[id].flag, "Sorry no such patient exists");

        require(
            keccak256(abi.encode(bloodgrp)) ==
                keccak256(abi.encode(isDonor[id].bloodgrp)),
            "Sorry wrong details entered"
        );

        for (uint256 i = 0; i < isDonor[id].organs.length; i++) {
            if (
                keccak256(abi.encode(organ)) ==
                keccak256(abi.encode(isDonor[id].organs[i]))
            ) {
                flag = true;
            }
        }

        if (flag == false) revert("Sorry the user has'nt pledged this organ..");

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

    // *****************************************************************************************************//

    // *************************************Removing Organs After Transplant *****************************************//

    function end_surgery(
        uint256 id,
        uint256 r_id,
        string memory organ
    ) public returns (bool) {
        for (uint256 i = 0; i < isDonor[id].organs.length; i++) {
            if (
                keccak256(abi.encode(organ)) ==
                keccak256(abi.encode(isDonor[id].organs[i]))
            ) {
                delete isDonor[id].organs[i];
            }
        }

        for (uint256 i = 0; i < isReceiver[r_id].organs.length; i++) {
            if (
                keccak256(abi.encode(organ)) ==
                keccak256(abi.encode(isReceiver[r_id].organs[i]))
            ) {
                delete isReceiver[id].organs[i];
            }
        }

        return true;
    }

    // ***********************************************************************************************************//

    // *************************************Transfering Donor to DeadList*****************************************//

    function getOrganLength(uint256 id) public returns (uint256) {
        if (isDonor[id].organs.length == 0) {
            isDead[id] = true;
        }

        return isDonor[id].organs.length;
    }
}
