const getImage = (nftData, id) => {
  if (!nftData) return <p>Loading...</p>;
  const nft = nftData.find(nft => nft.id === id);
  if (!nft) return <p>NFT not found</p>;
  if (id === 'meebits') {
    return <img src="https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png"/>;
  }
  if (id === 'bored-ape-kennel-club') {
    return <img src="https://pbs.twimg.com/media/E4MhjFbWEAMjnSf?format=jpg&name=4096x4096"/>;
  }
  if (id === 'bored-ape-yacht-club') {
    return <img src="https://ik.imagekit.io/bayc/assets/bayc-footer.png"/>;
  }
  if (id === 'mutant-ape-yacht-club') {
    return <img src="https://nftnow.com/wp-content/uploads/2022/08/Mutant-Ape-Yacht-Club.png"/>;
  }
  if (id === 'cryptopunks') {
    return <img src="https://openseauserdata.com/files/32d1ae241c4c8fed8f37911dcc5483c7.png"/>;
  }
  if (id === 'sandbox') {
    return <img src="https://cryptologos.cc/logos/the-sandbox-sand-logo.png"/>;
  }
  if (id === 'decentraland') {
    return <img src="https://cryptologos.cc/logos/decentraland-mana-logo.png"/>;
  }
  if (id === 'otherdeed-for-otherside') {
    return <img src="https://res.cloudinary.com/nifty-gateway/image/upload/v1651404069/1RD/Otherdeed_for_Otherside_qolf5a.jpg"/>;
  }
  if (id === 'moonbirds') {
    return <img src="https://www.moonbirds.xyz/hero/moonbird-official-pfp.png"/>;
  }
  if (id === 'doodles-official') {
    return <img src="https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png"/>;
  }
  if (!nft.image) return <p>Image not available</p>;
  return <img src={nft.image.small} alt="nft" />;
};