async function getTokenBalance(walletAddress, tokenAddress, label) {
  // setting up web3
  let url = "https://mainnet.infura.io/v3/7c67f0e170ed45c6ace5cf04eef869cd";
  var web3 = new Web3(url);

  // The minimum ABI required to get the ERC20 Token balance
  const minABI = [
    // balanceOf
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];
  //   tokenAddress = "0x0d8775f648430679a709e98d2b0cb6250d2887ef";
  //   walletAddress = "0x1cf56Fd8e1567f8d663e54050d7e44643aF970Ce";

  let token = tokenAddress;
  let wallet = walletAddress;

  const contract = new web3.eth.Contract(minABI, token);
  let balance = 0;

  // async function getBalance() {
  let result = await contract.methods.balanceOf(wallet).call(); // 29803630997051883414242659

  let format = web3.utils.fromWei(result, "ether"); // 29803630.997051883414242659
  balance = format;
  console.log(format);
  label.innerHTML = `Your token balance : ${format}`;
}
