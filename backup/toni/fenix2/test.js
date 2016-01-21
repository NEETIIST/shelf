var request = require("request");



request.get('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person').auth(null, null, true, 'NTcwMDIzNzY0NTcxMDIzOjIyZmNjYTI1YmJmZjk5MGU3ZTExNDc1MzRiYmRjMTQxYmRlYzQzZWU2MDMxZjg0NTY3Mjg2ZjU3YzhkODJjZDNkZjEyNTBlOTljNzZjYTlhZjI0ZWY0MTcyMjIwZjk3NGIzMzE3NTNhZGVhMDFiMzQyMTE1NTI3NTk2Nzc2ODA5');

token="NTcwMDIzNzY0NTcxMDIzOjIyZmNjYTI1YmJmZjk5MGU3ZTExNDc1MzRiYmRjMTQxYmRlYzQzZWU2MDMxZjg0NTY3Mjg2ZjU3YzhkODJjZDNkZjEyNTBlOTljNzZjYTlhZjI0ZWY0MTcyMjIwZjk3NGIzMzE3NTNhZGVhMDFiMzQyMTE1NTI3NTk2Nzc2ODA5";


request('https://fenix.tecnico.ulisboa.pt/api/fenix/v1/person?access_token='+token,
  	function (error, response, body) {
    	if (error) {
      		return console.error(error);
    	}
    	console.log(JSON.parse(body));
  	}
);