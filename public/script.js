const songLinks = [
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Dance%20Yrself%20Clean.mp3?v=1633374360038',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Drunk%20Girls.mp3?v=1633317846421',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20One%20Touch.mp3?v=1633318109921',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20All%20I%20want.mp3?v=1633374473209',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20I%20Can%20Change.mp3?v=1633374593273',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20You%20Wanted%20A%20Hit.mp3?v=1633318269710',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Pow%20Pow.mp3?v=1633374694749',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Somebodys%20Calling%20Me.mp3?v=1633319397722',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Home.mp3?v=1633319523229',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Throw.mp3?v=1633319968993',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Throw.mp3?v=1633319968993',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2FLCD%20Soundsystem%20%20Oh%20You%20Christmas%20Blue%20%20Greenberg%20OST.mp3?v=1633320040427',
    'https://cdn.glitch.me/06019493-2b52-4cce-be59-521412d0410c%2Fytmp3free.cc_1-second-of-silence-the-beginning-youtubemp3free.org.mp3?v=1633324076418'
  ]
  let currentSong = 0;
  let currentColor = '#dddddd';
  let startingColor = "#ff0000";
  let endingColor = "#00ff00";
  let partyColors = [];
  
  const pane = new Tweakpane.Pane();
  const songSection = document.getElementById("songSection");
  
  const PARAMS = {
    song: 0,
    color: '#dddddd',
    color_a: "#ff0000",
    color_b: "#00ff00"
  };

  const colorSelector = pane.addInput(
    PARAMS, "color"
  )
  
  colorSelector.on('change', (val) => {
    currentColor = val.value
  });
  
  // `options`: list
  pane.addInput(
    PARAMS, 'song',
    {options: {
      Dnce_Yrself_Clean: 0,
      Drunk_Girls: 1,
      One_Touch: 2,
      All_I_Want: 3,
      I_Can_Change: 4,
      You_Wanted_a_Hit: 5,
      Pow_Pow: 6,
      Somebodys_Calling_Me: 7,
      Home: 8,
      Throw: 9,
      Oh_You_Christmas_Blues: 10
    }
    }
  ).on('change', (val) => {
    currentSong = val.value
    
  });
  
  const startbtn = pane.addButton({
    title: 'START',
  });

  startbtn.on('click', () => {
    start()
    console.log("started");
  });
  
  const restartbtn = pane.addButton({
    title: 'RESTART',
  });

  restartbtn.on('click', () => {
    start()
    console.log("restarted");
  });
    
  const stopbtn = pane.addButton({
    title: 'STOP',
  });

  stopbtn.on('click', () => {
    currentSong = 12
    start()
    console.log("stopped");
  });
  /**
  const sColorSelector = pane.addInput(
    PARAMS, "color_a"
  )
  
  sColorSelector.on('change', (val) => {
    startingColor = val.value
  });
  
  const eColorSelector = pane.addInput(
    PARAMS, "color_b"
  )
  
  eColorSelector.on('change', (val) => {
    endingColor = val.value
  });
    
  const partyBtn = pane.addButton({
    title: 'PARTY MODE',
  });

  partyBtn.on('click', () => {
    partyColors = gradient(startingColor, endingColor, 100)
    partyStart()
    console.log("party");
  });
    
  **/
  const start = function() {
    songSection.innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    songSection.appendChild( canvas )
    canvas.width = canvas.height = 512
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    audioElement.crossOrigin = "anonymous";
    console.log(audioElement.crossOrigin)
    songSection.appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024 // 512 bins
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    // make sure, for this example, that your audiofle is accesssible
    // from your server's root directory... here we assume the file is
    // in the ssame location as our index.html file
    audioElement.src = songLinks[currentSong]
    audioElement.play()
    const results = new Uint8Array( analyser.frequencyBinCount )

    const draw = function() {
      // temporal recursion, call tthe function in the future
      window.requestAnimationFrame( draw )
      
      // fill our canvas with a black box
      // by doing this every frame we 'clear' the canvas
      ctx.fillStyle = '#25C0CC' 
      ctx.fillRect( 0,0,canvas.width,canvas.height*2 )
      
      // set the color to white for drawing our visuaization
      ctx.fillStyle = currentColor 
      
      analyser.getByteFrequencyData( results )
      
      for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
        ctx.fillRect( 0, 2*i, results[i], 2) // upside down!
      }
    }
    draw()
  }
  /**
  const partyStart = function() {
    let partyColorIndex = 0;
    songSection.innerHTML = ''
    const canvas = document.createElement( 'canvas' )
    songSection.appendChild( canvas )
    canvas.width = canvas.height = 512
    const ctx = canvas.getContext( '2d' )

    // audio init
    const audioCtx = new AudioContext()
    const audioElement = document.createElement( 'audio' )
    audioElement.crossOrigin = "anonymous";
    songSection.appendChild( audioElement )

    // audio graph setup
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 1024 // 512 bins
    const player = audioCtx.createMediaElementSource( audioElement )
    player.connect( audioCtx.destination )
    player.connect( analyser )

    // make sure, for this example, that your audiofle is accesssible
    // from your server's root directory... here we assume the file is
    // in the ssame location as our index.html file
    audioElement.src = songLinks[currentSong]
    audioElement.play()
    const results = new Uint8Array( analyser.frequencyBinCount )

    const partyDraw = function() {
      // temporal recursion, call tthe function in the future
      window.requestAnimationFrame( draw )
      
      // fill our canvas with a black box
      // by doing this every frame we 'clear' the canvas
      ctx.fillStyle = '#25C0CC' 
      ctx.fillRect( 0,0,canvas.width,canvas.height )
      
      // set the color to white for drawing our visuaization
      partyColorIndex += 1
      if (partyColorIndex >= partyColors.length) {
        partyColorIndex = 0
        partyColors = gradient(endingColor, startingColor, 100)
      }
      //ctx.fillStyle = partyColors[partyColorIndex]
      currentColor = partyColors[partyColorIndex]
      ctx.fillStyle = partyColors[0]
      //console.log(partyColors[partyColorIndex])
      //console.log(ctx.fillStyle)
      console.log(partyColors[0])
      analyser.getByteFrequencyData( results )
      
      for( let i = 0; i < analyser.frequencyBinCount; i++ ) {
        ctx.fillRect( i, 0, 1, results[i]) // upside down!
        //console.log(results[i])
      }
    }
    partyDraw()
  }
  
  function gradient(startColor, endColor, steps) {
       var start = {
               'Hex'   : startColor,
               'R'     : parseInt(startColor.slice(1,3), 16),
               'G'     : parseInt(startColor.slice(3,5), 16),
               'B'     : parseInt(startColor.slice(5,7), 16)
       }
       var end = {
               'Hex'   : endColor,
               'R'     : parseInt(endColor.slice(1,3), 16),
               'G'     : parseInt(endColor.slice(3,5), 16),
               'B'     : parseInt(endColor.slice(5,7), 16)
       }
       var diffR = end['R'] - start['R'];
       var diffG = end['G'] - start['G'];
       var diffB = end['B'] - start['B'];

       var stepsHex  = new Array();
       var stepsR    = new Array();
       var stepsG    = new Array();
       var stepsB    = new Array();

       for(var i = 0; i <= steps; i++) {
               stepsR[i] = start['R'] + ((diffR / steps) * i);
               stepsG[i] = start['G'] + ((diffG / steps) * i);
               stepsB[i] = start['B'] + ((diffB / steps) * i);
               stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
       }
       return stepsHex;

   }
    **/