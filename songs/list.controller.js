(function () {
    'use strict';
    var Web3 = require('web3');
    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['UserService','SongService', '$rootScope','Web3Service'];
    function ListController(UserService,SongService, $rootScope,Web3Service) {
        console.log(Web3);
        var vm = this;

        vm.song = null;
        vm.allSongs = [];
        vm.deleteSong = deleteSong;
        vm.playSong=playSong;
        vm.downloadSong=downloadSong;

        initController();

        function initController() {
           // loadCurrentUser();
            loadAllSongs();
        }

        /*function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }*/

        function loadAllSongs() {
            SongService.GetAll()
                .then(function (songs) {
                    vm.allSongs = songs;
                });
        }

        function deleteSong(id) {
            SongService.Delete(id)
                .then(function () {
                    loadAllSongs();
                });
        }
        function playSong(id) {
            /* Web3Service.Delete(id)
             .then(function () {
             loadAllSongs();
             });*/
        }
        function downloadSong(id) {
             Web3Service.download()
           //  .then(function () {
             loadAllSongs();
            // });
        }
    }

})();
