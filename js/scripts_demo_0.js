$(document).ready(function() {
    var step = 1;
    var curDate = new Date();
    var unnDate = new Date(1900,0,1); //25567 days till Date(0)
    console.log(unnDate);

    $("input").blur(inpBlur);

    function inpBlur () {
    	alert("input very blured");
    	console.log("input blured");
    }
 //When nNEXT button is clicked
    $(".next").click(function() {

        var inputs = parseDom();
        

        //console.log(inputs);
        //validate(0, inputs[0]);
        inputs.each(validate);
        /*for (var i = 0; i < inputs.length; i++) {
        	validate(inputs[i]);
        }*/
        /*var count = inputs.length;
        console.log(Array.isArray(inputs));
        console.log(count);
        $("#demo").html("vaba");*/
        //inputs.forEach(validate);
        preSubmit(inputs);

        if (step == 2) {
            if (giveNumb(inputs) == false) {
                alert("you must be at least 21");
            } if (inputs[2].value == "" || inputs[3].value == "" || inputs[4].value == "" || inputs[5].value == "") {
                inputs[2].className = "error";
                inputs[3].className = "error";
                inputs[4].className = "error";
                inputs[5].className = "error";
                $(".err_t2").removeClass("hidden").addClass("error");
            } else {
                inputs.removeClass("error");
                $(".err_t2").removeClass("error").addClass("hidden");
                $(".step").addClass("hidden");
                $(".third").removeClass("hidden").addClass("active");
                $(".next").addClass("hidden");
                $(".submit").removeClass("hidden");
                console.log('next clicked 2');
                step = 3;
            }
        }

        if (step == 1 /* && inputs.each(validate) == true*/ ) {
            if (inputs[0].value == "" || inputs[1].value == "") {
                inputs[0].className = "error";
                inputs[1].className = "error";
                $(".err_t").removeClass("hidden");
                return false;
            } else {
                inputs.removeClass("error");
                $(".err_t").removeClass("error").addClass("hidden");
                $(".prev").removeClass("hidden");
                $(".step").addClass("hidden");
                $(".second").removeClass("hidden").addClass("active");
                console.log('next clicked 1');
                step = 2;
            }

        }
        if (inputs.each(validate) == false) showError;
        /*if (step == 3) {
        console.log(qwe);
        }*/
        //step++;
    });
 // when PREVIOUS button is clicked
    $(".prev").click(function() {
        if (step == 2) {
            //inputs.removeClass("error");
            $(".err_t2").removeClass("error").addClass("hidden");
            $(".prev").addClass("hidden");
            $(".step").addClass("hidden");
            $(".first").removeClass("hidden").addClass("active");
            console.log('prev clicked 2');
        }
        if (step == 3) {
            $(".step").addClass("hidden");
            $(".second").removeClass("hidden").addClass("active");
            $(".next").removeClass("hidden").addClass("active");
            $(".submit").addClass("hidden");
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

    function preSubmit(el) {
        $("#summ").html(el[0].value);
        $("#peri").html(el[1].value);
        $("#unn").html(el[2].value);
        $("#last_name").html(el[3].value);
        $("#name").html(el[4].value);
        $("#city").html(el[5].value);
        /*var fnl = $(".third p");
        for (var i = 0; i < fnl.length; i++) {
        	fnl[i].html(el[i].value);
        }*/
    }

    function parseDom() {
        var inputses = $("li").children("input");
        //console.log(inputses);
        return inputses;
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
    //demoP = $("#demo");

    function validate(i, el) {
        var classes = el.className;
        //console.log(classes, i);
        //demoP.html(demoP.html() + "index[" + index + "]:" + classes + "<br>");
        if (classes === "js-validate-number") return validateNumber(el);
        return true;
    }

    function validateNumber(el) {
        return /\d/g.test(el);
    }

    function giveNumb(el) {
        var brthDateD = new Date(Number(unnDate) + parseInt(el[2].value.slice(0, 5)) * 24 * 3600 * 1000);
        /*document.getElementById("demo").innerHTML = brthDateD.toUTCString();
        document.getElementById("demo2").innerHTML = curDate.getFullYear() -21;*/
        if (brthDateD.getFullYear() > curDate.getFullYear() - 21) {
            return false;
            /*document.getElementById("err").innerHTML = "error";
            alert("you need to be older then 21");*/
        } else {
            return true;
            /*document.getElementById("err").innerHTML = "you are adult";*/
        }
    }


    function showError(el) {
        el.find("input").addClass("error");
        el.find(".err_t").removeClass("hidden");
    }


});