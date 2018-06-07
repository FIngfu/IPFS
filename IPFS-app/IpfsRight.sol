pragma solidity ^0.4.21;

contract IpfsRight {

    mapping (bytes32 => mapping( address => bool )) public hashs;
    mapping (bytes32 => bool) public published;
    mapping (bytes32 => address) public owners;
    mapping (bytes32 => mapping(address => address)) reencryptionKeys;
    
    constructor(
    ) public {
    }

    function addAccesser(bytes32 imageHash, address user, address reencryptionKey) public returns (bool success) {
        require(!isContract(msg.sender));
        require(msg.sender == owners[imageHash]);
        hashs[imageHash][user] = true;
        reencryptionKeys[imageHash][user] = reencryptionKey;
        return true;
    }
    
    function publishImage(bytes32 imageHash) public returns (bool success){
        require(!isContract(msg.sender));
        require(!alreadyPublished(imageHash));
        published[imageHash] = true;
        owners[imageHash] = msg.sender;
        return true;
    }
    
    function isContract(address addr) view public returns (bool){
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }
    
    function alreadyPublished(bytes32 imageHash) view public returns (bool){
        return published[imageHash];
    }
}
