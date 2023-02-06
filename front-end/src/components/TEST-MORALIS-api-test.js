// import Moralis  from 'moralis';
// import { EvmChain } from '@moralisweb3/common-evm-utils';

// export default async function GetNFTLowestPrice(address) {
//     try {
//         const chain = EvmChain.ETHEREUM;
//         await Moralis.start({
//             apiKey: 'Y2ZqEhj0SCdpDaTC8IMzM9BtRzxnF2d13iIQ2iF6RKbQ8WbzlVk95CctzBbLnMVt',
//             // ...and any other configuration
//         });

//         const response = await Moralis.EvmApi.nft.getNFTLowestPrice({
//             address,
//             chain,
//         });

//         console.log(response?.result);
//     } catch (e) {
//         console.error(e);
//     }
// }


import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import React, { useState, useEffect } from 'react';

export default function GetNFTLowestPrice() {
    const [response, setResponse] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const chain = EvmChain.ETHEREUM;
                const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
                if (!Moralis.started) {
                    await Moralis.start({
                        apiKey: 'Y2ZqEhj0SCdpDaTC8IMzM9BtRzxnF2d13iIQ2iF6RKbQ8WbzlVk95CctzBbLnMVt',
                        // ...and any other configuration
                    });
                }

                const result = await Moralis.EvmApi.nft.getNFTLowestPrice({
                    address,
                    chain,
                });

                setResponse(result?.result);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            {response ? <div>{response}</div> : <div>Loading...</div>}
        </div>
    );
}