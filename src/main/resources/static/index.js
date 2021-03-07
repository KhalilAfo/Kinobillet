function kjop() {

    const film = $("#film").val();
    console.log(film);
    const antall = $("#antall").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonnr = $("#telefonnr").val();
    const epost = $("#epost").val();

    $("#feil1").html("");
    $("#feil2").html("");
    $("#feil3").html("");
    $("#feil4").html ("");
    $("#feil5").html("");
    $("#feil6").html("");


    let nummer = /^[0-9]{8}$/;
    let nummer1 = /^[1-9]{1,2}$/;
    let email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let string = /^[a-zæøåA-ZÆØÅ.\- ]{2,20}$/;

    if (film === "" || antall ==="" || fornavn ==="" || etternavn ==="" || telefonnr ==="" || epost ===""
        || !fornavn.match(string) || !etternavn.match(string) || !epost.match(email) ||
        !telefonnr.match(nummer) || !antall.match(nummer1) ) {
        if(film === ""){
            $("#feil1").html("Velg Film!".fontcolor("red"));
        }

        if(!antall.match(nummer1) && !(antall === "")){
            $("#feil2").html("Antall må være positiv, ikke mer en to sifferer og ikke inneholde bokstaver!"
                .fontcolor("red"));
        }
        if (antall === "") {
            $("#feil2").html("Må skrive noe inn i antall!".fontcolor("red"));
        }

        if(!fornavn.match(string) && !(fornavn === "")){
            $("#feil3").html("Fornavn må ikke inneholde tall og må være mellom 2-20 tegn!".fontcolor("red"));
        }
        if (fornavn === "") {
            $("#feil3").html("Må skrive noe inn i fornavnet!".fontcolor("red"));
        }

        if(!etternavn.match(string) && !(etternavn === "")){
            $("#feil4").html("Etternavn må ikke inneholde tall og må være mellom 2-20 tegn!".fontcolor("red"));
        }
        if (etternavn === "") {
            $("#feil4").html("Må skrive noe inn i etternavnet!".fontcolor("red"));
        }

        if(!telefonnr.match(nummer) && !(telefonnr === "")){
            $("#feil5").html("Telefonnr må ikke inneholde bokstaver og må være 8 tall!".fontcolor("red"));
        }
        if (telefonnr === "") {
            $("#feil5").html("Må skrive noe inn i telefonnr!".fontcolor("red"));
        }

        if(!epost.match(email) && !(epost === "")){
            $("#feil6").html("Epost-en må være på riktig form!".fontcolor("red"));
        }
        if (epost === "") {
            $("#feil6").html("Må skrive noe inn i epost!".fontcolor("red"));
        }
    }
    else {
        const billetter = {
            film : $("#film").val(),
            antall : $("#antall").val(),
            fornavn :
                $("#fornavn").val(),
            etternavn : $("#etternavn").val(),
            telefonnr : $("#telefonnr").val(),
            epost : $("#epost").val(),
        };
        $.post("/lagre", billetter, function(){
            hentAlle();
        });
        // $("#film").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    }

}

function hentAlle() {
    $.get( "/hentAlle", function( billetter ) {
        formaterData(billetter);
    });
}

function formaterData(billetter) {
    let ut = "<table class='table table-striped table-bordered'>"+
        "<tr class='table-primary'>"+
        "<th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th>"+
        "</tr>";
    for (const billett of billetter) {
        ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" + billett.fornavn + "</td>" +
            "<td>" + billett.etternavn + "</td><td>" + billett.telefonnr + "</td><td>" + billett.epost + "</td></tr>";
    }
    $("#resultat").html(ut);
}

function slett() {
    $.get( "/slettAlle", function() {
        hentAlle();
    });
}
