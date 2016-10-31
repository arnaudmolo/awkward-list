// function Events(e){var t={},n,r,i,s=Array;e=e||this;e.on=function(e,n,r){t[e]||(t[e]=[]);t[e].push({f:n,c:r})};e.off=function(e,i){r=t[e]||[];n=r.length=i?r.length:0;while(~--n<0)i==r[n].f&&r.splice(n,1)};e.emit=function(){i=s.apply([],arguments);r=t[i.shift()]||[];i=i[0]instanceof s&&i[0]||i;n=r.length;while(~--n<0)r[n].f.apply(r[n].c,i)}}
const ControlsHandler = {
  audioParams: {
    volSens: 1,
    beatHoldTime: 40,
    beatDecayRate: 0.97
  }
}
var AudioHandler = function () {
  // const events = new Events()
  var waveData = [] // waveform - from 0 - 1 . no sound is 0.5. Array [binCount]
  var levelsData = [] // levels of each frequecy - from 0 - 1 . no sound is 0. Array [levelsCount]
  var level = 0 // averaged normalized level from 0 - 1
  var levelHistory = [] // last 256 ave norm levels

  var BEAT_MIN = 0.15 // a volume less than this is no beat

  // BPM STUFF

  var beatCutOff = 0
  var beatTime = 0

  var freqByteData // bars - bar data is from 0 - 256 in 512 bins. no sound is 0;
  var timeByteData // waveform - waveform data is from 0-256 for 512 bins. no sound is 128.
  var levelsCount = 16 // should be factor of 512

  var binCount // 512
  var levelBins

  var isPlayingAudio = false

  var source
  var audioContext
  var analyser
  let onBeat = () => ({})

  function init (ac, onbeat) {
    // EVENT HANDLERS
    // events.on('update', update)
    audioContext = ac
    onBeat = onbeat
    analyser = audioContext.createAnalyser()
    analyser.smoothingTimeConstant = 0.8 // 0 <-> 1. 0 is no time smoothing
    analyser.fftSize = 1024
    analyser.connect(audioContext.destination)
    binCount = analyser.frequencyBinCount // = 512

    levelBins = Math.floor(binCount / levelsCount) // number of bins in each level

    freqByteData = new Uint8Array(binCount)
    timeByteData = new Uint8Array(binCount)

    var length = 256
    for (var i = 0; i < length; i++) {
      levelHistory.push(0)
    }
  }

  function onTogglePlay () {
  }

  function stopSound () {
    isPlayingAudio = false
    if (source) {
      source.stop(0)
      source.disconnect()
    }
  }

  function onUseMic (mic) {
    getMicInput(mic)
  }

  function getMicInput (microphone) {
    stopSound()
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: true
      }, function (stream) {
        // reinit here or get an echo on the mic
        source = audioContext.createBufferSource()
        analyser = audioContext.createAnalyser()
        analyser.fftSize = 1024
        analyser.smoothingTimeConstant = 0.3
        microphone.connect(analyser)
        isPlayingAudio = true
        update()
      },
      function (err) {
        window.alert('The following error occured: ' + err)
      })
    } else {
      window.alert('Could not getUserMedia')
    }
  }

  // called every frame
  // update published viz data
  function update () {
    if (!isPlayingAudio) return

    // GET DATA
    analyser.getByteFrequencyData(freqByteData) // <-- bar chart
    analyser.getByteTimeDomainData(timeByteData) // <-- waveform

    // normalize waveform data
    for (let i = 0; i < binCount; i++) {
      waveData[i] = ((timeByteData[i] - 128) / 128) * ControlsHandler.audioParams.volSens
    }
    // TODO - cap levels at 1 and -1 ?

    // normalize levelsData from freqByteData
    for (let i = 0; i < levelsCount; i++) {
      let sum = 0
      for (let j = 0; j < levelBins; j++) {
        sum += freqByteData[(i * levelBins) + j]
      }
      levelsData[i] = sum / levelBins / 256 * ControlsHandler.audioParams.volSens // freqData maxs at 256

      // adjust for the fact that lower levels are percieved more quietly
      // make lower levels smaller
      // levelsData[i] *=  1 + (i/levelsCount)/2;
    }
    // TODO - cap levels at 1?

    // GET AVG LEVEL
    let sum = 0
    for (let j = 0; j < levelsCount; j++) {
      sum += levelsData[j]
    }

    level = sum / levelsCount

    levelHistory.push(level)
    levelHistory.shift(1)
    // BEAT DETECTION
    if (level > beatCutOff && level > BEAT_MIN) {
      onBeat()
      beatCutOff = level * 1.1
      beatTime = 0
    } else {
      if (beatTime <= ControlsHandler.audioParams.beatHoldTime) {
        beatTime++
      } else {
        beatCutOff *= ControlsHandler.audioParams.beatDecayRate
        beatCutOff = Math.max(beatCutOff, BEAT_MIN)
      }
    }
    debugDraw()
  }

  function debugDraw () {
  }

  return {
    onUseMic: onUseMic,
    update: update,
    init: init,
    level: level,
    levelsData: levelsData,
    onTogglePlay: onTogglePlay
  }
}

export default AudioHandler
