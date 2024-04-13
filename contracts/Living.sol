// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "./Contract_2.sol";
import "./Signin.sol";

contract LivingDonor {
    struct LivingTransplantDetails {
        uint256 transplant_id;
        uint256 donor_id;
        uint256 reciever_id;
        string organ;
        int stage;
        int status;
        bool flag;
    }

    struct LivingTimeLine {
        uint256 start_donor_sur;
        uint256 end_donor_sur;
        uint256 start_receiver_sur;
        uint256 end_receiver_sur;
    }

    mapping(uint256 => LivingTransplantDetails) living_trans_Detail;

    mapping(uint256 => uint256[4]) living_trans_timeline;

    mapping(address => uint256[]) Living;

    struct Failed {
        bool flag;
        string report;
    }

    mapping(uint256 => Failed) failed;

    uint256 randNonce = 0;

    mapping(uint256 => bool) isRandom;

    mapping(uint256 => bool) Present;

    function LivingTransDetails(
        uint256 donor_id,
        uint256 reciever_id,
        string memory organ,
        address ContractA_Address
    ) public returns (uint256) {
        register ContractA = register(ContractA_Address);

        require(
            ContractA.check(msg.sender) == true,
            "No such MetaMask Address..Please Check..!!"
        );

        require(
            Present[donor_id] == false,
            "The Donor is already registered for Living Donation"
        );

        require(
            ContractA.checkDonor(donor_id) == true,
            "Please check and verify your Donor Id!!"
        );

        require(
            ContractA.checkReciever(reciever_id) == true,
            "Please check and verify your Reciever Id!!"
        );

        uint256 id = 0;

        Present[donor_id] = true;

        do {
            id = (++randNonce + block.timestamp) % 1000000;
        } while (isRandom[id] == true);

        LivingTransplantDetails
            memory living_transplant = LivingTransplantDetails(
                id,
                donor_id,
                reciever_id,
                organ,
                0,
                0,
                true
            );

        Living[msg.sender].push(id);

        living_trans_Detail[id] = living_transplant;

        return id;
    }

    function getLivingId() public view returns (uint256) {
        return Living[msg.sender][Living[msg.sender].length - 1];
    }

    function getAllLiving()
        public
        view
        returns (LivingTransplantDetails[] memory)
    {
        LivingTransplantDetails[] memory data = new LivingTransplantDetails[](
            Living[msg.sender].length
        );

        for (uint256 i = 0; i < Living[msg.sender].length; i++) {
            // Retrieve the BD struct from the mapping using brainDeadList[i] as the key
            LivingTransplantDetails memory bd = living_trans_Detail[
                Living[msg.sender][i]
            ];
            data[i] = bd;
        }

        return data;
    }

    function getlivingtransdetails(
        uint256 trans_id
    ) public view returns (LivingTransplantDetails memory) {
        return living_trans_Detail[trans_id];
    }

    function getFailed(uint256 trans_id) public view returns (Failed memory) {
        return failed[trans_id];
    }

    function getlivingtranstimeline(
        uint256 trans_id
    ) public view returns (uint256[4] memory) {
        return living_trans_timeline[trans_id];
    }

    function start_living_donor_surgery(uint256 transplant_id) public {
        require(
            living_trans_Detail[transplant_id].stage == 0,
            "Sorry complete the previous step first"
        );

        require(
            living_trans_Detail[transplant_id].status == 0,
            "Sorry the transaplant has been unsuccessful"
        );

        require(
            living_trans_Detail[transplant_id].flag == true,
            "No Such Transaplant Process Exists"
        );

        living_trans_timeline[transplant_id][0] = block.timestamp;
        living_trans_Detail[transplant_id].stage = 1;
    }

    function end_living_donor__surgery(uint256 transplant_id) public {
        require(
            living_trans_Detail[transplant_id].stage == 1,
            "Sorry complete the previous step first"
        );

        require(
            living_trans_Detail[transplant_id].status == 0,
            "Sorry the transaplant has been unsuccessful"
        );

        require(
            living_trans_Detail[transplant_id].flag == true,
            "No Such Transaplant Process Exists"
        );

        living_trans_timeline[transplant_id][1] = block.timestamp;
        living_trans_Detail[transplant_id].stage = 2;
    }

    function start_living_receiver_surgery(uint256 transplant_id) public {
        require(
            living_trans_Detail[transplant_id].stage == 2,
            "Sorry complete the previous step first"
        );

        require(
            living_trans_Detail[transplant_id].status == 0,
            "Sorry the transaplant has been unsuccessful"
        );

        require(
            living_trans_Detail[transplant_id].flag == true,
            "No Such Transaplant Process Exists"
        );

        living_trans_timeline[transplant_id][2] = block.timestamp;
        living_trans_Detail[transplant_id].stage = 3;
    }

    function end_living_receiver_surgery(
        uint256 transplant_id,
        address ContractA_Address
    ) public {
        register ContractA = register(ContractA_Address);

        require(
            living_trans_Detail[transplant_id].stage == 3,
            "Sorry complete the previous step first"
        );

        require(
            living_trans_Detail[transplant_id].status == 0,
            "Sorry the transaplant has been unsuccessful"
        );

        require(
            living_trans_Detail[transplant_id].flag == true,
            "No Such Transaplant Process Exists"
        );

        living_trans_timeline[transplant_id][3] = block.timestamp;
        living_trans_Detail[transplant_id].stage = 4;
        ContractA.remove_organ(
            living_trans_Detail[transplant_id].donor_id,
            living_trans_Detail[transplant_id].organ
        );

        ContractA.remove_receiver_organ(
            living_trans_Detail[transplant_id].reciever_id,
            living_trans_Detail[transplant_id].organ
        );
    }

    function TransNFT(uint256 trans_id) public {
        living_trans_Detail[trans_id].stage = 5;
        living_trans_Detail[trans_id].status = 1;
    }

    function failedTrans(uint256 transplant_id, string memory link) public {
        Failed memory f = Failed(true, link);

        failed[transplant_id] = f;

        living_trans_Detail[transplant_id].status = 2;
    }
}
