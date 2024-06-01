//SPDX-License-Identifier: MIT
pragma solidity ~0.8.17;

import "packages/ens-contracts/contracts/INameWrapper.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import { useAccount } from "wagmi";
import { useState } from "react";


contract Subdomains {
    setSubnodeOwner(
        useAccount, // The namehash of the parent node, e.g. "myname.eth"
        useState, // The label of the subname to create
        useAccount, // The address you want to be the owner of the new subname
        68877, // The fuse bits OR'd togethe,r that you want to burn
        1717427392 // The expiry for the subname (Monday, June 3, 2024 in this case)
    )
}
