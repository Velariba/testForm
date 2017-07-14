$(document).ready(function() {
    var step = 1;
    console.log(step);
    $(".next").click(function() {

        var inputs = parseDom();

        var count = inputs.length;
        console.log(Array.isArray(inputs));
        console.log(count);
        $("#demo").html("vaba");
        //inputs.forEach(validate);

        if (step == 2) {
            $(".step").addClass("hidden");
            $(".third").removeClass("hidden").addClass("active");
            $(".next").text("confirm and send")
            console.log('next clicked 2');
            step = 3;
        }
        if (step == 1) {
            $(".prev").removeClass("hidden");
            $(".step").addClass("hidden");
            $(".second").removeClass("hidden").addClass("active");
            console.log('next clicked 1');
            step = 2;
        }
        /*if (step == 3) {
        console.log(qwe);
        }*/
        //step++;
    });
    $(".prev").click(function() {
        if (step == 2) {
            $(".prev").addClass("hidden");
            $(".step").addClass("hidden");
            $(".first").removeClass("hidden").addClass("active");
            console.log('prev clicked 2');
        }
        if (step == 3) {
            $(".step").addClass("hidden");
            $(".second").removeClass("hidden").addClass("active");
            $(".next").text("Next")
            console.log('prev clicked 3');
        }
        /*if (step == 3) {
        console.log(qwe);
        }*/
        step--;
    });

    /*function handleStep(isForward) {
        return $(".step").removeClass("hidden");
    }*/

    function parseDom() {
        var inputses = $("li").children("input");
        //console.log('');
        //var inputses = $(".dscr").parent().children();
        /*var txt = "";
        var i;
        for (i = 0; i < inputses.length; i++) {
            txt = txt + inputses[i].tagName + "<br>";
        }
        $("#demo").html(txt);//it works
        inputses.css({
        	"border": "green solid 5px"
        });*/
    }
    	demoP = $("#demo");

    function validate(el, index) {
        var classes = el.className();
        console.log(classes);
        //demoP.html(demoP.html() + "index[" + index + "]:" + classes + "<br>");

        //if (classes === "js-validate-number") return validateNumber(el);
        //return true;
    }

    function validateNumber(el) {
        return /\d/g.test(el);
    }

    function showError(el) {
        el.find("input").addClass("error");
        el.find(".error-message").show();
    }
});
