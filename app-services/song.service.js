/**
 * Created by 5013003440 on 5/18/2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('SongService', SongService);

    SongService.$inject = ['$timeout', '$filter', '$q'];
    function SongService($timeout, $filter, $q) {
        var db = new loki('loki.json');
        //console.log(Web3);
        var songsCollection = db.addCollection('songs');
        var service = {};
        function initSongs(){
            var songs=[
            {
                "id": 1,
                "name": "Song 1",
                "imgPath":"/app-images/1.jpg"
            },
            {
                "id": 2,
                "name": "Song 2",
                "imgPath":"/app-images/2.jpg"
            },
            {
                "id": 3,
                "name": "Song 3",
                "imgPath":"/app-images/3.jpg"
            },
            {
                "id": 4,
                "name": "Song 4",
                "imgPath":"/app-images/4.jpg"
            },
            {
                "id": 5,
                "name": "Song 5",
                "imgPath":"/app-images/5.jpg"
            },
            {
                "id": 6,
                "name": "Song 6",
                "imgPath":"/app-images/6.jpg"
            },
            {
                "id": 7,
                "name": "Song 7",
                "imgPath":"/app-images/1.jpg"
            },
            {
                "id": 8,
                "name": "Song 8",
                "imgPath":"/app-images/2.jpg"
            },
            {
                "id": 9,
                "name": "Song 9",
                "imgPath":"/app-images/3.jpg"
            }
        ];
            songsCollection.insert(songs);
            return songsCollection.find();
        }

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetBySongName = GetBySongName;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            deferred.resolve(getSongs());
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getSongs(), { id: id });
            var song = filtered.length ? filtered[0] : null;
            deferred.resolve(song);
            return deferred.promise;
        }

        function GetBySongName(songname) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getSongs(), { name: songname });
            var song = filtered.length ? filtered[0] : null;
            deferred.resolve(song);
            return deferred.promise;
        }

        function Create(song) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetBySongName(song.name)
                    .then(function (duplicateSong) {
                        if (duplicateSong !== null) {
                            deferred.resolve({ success: false, message: 'Song "' + song.name + '" is already added' });
                        } else {
                            var songs = getSongs();

                            // assign id
                            var song = songs[songs.length - 1] || { id: 0 };
                            song.id = song.id + 1;

                            // save to local storage
                            songs.push(song);
                            setSongs(songs);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(song) {
            var deferred = $q.defer();

            var songs = getSongs();
            for (var i = 0; i < songs.length; i++) {
                if (songs[i].id === song.id) {
                    songs[i] = song;
                    break;
                }
            }
            setSongs(songs);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var songs = getSongs();
            for (var i = 0; i < songs.length; i++) {
                var song = songs[i];
                if (song.id === id) {
                    //songs.splice(i, 1);
                    songsCollection.remove(song);
                    break;
                }
            }
            //setSongs(songs);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getSongs() {
            if(!songsCollection.find().length>0){
                //localStorage.users = JSON.stringify([]);
                initSongs()
            }
            return songsCollection.find();
        }

        function setSongs(songs) {
            //localStorage.users = JSON.stringify(users);
           /* if(songsCollection.find().length>0){
                //localStorage.users = JSON.stringify([]);
                songsCollection.remove();
            }*/
            songsCollection.insert(songs);
        }
    }
})();