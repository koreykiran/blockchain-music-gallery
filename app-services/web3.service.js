(function () {
    'use strict';
    var Web3 = require('web3');
    angular
        .module('app')
        .factory('Web3Service', Web3Service);

    Web3Service.$inject = ['$http','FlashService'];
    function Web3Service($http,FlashService) {
        var service = {};
       var contractAddress ="0xf9c41199c9ae92676a84ef1ad972a14b773b7b63";
        var ABIArray=[
            {
                "constant": true,
                "inputs": [

                ],
                "name": "name",
                "outputs": [
                    {
                        "name": "",
                        "type": "string"
                    }
                ],
                "payable": false,
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_newName",
                        "type": "string"
                    }
                ],
                "name": "changeName",
                "outputs": [

                ],
                "payable": false,
                "type": "function"
            }
        ];
        var data ="6060604052604060405190810160405280600681526020017f53686c6f6d6900000000000000000000000000000000000000000000000000008152506000908051906020019061005092919061005e565b50341561005957fe5b610103565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061009f57805160ff19168380011785556100cd565b828001600101855582156100cd579182015b828111156100cc5782518255916020019190600101906100b1565b5b5090506100da91906100de565b5090565b61010091905b808211156100fc5760008160009055506001016100e4565b5090565b90565b6102c3806101126000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100465780635353a2d8146100df575bfe5b341561004e57fe5b610056610139565b60405180806020018281038252838181518152602001915080519060200190808383600083146100a5575b8051825260208311156100a557602082019150602081019050602083039250610081565b505050905090810190601f1680156100d15780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100e757fe5b610137600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506101d7565b005b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101cf5780601f106101a4576101008083540402835291602001916101cf565b820191906000526020600020905b8154815290600101906020018083116101b257829003601f168201915b505050505081565b80600090805190602001906101ed9291906101f2565b505b50565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061023357805160ff1916838001178555610261565b82800160010185558215610261579182015b82811115610260578251825591602001919060010190610245565b5b50905061026e9190610272565b5090565b61029491905b80821115610290576000816000905550600101610278565b5090565b905600a165627a7a723058209d59e04918b4d0efaafbf1331195d0f20c92df010b6c63202e72bde836d34c670029";

        service.download=download;
        return service;
        function download(){
           var myContract=web3.eth.contract(ABIArray).at(contractAddress);
            myContract.changeName('kiran',{from:"0x13986B85CD8150b7cAa079ac86A47cA3ae8d44f1"},function(err,res){
                myContract.name(function(err,res){
                        if (res) {
                            FlashService.Success('Download successful', true);
                           return handleSuccess(res);
                        } else {
                            FlashService.Error(response.message);
                           return handleError(err);
                        }
                });
            });
        }
        /*service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
*/
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
