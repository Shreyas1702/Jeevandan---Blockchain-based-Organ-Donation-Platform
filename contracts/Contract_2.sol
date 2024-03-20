// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Signin.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Oragan Donation", "OD") {}

    uint256[] brainDead;

    // *********************************************NFT_MINTING**************************************************//

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

    // ********************************************************************************************************//

    // *************************************Pushing Brain Dead Patient*****************************************//

    struct BD {
        uint256 id;
        address donor_hosp;
        address doc_1;
        address doc_2;
        uint256 id1;
        uint256 id2;
        uint256 sign1;
        uint256 sign2;
        bool status;
        bool flag;
        uint256 timestamp;
    }

    uint256[] brainDeadList;

    mapping(uint256 => BD) public BDmapping;

    mapping(address => uint256[]) BdArray;

    mapping(uint256 => uint256[]) DocArray;

    function brain_Dead(
        uint256 donor_id,
        address donor_hosp,
        address ContractA_Address
    ) public returns (bool) {
        require(
            BDmapping[donor_id].flag == false,
            "The Donor is already present in the List"
        );

        register ContractA = register(ContractA_Address);

        require(
            ContractA.check(donor_hosp) == true,
            "No such MetaMask Address..Please Check..!!"
        );

        BdArray[donor_hosp].push(donor_id);

        BD memory regBD = BD(
            donor_id,
            donor_hosp,
            0x0000000000000000000000000000000000000000,
            0x0000000000000000000000000000000000000000,
            0,
            0,
            0,
            0,
            false,
            true,
            block.timestamp
        );

        BDmapping[donor_id] = regBD;

        brainDeadList.push(donor_id);

        return true;
    }

    // For Admins..

    function getAllBDs() public view returns (BD[] memory) {
        BD[] memory data = new BD[](brainDeadList.length);

        for (uint256 i = 0; i < brainDeadList.length; i++) {
            // Retrieve the BD struct from the mapping using brainDeadList[i] as the key
            BD memory bd = BDmapping[brainDeadList[i]];
            data[i] = bd;
        }

        return data;
    }

    // For Hsopitals..
    function getbrainDead(
        address donor_hosp,
        address ContractA_Address
    ) public view returns (uint256[] memory) {
        register ContractA = register(ContractA_Address);

        require(
            ContractA.check(donor_hosp) == true,
            "No such MetaMask Address..Please Check..!!"
        );

        return BdArray[donor_hosp];
    }

    function reg_braindead(
        uint256 id,
        address doc_1,
        address doc_2,
        uint256 id1,
        uint256 id2,
        address donor_hosp
    ) public {
        require(
            BDmapping[id].flag == true,
            "Donor is not there in the list.Please verify.."
        );

        BDmapping[id].doc_1 = doc_1;

        BDmapping[id].doc_2 = doc_2;

        BDmapping[id].id1 = id1;
        DocArray[id1].push(id);

        BDmapping[id].id2 = id2;
        DocArray[id2].push(id);
    }

    // for Doctors...

    function DocPat(uint256 id) public view returns (BD[] memory) {
        BD[] memory data = new BD[](DocArray[id].length);

        for (uint256 i = 0; i < DocArray[id].length; i++) {
            // Retrieve the BD struct from the mapping using brainDeadList[i] as the key
            BD memory bd = BDmapping[DocArray[id][i]];
            data[i] = bd;
        }

        return data;
    }

    function signApproval(uint256 id, uint256 val) public {
        require(
            BDmapping[id].flag == true,
            "Donor is not there in the list.Please verify.."
        );

        require(
            msg.sender == BDmapping[id].doc_1 ||
                msg.sender == BDmapping[id].doc_2,
            "Your are not allowed to perform this operation"
        );

        if (msg.sender == BDmapping[id].doc_1) {
            require(BDmapping[id].sign1 == 0, "You can only do it once");
            BDmapping[id].sign1 = val;
        } else {
            require(BDmapping[id].sign2 == 0, "You can only do it once");
            BDmapping[id].sign2 = val;
        }

        if (BDmapping[id].sign1 != 0 && BDmapping[id].sign2 != 0) {
            if (BDmapping[id].sign1 == 2 || BDmapping[id].sign2 == 0)
                BDmapping[id].status = false;
            else BDmapping[id].status = true;
        }
    }

    function getBrainDeadDetails(
        uint256[] memory list
    ) public view returns (BD[] memory) {
        // Allocate memory for the result array
        BD[] memory data = new BD[](list.length);

        for (uint256 i = 0; i < list.length; i++) {
            // Retrieve the BD struct from the mapping using list[i] as the key
            BD memory bd = BDmapping[list[i]];
            data[i] = bd;
        }

        return data;
    }

    // ******************************************************************************************************//

    // *************************************Transplant and TimeLine Details*****************************************//

    struct DriverDetails {
        string name;
        string plate_num;
        int256 contact;
    }

    struct TransplantDetail {
        int256 donor_id;
        int256 reciever_id;
        address donor_hosp;
        address reciever_hosp;
        int stage;
        bool success;
    }

    struct TimeLine {
        uint256 organ_match;
        uint256 start_trans;
        uint256 end_trans;
        uint256 start_sur;
        uint256 end_sur;
    }

    mapping(int256 => TimeLine) trans_timeline;
    mapping(int256 => TransplantDetail) trans_Detail;
    mapping(int256 => DriverDetails) driver_details;

    function TransDetails(
        int256 donor_id,
        int256 reciever_id,
        address donor_hosp,
        address reciever_hosp,
        int256 transplant_id
    ) public returns (bool) {
        TransplantDetail memory transplant = TransplantDetail(
            donor_id,
            reciever_id,
            donor_hosp,
            reciever_hosp,
            1,
            false
        );
        trans_Detail[transplant_id] = transplant;

        uint256 organ_match = block.timestamp;

        TimeLine memory timeline = TimeLine(
            organ_match,
            block.timestamp,
            block.timestamp,
            block.timestamp,
            block.timestamp
        );

        trans_timeline[transplant_id] = timeline;

        return true;
    }

    function start_transport(
        int transplant_id,
        int contact,
        string memory name,
        string memory plate_num
    ) public returns (bool) {
        trans_timeline[transplant_id].start_trans = block.timestamp;

        DriverDetails memory driver = DriverDetails(name, plate_num, contact);

        trans_Detail[transplant_id].stage = 2;

        driver_details[transplant_id] = driver;

        return true;
    }

    function end_transport(int transplant_id) public returns (bool) {
        require(
            trans_Detail[transplant_id].stage == 2,
            "Sorry complete the previous step first"
        );
        trans_timeline[transplant_id].end_trans = block.timestamp;
        trans_Detail[transplant_id].stage = 3;
        return true;
    }

    function start_surgery(int transplant_id) public returns (bool) {
        require(
            trans_Detail[transplant_id].stage == 3,
            "Sorry complete the previous step first"
        );
        trans_timeline[transplant_id].start_sur = block.timestamp;
        trans_Detail[transplant_id].stage = 4;
        return true;
    }

    function end_surgery(int transplant_id) public returns (bool) {
        require(
            trans_Detail[transplant_id].stage == 4,
            "Sorry complete the previous step first"
        );
        trans_timeline[transplant_id].end_sur = block.timestamp;
        trans_Detail[transplant_id].stage = 5;
        trans_Detail[transplant_id].success = true;
        return true;
    }

    // *******************************************************************************************************//

    // *************************************Transfering and Approval Of NFT***********************************//

    function approveTransfer(address to, uint256 tokenId) public {
        // Ensure that the caller is the owner of the token
        require(
            ownerOf(tokenId) == msg.sender,
            "You are not the owner of this token"
        );

        // Approve the transfer
        approve(to, tokenId);
    }

    // Transfer NFT from one address to another
    function transferNFT(address from, address to, uint256 tokenId) public {
        // Ensure that the caller is approved to transfer the token

        // Transfer the token
        safeTransferFrom(from, to, tokenId);
    }

    function interactWithContractB(
        address contractAAddress,
        uint256 id
    ) public returns (register.RegDonor memory) {
        // Create an instance of ContractA
        register contractA = register(contractAAddress);

        // Call ContractA's function to set the value
        return contractA.getRegDonor(id);
    }
}
