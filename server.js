const request = require("request");
const target = "0xEcA19B1a87442b0c25801B809bf567A6ca87B1da";
var result = [];

getTransaction(target)
function getTransaction(target) {
  request(
    `https://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=${target}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`,
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      let data = body.result;
      for (let i = 0; i < data.length; i++) {
        let history = {
          tx_hash: data[i].hash,
          addr_from: data[i].from,
          addr_to: data[i].to,
          amount_transfer: data[i].value / 10 ** 18,
        };
        if (
          data[i].from == target.toLowerCase() &&
          data[i].tokenSymbol === "BKTC"
        ) {
          result.push(history);
        }
      }
      console.log(
        "=============================================txHistory============================"
      );
      console.log(result);
      console.log(
        "=============================================txHistory============================"
      );
    }
  );
}
