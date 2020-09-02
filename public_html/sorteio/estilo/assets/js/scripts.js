

$(document).ready(function () {

    const token = getToken()
    getAllConcursos((token))

    if (token) {
        $("#auth_content").hide()
        $("#sorteio_content").show()
    } else {
        $("#auth_content").show()
        $("#sorteio_content").hide()
    }



})

$(function () {

    $("#log-out").click(function () {
        setToken(false)
        setUser(false)
        $("#auth_content").show()
        $("#sorteio_content").hide()
    })

    // mobile menu open
    $(".j_menu_mobile_open").click(function (e) {
        e.preventDefault();

        $(".j_menu_mobile_tab").css("left", "auto").fadeIn(1).animate({"right": "0"}, 200);
    });

    // mobile menu close
    $(".j_menu_mobile_close").click(function (e) {
        e.preventDefault();

        $(".j_menu_mobile_tab").animate({"left": "100%"}, 200, function () {
            $(".j_menu_mobile_tab").css({
                "right": "auto",
                "display": "none"
            });
        });
    });

    // scroll animate
    $("[data-go]").click(function (e) {
        e.preventDefault();

        var goto = $($(this).data("go")).offset().top;
        $("html, body").animate({scrollTop: goto}, goto / 2, "easeOutBounce");
    });

    // modal open
    $("[data-modal]").click(function (e) {
        e.preventDefault();

        var modal = $(this).data("modal");
        $(modal).fadeIn(200).css("display", "flex");
    });

    // modal close
    $(".j_modal_close").click(function (e) {
        e.preventDefault();

        if ($(e.target).hasClass("j_modal_close")) {
            $(".j_modal_close").fadeOut(200);
        }

        var iframe = $(this).find("iframe");
        if (iframe) {
            iframe.attr("src", iframe.attr("src"));
        }
    });

    // collpase
    $(".j_collapse").click(function () {
        var collapse = $(this);

        collapse.parents().find(".j_collapse_icon").removeClass("icon-minus").addClass("icon-plus");
        collapse.find(".j_collapse_icon").removeClass("icon-plus").addClass("icon-minus");

        if (collapse.find(".j_collapse_box").is(":visible")) {
            collapse.find(".j_collapse_box").slideUp(200);
        } else {
            collapse.parent().find(".j_collapse_box").slideUp(200);
            collapse.find(".j_collapse_box").slideDown(200);
        }
    });

    /**
     * Fazer login na api do sorteio
     */
    $("form:not('.ajax_off')").submit(function (e) {
        e.preventDefault();
        var form = $(this);

        console.log("form", form)

        var load = $(".ajax_load");

        form.ajaxSubmit({
            url: `${api}/auth`,
            type: "POST",
            dataType: "json",
            data: {
                recaptcha: $("#g-recaptcha-response").val()
            },

            beforeSend: function (h) {
                load.fadeIn(200).css("display", "flex")
            },
            success: function (response) {
                //redirect
                if (response.success) {
                    setToken(response.token)
                    setUser(response.user)
                    $("#auth_content").hide()
                    $("#sorteio_content").show()
                    makeTableAuthConcurso(response)
                } else {
                    alert(response.msg)
                }

            },
            complete: function () {
                load.fadeOut(200);

                if (form.data("reset") === true) {
                    form.trigger("reset");
                }
            }
        });
    })


});

/**
 * Listar os concursos que são de publicidade
 * */
function getAllConcursos(makeTbConcurso = false) {
    const load = $(".ajax_load");
    const flash = $(".ajax_response");

    $.ajax({
        url: `${api}/get_all_concurso`,
        type: "GET",
        dataType: "json",

        beforeSend: function (h) {
            load.fadeIn(200).css("display", "flex");
        },
        success: function (response) {

            console.log(response)

            //message
            if (response.success) {
                if (response.data) {

                    makeViewPublicConcursos(response)

                    if (makeTbConcurso) {
                        makeTableAuthConcurso(response)
                    }

                } else {
                    alert(response.msg)
                }
            } else {
                alert(response.msg)
                flash.fadeOut(100);
            }
        },
        complete: function () {
            load.fadeOut(200);
        }
    })
}

function getAllBilheteFromConcurso(concurso_id) {
    const load = $(".ajax_load");
    const flash = $(".ajax_response");

    $.ajax({
        url: `${api}/get_all_bilhetes_by_concurso`,
        type: "GET",
        dataType: "json",

        beforeSend: function (h) {
            load.fadeIn(200).css("display", "flex")
            removeErrorCupom()
        },
        data:{
            token: getToken(),
            concurso_id: concurso_id
        },
        success: function (response) {

            console.log(response)

            //message
            if (response.success) {
                if (response.data) {
                    clearTable("#table-bilhetes tbody")
                    makeTableBilheteria(response)
                } else {
                    setErrorCupom(response.msg)
                }
            } else {
                clearTable("#table-bilhetes tbody")
                setErrorCupom(response.msg)
                flash.fadeOut(100);
            }
        },
        complete: function () {
            load.fadeOut(200);
        }
    })
}

function setErrorCupom(error) {
    $("#count-bilhete").empty()
    $("#error-bilhetes").empty()
    $("#error-bilhetes").append($("<div>").text(error))
}

function removeErrorCupom() {
    $("#error-bilhetes").empty()
}

function makeViewPublicConcursos(response) {

    const newsconcursos = $("#news-concursos")


    response.data.forEach(element => {
        const article = $("<article>")
        article.addClass('radius')

        const header = $("<header>")

        const info = $(`<i style="font-size:14px">${element.concurso_data_sorteio}</i>`)

        const img = $("<img alt='' title=''>")
        img.attr('src', element.concurso_path_image)

        const h3 = $(`<h3>${element.concurso_id} - ${element.concurso_desc_premiacao}</h3>`)
        const p = $(`<p>${element.concurso_detalhe_premoacao}</p>`)

        header.append(info).append(img).append(h3).append(p)

        article.append(header)

        newsconcursos.append(article)
    });
}

function makeTableAuthConcurso(response) {

    try {
        $("#user-name").text(response.user.usuario_nome)
    } catch (ex) {
        try{
            $("#user-name").text(getUser().usuario_nome)
        }catch(exd){}
    }

    try {
        const table = $("#table-cncurso tbody")

        response.data.forEach((element) => {
            let status_concurso = ''
            switch (element.concurso_apurado) {
                case 0:
                    status_concurso = '<i style="color:purple">PENDENTE</i>'
                    break;
                case 1:
                    status_concurso = '<i style="color:green;font-weight: bold">PREMIADO</i>'
                    break;
                case 2:
                    status_concurso = '<i style="color:orange">ACUMULADO</i>'
                    break;
                default:
                    status_concurso = '-'
            }
            let contentBilhetePremiado = ''
            if (element.concurso_bilhete_premiado) {
                contentBilhetePremiado = `<strong style="color:green">${element.concurso_bilhete_premiado}</strong> <i class="fa fa-gift"></i>`
            }
            const tr = $("<tr>")
                .append($(`<td>${element.concurso_id}</td>`))
                .append($(`<td>${element.concurso_data_sorteio}</td>`))
                .append($(`<td>${element.concurso_desc_premiacao}</td>`))
                .append($(`<td>${contentBilhetePremiado}</td>`))
                .append($(`<td>${status_concurso}</td>`))

            tr.bind('click', function (e) {
                getAllBilheteFromConcurso(element.concurso_id)


            })

            table.append(tr)
        });

    } catch (ex) {
    }
}

function clearTable(id) {
    const table = $(id)
    table.empty()
}

function makeTableBilheteria(response) {

    window.location.hash = "#sorteio_content"

    try {


        const table = $("#table-bilhetes tbody")
        clearTable(table.id)

        $("#count-bilhete").text(`(${response.data.length})`)

        response.data.forEach((element) => {

            premiado = '-'

            if((element.concurso_bilhete_premiado) && element.concurso_bilhete_premiado == element.bilhete_num_sorte){
                premiado = `<strong style="color:green">Premiado!!!</strong>`
            }else if(element.concurso_apurado == 1){
                premiado = '<strong style="color:darkgray">Não foi desta vez! :(</strong>'
            }


            const tr = $("<tr>")
                .append($(`<td>${element.concurso_id}</td>`))
                .append($(`<td>${element.bilhete_num_sorte}</td>`))
                .append($(`<td>${element.bilhete_valor}</td>`))
                .append($(`<td>${premiado}</td>`))


            table.append(tr)
        });

    } catch (ex) {
    }
}

function getToken() {
    return localStorage.getItem('tonen_premiacao')
}

function setToken(token) {
    if(!token){
        localStorage.removeItem('tonen_premiacao')
    }else{
        localStorage.setItem('tonen_premiacao', token)
    }

}

function getUser() {
    return JSON.parse(localStorage.getItem('user_premiacao'))
}

function setUser(user) {
    if(!user){
        localStorage.removeItem('user_premiacao')
    }else{
        localStorage.setItem('user_premiacao', JSON.stringify(user))
    }

}



