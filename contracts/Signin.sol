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
        require(
            map[metamask_address].flag == false,
            "Sorry the MetaMask Address is already being used"
        );
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

    mapping(address => bool) Addresses;

    uint256 randNonce = 0;

    //Registering Donor

    function registerDonor(
        address metamask_address,
        string memory hla,
        string memory bloodgrp,
        string[] memory organs,
        bool status
    ) public returns (uint256) {
        require(check(msg.sender) == true, "Sorry the accout is not premitted");

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
            Addresses[metamask_address] = true;
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
        require(check(msg.sender) == true, "Sorry the accout is not premitted");

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
            Addresses[metamask_address] = true;
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

    function MatchedReciever(uint256 id) public {
        isReceiver[id].braindead = true;
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
                keccak256(abi.encode(isReceiver[receiver[j]].hla)) &&
                (isDead[receiver[j]] == false)
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
        require(check(msg.sender) == true, "Sorry the accout is not premitted");
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

    // ***************************************************************************************************************//

    // *************************************Removing Organs After Transplant *****************************************//

    function remove_organ(
        uint256 id,
        string memory organ
    ) public returns (bool) {
        require(
            isDonor[id].flag == true,
            "Please check and verify your Donor Id!!"
        );

        require(isDonor[id].status == true, "The Given Donor is rejected..!!");

        string[] memory donor_array = new string[](
            isDonor[id].organs.length - 1
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

        return true;
    }

    function remove_receiver_organ(
        uint256 r_id,
        string memory organ
    ) public returns (bool) {
        require(
            isReceiver[r_id].flag == true,
            "Please check and verify your Reciever Id!!"
        );

        require(
            isReceiver[r_id].status == true,
            "The Given Reciever is rejected..!!"
        );

        string[] memory rec_array = new string[](
            isReceiver[r_id].organs.length - 1
        );

        uint256 index = 0;

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

    function add_receiver_organ(
        uint256 r_id,
        string memory organ
    ) public returns (bool) {
        require(
            isReceiver[r_id].flag == true,
            "Please check and verify your Reciever Id!!"
        );

        require(
            isReceiver[r_id].status == true,
            "The Given Reciever is rejected..!!"
        );

        isReceiver[r_id].organs.push(organ);

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

    function DeadReceiver(uint256 id) public {
        isDead[id] = true;
    }

    // ******************************************************************************************************//

    // *************************************Failed Transaction ***********************************//

    struct Failed {
        bool flag;
        string report;
    }

    mapping(int => Failed) failed;

    function failedTrans(
        int transplant_id,
        uint256 r_id,
        string memory link,
        string memory organ,
        address ContractB_Address
    ) public {
        NFT ContractB = NFT(ContractB_Address);

        Failed memory f = Failed(true, link);

        failed[transplant_id] = f;

        add_receiver_organ(r_id, organ);

        ContractB.failed(transplant_id);
    }

    function checkTrans(int transplant_id) public view returns (bool) {
        return failed[transplant_id].flag;
    }

    function getFailedTrans(
        int transplant_id
    ) public view returns (Failed memory) {
        return failed[transplant_id];
    }

    function getTransDet(
        int trans_id,
        address ContractB_Address
    )
        public
        view
        returns (
            uint256 donor_id,
            uint256 receiver_id,
            address donor_hosp,
            address receiever_hosp,
            string memory organ,
            int256 stage,
            uint256 success,
            bool flag
        )
    {
        NFT ContractB = NFT(ContractB_Address);

        return ContractB.trans_Detail(trans_id);
    }

    function getTransTime(
        int trans_id,
        address ContractB_Address
    )
        public
        view
        returns (
            uint256 organ_match,
            uint256 start_trans,
            uint256 end_trans,
            uint256 start_sur,
            uint256 end_sur
        )
    {
        NFT ContractB = NFT(ContractB_Address);

        return ContractB.trans_timeline(trans_id);
    }

    function getDriverDet(
        int trans_id,
        address ContractB_Address
    )
        public
        view
        returns (string memory name, string memory plate_num, uint256 contact)
    {
        NFT ContractB = NFT(ContractB_Address);

        return ContractB.driver_details(trans_id);
    }
}
