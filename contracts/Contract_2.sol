// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

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

    function brain_Dead(uint256 donor_id) public returns (bool) {
        brainDead.push(donor_id);
        return true;
    }

    function getbrainDead() public view returns (uint256[] memory) {
        return brainDead;
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
}
