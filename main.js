function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = m5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log('Model Loaded!');
}

function draw() {
  Image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
}
var previous_result = '';

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    if ((results[0].confidence > 0.5) && (previous_results != results[0].label)) {
      console.log(results);
      previous_results = results[0].label;
      var synth = window.SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("results_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}



