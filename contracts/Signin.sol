// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "./Contract_2.sol";

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

    function checkDonor(uint256 id) public view returns (bool) {
        return isDonor[id].flag;
    }

    function AcceptedDonor(uint256 id) public view returns (bool) {
        return isDonor[id].status;
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

    function checkReciever(uint256 id) public view returns (bool) {
        return isReceiver[id].flag;
    }

    function AcceptedReciever(uint256 id) public view returns (bool) {
        return isReceiver[id].status;
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
        string memory organ,
        address ContractB_Address
    ) public returns (uint256[] memory) {
        delete ans;
        bool flag = false;

        NFT ContractB = NFT(ContractB_Address);

        require(isDonor[id].flag, "Sorry no such patient exists");

        require(
            isDead[id] == false,
            "Sorry the patient organs have already been pledged"
        );

        require(
            ContractB.verifyBrainDead(id) == true,
            "Given Donor has not been approved for Organ Donation Process"
        );

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

    // function remove_organ(
    //     uint256 id,
    //     uint256 r_id,
    //     string memory organ
    // ) public {

    //     for (uint256 i = 0; i < isDonor[id].organs.length; i++) {
    //         if (
    //             keccak256(abi.encode(organ)) ==
    //             keccak256(abi.encode(isDonor[id].organs[i]))
    //         ) {
    //             delete isDonor[id].organs[i];
    //         }
    //     }

    //     for (uint256 i = 0; i < isReceiver[r_id].organs.length; i++) {
    //         if (
    //             keccak256(abi.encode(organ)) ==
    //             keccak256(abi.encode(isReceiver[r_id].organs[i]))
    //         ) {
    //           delete isReceiver[r_id].organs[i];
    //         }
    //     }

    // }

    function remove_organ(
        uint256 id,
        uint256 r_id,
        string memory organ
    ) public returns (bool) {
        require(
            isDonor[id].flag == true,
            "Please check and verify your Donor Id!!"
        );

        require(isDonor[id].status == true, "The Given Donor is rejected..!!");

        require(
            isReceiver[r_id].flag == true,
            "Please check and verify your Reciever Id!!"
        );

        require(
            isReceiver[r_id].status == true,
            "The Given Reciever is rejected..!!"
        );

        string[] memory donor_array = new string[](
            isDonor[id].organs.length - 1
        );

        string[] memory rec_array = new string[](
            isReceiver[r_id].organs.length - 1
        );

        uint256 index = 0;

        for (uint256 i = 0; i < isDonor[id].organs.length; i++) {
            if (
                keccak256(abi.encode(organ)) ==
                keccak256(abi.encode(isDonor[id].organs[i]))
            ) {
                delete isDonor[id].organs[i];
            } else {
                donor_array[index] = isDonor[id].organs[i];

                index = index + 1;
            }
        }

        isDonor[id].organs = donor_array;

        index = 0;

        for (uint256 i = 0; i < isReceiver[r_id].organs.length; i++) {
            if (
                keccak256(abi.encode(organ)) ==
                keccak256(abi.encode(isReceiver[r_id].organs[i]))
            ) {
                delete isReceiver[r_id].organs[i];
            } else {
                rec_array[index] = isReceiver[r_id].organs[i];

                index = index + 1;
            }
        }

        isReceiver[r_id].organs = rec_array;

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

    function checkDead(uint256 id) public view returns (bool) {
        return isDead[id];
    }

    // ******************************************************************************************************//

    // ************************************* Living Transplant *****************************************//

    struct LivingTransplantDetails{
        uint256 donor_id;
        uint256 reciever_id;
        address donor_hosp;
        address reciever_hosp;
        string organ;
        int256 stage;
        bool success;
        bool flag;
        bool consent;
    }
    struct LivingTimeLine {
        uint256 start_donor_sur;
        uint256 end_donor_sur;
        uint256 start_receiver_sur;
        uint256 end_receiver_sur;
    }
    mapping(uint256 => LivingTransplantDetails) living_trans_Detail;
    mapping(uint256 => LivingTimeLine) living_trans_timeline;

    function getlivingtransdetails(uint256 trans_id) public returns(LivingTransplantDetails memory)
    {
            return living_trans_Detail[trans_id];
    }
    function LivingTransDetails(
        uint256 donor_id,
        uint256 reciever_id,
        address donor_hosp,
        address reciever_hosp,
        uint256 transplant_id,
        string memory organ
    ) public {
        require(
            check(donor_hosp) == true,
            "No such MetaMask Address..Please Check..!!"
        );

        require(
            checkDonor(donor_id) == true,
            "Please check and verify your Donor Id!!"
        );

        require(
            AcceptedDonor(donor_id) == true,
            "The Given Donor is rejected..!!"
        );

        require(
            checkReciever(reciever_id) == true,
            "Please check and verify your Reciever Id!!"
        );

        require(
            AcceptedReciever(reciever_id) == true,
            "The Given Reciever is rejected..!!"
        );

        require(
            keccak256(abi.encode(donor_hosp))==keccak256(abi.encode(reciever_hosp)),
            "Donor and Receiver must be from same hospital"
        );
  
        LivingTransplantDetails memory living_transplant = LivingTransplantDetails(
            donor_id,
            reciever_id,
            donor_hosp,
            reciever_hosp,
            organ,
            1,
            false,
            true,
            true
        );

        living_trans_Detail[transplant_id] = living_transplant;
        LivingTimeLine memory livingtimeline = LivingTimeLine(
            block.timestamp,
            block.timestamp,
            block.timestamp,
            block.timestamp
        );
        living_trans_timeline[transplant_id]= livingtimeline;
    }
    function start_living_donor_surgery(uint256 transplant_id) public returns (bool) {

        living_trans_timeline[transplant_id].start_donor_sur= block.timestamp;
        living_trans_Detail[transplant_id].stage = 2;
        return true;
    }
    function end_living_donor__surgery(uint256 transplant_id
    ) public returns (bool) {
        require(
            living_trans_Detail[transplant_id].stage == 2,
            "Sorry complete the previous step first"
        );
        living_trans_timeline[transplant_id].end_donor_sur= block.timestamp;
        living_trans_Detail[transplant_id].stage = 3;
        return true;
    }
     function start_living_receiver_surgery(uint256 transplant_id) public returns (bool) {

        require(
            living_trans_Detail[transplant_id].stage == 3,
            "Sorry complete the previous step first"
        );
        living_trans_timeline[transplant_id].start_receiver_sur= block.timestamp;
        living_trans_Detail[transplant_id].stage = 4;
        return true;
    }
        function end_living_receiver_surgery(
        uint256 transplant_id
    ) public returns (bool) {
        require(
            living_trans_Detail[transplant_id].stage == 4,
            "Sorry complete the previous step first"
        );
        living_trans_timeline[transplant_id].end_receiver_sur= block.timestamp;
        living_trans_Detail[transplant_id].stage = 5;
        remove_organ(
            living_trans_Detail[transplant_id].donor_id,
            living_trans_Detail[transplant_id].reciever_id,
            living_trans_Detail[transplant_id].organ
        );
        return true;
    }
}

