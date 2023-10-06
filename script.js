$(() => {
    let dictionary, word;
    function newQuestion() {
        word = dictionary[Math.floor(Math.random() * dictionary.length)];
        let task = Math.floor(Math.random() * 4);
        $("#display").removeClass();
        $("#field").show().val('');
        if (task == 0) {
            $("#display").text(word[2] + ', ' + word[3]);
        } else if (task == 1) {
            $("#display").text(word[1]);
        } else {
            if (task == 2) {
                $("#display").addClass("handwriting");
            } else {
                $("#display").addClass("print");
                $("#field").hide();
            }
            $("#display").addClass("display").text(word[0].replace(/[\u0591-\u05C7]/g, ''));
        }
    }

    fetch('wordlist.csv').then(res => res.text()).then(data => {
        dictionary = data.split('\n').slice(1).map(e => e.split(';'));
        newQuestion();
    });

    let shown = false;
    $("#button").click(() => {
        if (shown) {
            $("#answer").hide();
            $("#button").removeClass("next").addClass("show").text("Show Answer");
            newQuestion();
        } else {
            $("#answer").show();
            $(".answord").text(word[0]);
            $("#eng").text(word[2]);
            $("#rus").text(word[3]);
            $("#button").addClass("next").removeClass("show").text("Next");
        }
        shown = !shown;
    });
});