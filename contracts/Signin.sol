// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract enterDetails {
    struct Memo {
        string name;
        uint hospital_id;
        int longitude;
        int latitude;
        uint timestamp;
        bool flag;
    }
    mapping(address => Memo) map;
    Memo[] memos;
    
    function registerHospital(string memory name, uint hospital_id, int longitude, int latitude, address metamask_address) public payable {
        Memo memory newMemo = Memo(name, hospital_id, longitude, latitude, block.timestamp, true);
        map[metamask_address] = newMemo;
        memos.push(newMemo);
    }
    
    function getMemos() public view returns(Memo[] memory) {
        return memos;
    }
    
    function check(address id) public view returns (bool) {
        return map[id].flag;
    }
}
