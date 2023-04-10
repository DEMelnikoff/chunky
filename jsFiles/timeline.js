/*
// Get ID from URL
PROLIFIC_PID = jsPsych.data.getURLVariable('subject')

// if no PROLIFIC_PID in URL, define as 9999 (so data will write)
if (typeof PROLIFIC_PID !== 'undefined') {
} else {
  PROLIFIC_PID = 9999 //  define 
}
*/

jsPsych.data.addProperties({
    date: new Date(),
    subjectID: Math.floor(Math.random() * 10000),
});


function MakeTimeline(game) {
    this.timeline = [
    game.intro.preMessage,
    game.intro.r1part1, 
    game.intro.r1part2, 
    game.intro.r1part3,
    game.task.round1Intro,
    game.task.round1,
    game.Qs.round1,
    game.intro.r2part1,
    game.intro.r2part2,
    game.intro.r2part3,
    game.task.round2Intro,
    game.task.round2,
    game.Qs.round2,
    game.Qs.demographics
    ]
};

var exp = new MakeTimeline(streakGame);

//jsPsych.init({
//    timeline: exp.timeline,
//    
//});
//

// initiate timeline
jsPsych.init({
   timeline: exp.timeline,
   on_finish: function() {
       firebase.database().ref(firebase.auth().currentUser.uid).set({
           data: jsPsych.data.get().values()
        });
        // document.body.innerHTML = '<p><p><p align="center">Thank you for participating!<p align="center"></p>';
        // setTimeout(function () { location.href = "https://app.prolific.co/submissions/complete?cc=865BE374" }, 5000);
   }
});
