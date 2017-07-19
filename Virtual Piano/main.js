function toggleSong()
    //Re-factor click and keyboard events
    {
        var song = document.querySelector('audio');
        if (song.paused == true) {
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
        } 
        else {
            $('.play-icon'  ).removeClass('fa-pause').addClass('fa-play');
            song.pause();
        }
    };

    function fancyTimeFormat(time)
        {   
            //change sec into hrs,mins,secs
            var hrs = ~~(time / 3600);
            var mins = ~~((time % 3600) / 60);
            var secs = time % 60;
            //output wll be in hh:mm:ss format
            var ret = "";
            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }

            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        }

    function updateCurrTime()
    //update the song duration time
    {
        var song=document.querySelector('audio');
        var currTime=Math.floor(song.currentTime);
        var dur=Math.floor(song.duration);
        var widths;
        widths=currTime/dur*100;
        $('.progress-filled').css("width", widths+'%');
        currTime=fancyTimeFormat(currTime);
        dur=fancyTimeFormat(dur);
        $('.progress-wrapper .time-elapsed').text(currTime);
        $('.progress-wrapper .song-duration').text(dur);

        
    }

    function addSongNameClickEvent(songObj, number)
    {
    //to play/pause any song when we click on its name    
            $('#song'+number).click(function(){
            var audio=document.querySelector('audio');
            
            if(audio.src.search(songObj.fileName)>=0){
                toggleSong();
            }
            else{
                audio.src=songObj.fileName;
                toggleSong();
                currentSongDetails(songObj);
            }
        });
    }

    var currentSong= 1;
    var willLoop= 0;
    var willShuffle= 0;

    
    

    $('#songList1').on('click',function(){
        currentPlayList=playList_name[0];
        dataRender();
      
    })

    $('#songList2').on('click',function(){
        currentPlayList=playList_name[1];
        dataRender();

    })
    //song list
    var songs=[{
        'name': 'Jiyein Kyun',
        'artist': 'Papon',
        'album': 'Dum maro Dum',
        'duration': '4:27',
        'fileName': 'songs/papon1.mp3',
        'albumArt': 'img/Jiyein Kyun.jpg',
        'songNumber': 1
    },
    {
        'name': 'Kaun Mera',
        'artist': 'Papon',
        'album': 'Special 26',
        'duration': '5:26',
        'fileName': 'songs/Kaun Mera.mp3',
        'albumArt': 'img/kaun mera.jpg',
        'songNumber': 2
    },
    {
        'name': 'Kyon',
        'artist': 'Papon',
        'album': 'Barfi',
        'duration': '4:26',
        'fileName': 'songs/kyon.mp3',
        'albumArt': 'img/papon.jpg',
        'songNumber': 3
    },
    {
        'name': 'Moh Moh Ke Dhaage',
        'artist': 'Papon',
        'album': 'Dum Laga Ke Haisha',
        'duration': '5:22',
        'fileName': 'songs/moh.mp3',
        'albumArt': 'img/papon.jpg',
        'songNumber': 4
    }]

    //home party song List
    var party_list=[
    {
        //adding details about the songs
        'name': '1 Despacito',
        'artist': 'Luis Fonsi',
        'album': 'Despacito & Mis Grandes Éxitos',
        'duration': '4:41',
        'fileName': 'songs/despacito.mp3',
        'albumArt': 'img/despacito.JPEG',
        'songNumber': 1
    },
    {
        'name': '2 Cheap Thrills',
        'artist': 'Sia Ft. Sean Paul',
        'album': 'Cheap Thrills',
        'duration': '3:45',
        'fileName': 'songs/cheap_thrills.mp3',
        'albumArt': 'img/cheap_thrills.JPG',
        'songNumber': 2
    },
    {
        'name': '3 Shape of you',
        'artist': 'Ed sheeran',
        'album': 'divide',
        'duration': '3:53',
        'fileName': 'songs/Shape Of You.mp3',
        'albumArt': 'img/shape of you.JPG',
        'songNumber': 3
    },
    {
        'name': '4 Faded',
        'artist': 'Alan Walker',
        'album': 'Faded',
        'duration': '3:32',
        'fileName': 'songs/Faded.mp3',
        'albumArt': 'img/faded.JPG',
        'songNumber': 4
    }
]
var playList_name=[songs,party_list]
var currentPlayList=playList_name[0];

function dataRender(){  
        for(var j=0; j<4; j++){
        currentSongDetails(playList_name[j][0]);
        if(currentPlayList==playList_name[j]) {
            var audio=document.querySelector('audio');
            audio.src=playList_name[j][0].fileName;
            for(var i=0; i<playList_name[j].length; i++){
                var song= $('#song'+(i+1));
                song.find('.song-name').text(playList_name[j][i].name);
                song.find('.song-artist').text(playList_name[j][i].artist);
                song.find('.song-album').text(playList_name[j][i].album);
                song.find('.song-length').text(playList_name[j][i].duration);
                addSongNameClickEvent(playList_name[j][i],i+1);

            }
            break;
        }
        
    }
        ///pagination disable
        $('#songs').DataTable({
        destroy: true,    
        paging:false  
        });
    }
    function currentSongDetails(songObj){ 
        //to change the attributes of current song
        $('.current-song-image').attr('src', songObj.albumArt); 
        $('.current-song-name').text(songObj.name);
        $('.current-song-album').text(songObj.album)
        currentSong=songObj.songNumber;
    }

    function timeJump(){
        var song= document.querySelector('audio');
        song.currentTime= song.duration - 2;
    }

    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
    }
      
    function changeSong(){
        
        for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                var song=document.querySelector('audio');
                song.src=playList_name[j][currentSong].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong]);            

        }
        
    }
        
    }

    function song_list(){
        for(var i=0; i<4;i++){
            var song_id=$('<tr class="song" id="song'+(i+1)+'">'
                    +'<td class="song-name"></td>'
                    +'<td class="song-artist"></td>'
                    +'<td class="song-album"></td>'
                    +'<td class="song-length"></td>'
                    +'</tr>')

            $('.song-list').append(song_id);
    }
    }

    
window.onload= function(){ 
        song_list();
    
      //it shows the first song details
        dataRender();

        setInterval(function(){
            updateCurrTime();
        },1000);

        //search and sort plugin
        
 
}
    //wplaylist will be hidden till get the user name
    $('.welcome-screen button').on('click', function() {
        var name = $('#name-input').val();
        if (name.length > 3) {
            var message = "Welcome, " + name;
            $('.main .user-name').text(message);
            $('.welcome-screen').addClass('hidden');
            $('.main').removeClass('hidden');
            $('#playList').removeClass('hidden');
        } else {
            $('#name-input').addClass('error');
            $('.input-wrapper').find('p').text('Enter more than 3 characters');
        }
    });
    $('.play-icon').on('click', function() {
        toggleSong()    
        });

    $('body').on('keypress', function(event) {
      //functioning of spacebar
                if (event.keyCode == 32 && event.target.tagName!="INPUT") {
                    toggleSong() 
                    }
                
            });

    $('.fa-repeat').on('click', function(){
        //select selector which is already selected
        $(this).toggleClass('disabled');    
        willLoop= 1 - willLoop;
    })

    $('.fa-random').on('click', function(){
        $(this).toggleClass('disabled');
        willShuffle= 1 -willShuffle;
    })

    //after song ends it check for shuffle on, loop on, loop off
    $('audio').on('ended', function(){
        var song=document.querySelector('audio');
        for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                                          
                if(willShuffle==1){
            currentSong= randomExcluded(1, playList_name[j].length, currentSong);
            song.src=playList_name[j][currentSong-1].fileName;
            toggleSong();
            currentSongDetails(playList_name[j][currentSong-1]);
        }

        else if(willLoop==1){//loop is on
            if(currentSong<playList_name[j].length){//song before the last song
                changeSong();
            }
            else{   // loop is on 
                song.src=playList_name[j][0].fileName; //use the source of first song
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
            }
        }

        else{   //loop is off
            if(currentSong<playList_name[j].length){//song before the last song
                changeSong();
            }
            else{       //showws the play icon & stop the song
                $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                song.currentTime=0;
            }
        }
            
        }
        
    }
        
    })
   
//previous song using mouse
$('.fa-step-forward').on('click', function(){
    var song = document.querySelector('audio');
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                                          
                if(willShuffle==1){
                currentSong= randomExcluded(1, playList_name[j].length, currentSong);
                song.src=playList_name[j][currentSong-1].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong-1]);

            }

            else{
                if(currentSong<playList_name[j].length){//song before the last song
                    changeSong();
                }
                else{   
                song.src=playList_name[j][0].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
                }  
    }
            
            
        }
        
    }
    
    

})

//next song using 'n' on keyboard
$('body').on('keypress', function(event){
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
            if(event.key == "n" && event.target.tagName!=="INPUT"){
                 var song = document.querySelector('audio');
            if(willShuffle==1){
                currentSong= randomExcluded(1, playList_name[j].length, currentSong);
                song.src=playList_name[j][currentSong-1].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][currentSong-1]);
            }

            else{
                if(currentSong<playList_name[j].length){  
                    changeSong();
                }
                else{   
                song.src=playList_name[j][0].fileName;
                toggleSong();
                currentSongDetails(playList_name[j][0]); 
                }  
            }
            }
            
        }
        
    }
    
})

//prev song using mouse
$('.fa-step-backward').on('click', function(){
    var song = document.querySelector('audio');
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                              
                 if(currentSong==1){
                    
                    currentSong= playList_name[j].length - 1;  
                    changeSong();

                }
                else{
                    currentSong -= 2;  
                    changeSong();
    }
            
        }
        
    }
   

})

//prev song using 'p' on keyboard
$('body').on('keypress', function(event){
    for(var j=0; j<4; j++){
        if(currentPlayList==playList_name[j]) {
                              
                 if(event.key == "p" && event.target.tagName!=="INPUT"){
                var song = document.querySelector('audio');
                if(currentSong==1){ 
                    
                    currentSong= playList_name[j].length - 1;  
                    changeSong();
                }
                else{
                    currentSong -= 2;  
                    changeSong();
                }
    }
            
        }
        
    }
   
})




