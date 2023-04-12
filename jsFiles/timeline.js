/*
// Get ID from URL
PROLIFIC_PID = jsPsych.data.getURLVariable('subject')

// if no PROLIFIC_PID in URL, define as 9999 (so data will write)
if (typeof PROLIFIC_PID !== 'undefined') {
} else {
  PROLIFIC_PID = 9999 //  define 
}
*/


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

        let totalJackpots = jsPsych.data.get().select('totalJackpots').values;
        let val = jsPsych.data.get().select('val').values;
        let basePay = jsPsych.data.get().select('basePay').values;
        console.log(totalJackpots, val, basePay);

        let bonusDollars = Math.ceil( (totalJackpots[0] * val[0]) / 100 );
        let totalDollars = bonusDollars + 10
        let text = `<div class="jspsych-content-wrapper">
                        <div class="jspsych-content">
                            <p>Thank you for participating!</p>
                            <p>In total, you won <b>$${bonusDollars}</b> in bonus money in addition to <b>$${basePay[0]}</b> for your participation!
                            <br>To receive your earnings, please give the following code to the administrator: <b>DM${totalDollars*2}</b>.</p>
                        </div>
                    </div>`;

        document.body.innerHTML = text;
    }
});
