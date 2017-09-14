$(document).ready(function() {
    var step = 1;
    var curDate = new Date();
    var unnDate = new Date(1900, 0, 1); //25567 days till Date(0)
    console.log(unnDate);
    var inputs = parseDom();

    /* $.getJSON('data-demo.json', function(data) {
         console.log("JSON Data: " + data);
         $.each(data, function(key, val) {
             console.log(key + " value: " + val);
         });
     });*/
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var arra = $.map(myObj, function(value, index) {
                return [value];
            });

            for (var i = 0; i < arra.length; i++) {
                inputs.each(function() {
                    inputs[i].value = arra[i];
                });
            }
        }
    };
    xmlhttp.open("GET", "data-demo.txt", true);
    xmlhttp.send();

    //VALIDATION FUNCTIONS

    $(inputs[0]).blur(function() {
        if (validateNumber(inputs[0].value) == false) {
            inputs[0].className = "error";
            $(inputs[0]).parent().children(".err_t").removeClass("hidden");
        }
        if (validateNumber(inputs[0].value) == true) {
            $(inputs[0]).removeClass("error");
            $(inputs[0]).parent().children(".err_t").addClass("hidden");
        }
    });
    $(inputs[1]).blur(function() {
        if (validateNumber2(inputs[1].value) == false) {
            inputs[1].className = "error";
            $(inputs[1]).parent().children(".err_t").removeClass("hidden");
        }
        if (validateNumber2(inputs[1].value) == true) {
            $(inputs[1]).removeClass("error");
            $(inputs[1]).parent().children(".err_t").addClass("hidden");
        }
    });



    $(inputs[2]).blur(validateUNN).blur(function() {
        console.log(parseInt($(inputs[2]).attr('maxlength')));
        console.log($(inputs[2]).val().length);
        if (inputs[2].value == "") {
            $(inputs[2]).addClass("error").val("0000000000");
            $(inputs[2]).parent().children(".err_t2").addClass("error").removeClass("hidden error_age").html("&#8592 you need to put <br> your 10 char")
        } else {
            $(inputs[2]).removeClass("error");
        }
    });

    $(inputs[3]).blur(function() {
        inputs[3].style.textTransform = 'capitalize';
        if (validateName(inputs[3].value) == false) {
            inputs[3].className = "error";
            $(inputs[3]).parent().children(".err_t2").removeClass("hidden");
        } else {
            $(inputs[3]).removeClass("error");
            $(inputs[3]).parent().children(".err_t2").addClass("hidden");
        }
    });
    $(inputs[4]).blur(function() {
        inputs[4].style.textTransform = 'capitalize';
        if (validateName(inputs[4].value) == false) {
            inputs[4].className = "error";
            $(inputs[4]).parent().children(".err_t2").removeClass("hidden");
        } else {
            $(inputs[4]).removeClass("error");
            $(inputs[4]).parent().children(".err_t2").addClass("hidden");
        }
    });
    //console.log(inputs.each(validate));

    // Next button

    $(".next").click(function() {

        preSubmit(inputs);

        if (step == 2) {
            if (giveNumb(inputs) == false) {
                alert("you must be at least 21");
            }
            if (validateUNN() == false || validateName(inputs[3].value) == false || validateName(inputs[4].value) == false || inputs[5].value == "") {
                return false;
            } else {
                inputs.removeClass("error");
                $(".err_t2").addClass("hidden");
                $(".step").addClass("hidden");
                $(".third").removeClass("hidden").addClass("active");
                $(".next").addClass("hidden");
                $(".submit").removeClass("hidden");
                $(".p-b-three").addClass("p-b-active");
                step = 3;
            }
        }

        if (step == 1) {
            if (validateNumber(inputs[0].value) == false || validateNumber2(inputs[1].value) == false) {
                return false;
            } else {
                inputs.removeClass("error");
                $(".err_t").addClass("hidden");
                $(".prev").removeClass("hidden");
                $(".step").addClass("hidden");
                $(".second").removeClass("hidden").addClass("active");
                $(".p-b-two").addClass("p-b-active");
                step = 2;
            }

        }
        //if (inputs.each(validate) == false) showError;
    });

    //prev button

    $(".prev").click(function() {
        if (step == 2) {
            $(".err_t2").removeClass("error").addClass("hidden");
            $(".prev").addClass("hidden");
            $(".step").addClass("hidden");
            $(".first").removeClass("hidden").addClass("active");
            $(".p-b-two").removeClass("p-b-active");
        }
        if (step == 3) {
            $(".step").addClass("hidden");
            $(".second").removeClass("hidden").addClass("active");
            $(".next").removeClass("hidden").addClass("active");
            $(".submit").addClass("hidden");
            $(".p-b-three").removeClass("p-b-active");
        }

        step--;
    });

    /*function handleStep(isForward) {
        return $(".step").removeClass("hidden");
    }*/

    //this function puts all inputs to the last page
    function preSubmit(el) {
        var lastP = $(".third p");

        for (var i = 0; i < el.length; i++) {
            lastP.each(function() {
                $(lastP[i]).html(el[i].value);
            });
        }
    }
    //LOGIC
    function parseDom() {
        var inputses = $("li").children("input");
        return inputses;
    }

    function validate(el) {
        var classes = el.className;

        if (classes === "js-validate-number") return validateNumber(el);
        return true;
    }

    function validateNumber(el) {
        return /^([1-9][0-9]{0,3}|10000)$/g.test(el);
    }

    function validateNumber2(el) {
        return /^(1[0-2]|[1-9])$/g.test(el);
    }

    function validateName(el) {
        return /^[A-Za-z]+[-A-Za-z]+$/g.test(el);
    }

    function validateUNN() {
        if (giveNumb(inputs) == false) {
            console.log("you must be at least 21");
            $(inputs[2]).parent().children(".err_t2").removeClass("hidden error").addClass("error_age").html("&#8592 you must be </br> at least 21");
            return false;
        }
        if ($(inputs[2]).val().length !== parseInt($(inputs[2]).attr('maxlength'))) {
            $(inputs[2]).parent().children(".err_t2").removeClass("hidden error").addClass("error_age").html("&#8592 you need to put<br> your 10 char UNN");
            return false;
        } else {
            $(inputs[2]).parent().children(".err_t2").addClass("hidden");
            return true;
        }
    }

    function giveNumb(el) {
        var brthDateD = new Date(Number(unnDate) + parseInt(el[2].value.slice(0, 5)) * 24 * 3600 * 1000);
        if (brthDateD.getFullYear() > curDate.getFullYear() - 21) {
            return false;
        } else {
            return true;
        }
    }


    /*function showError(el) {
        el.find("input").addClass("error");
        el.find(".err_t").removeClass("hidden");
    }*/

    /*function inpBlur() {
        //alert("input very blured");
        console.log("input blured");
    }*/
    $(function() {
        $("#f_elem_city").autocomplete({
            source: function(request, response) {
                $.getJSON(
                    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                    function(data) {
                        response(data);
                    }
                );
            },
            minLength: 3,
            select: function(event, ui) {
                var selectedObj = ui.item;
                $("#f_elem_city").val(selectedObj.value);
                getcitydetails(selectedObj.value);
                return false;
            },
            open: function() {
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function() {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });
        $("#f_elem_city").autocomplete("option", "delay", 100);
    });
});