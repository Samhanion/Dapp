const express = require("express");
const app = express();
const Web3 = require("web3");

let PORT = process.env.PORT || 3000;

app.set("view-engine", "ejs");
app.use("/static", express.static("./static/"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/result", async (req, res) => {
  // getting token and wallet addresses
  let tokenAddress = req.query.tokenAddress;
  let walletAddress = req.query.walletAddress1;

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

  const contract = new web3.eth.Contract(minABI, tokenAddress);
  let balance = 0;

  // async function getBalance() {
  let result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659

  let format = web3.utils.fromWei(result, "ether"); // 29803630.997051883414242659
  balance = format;
  console.log(format);
  // }

  // getBalance();
  //   console.log(req);
  res.render("result.ejs", { balance });
});

app.listen(PORT);
