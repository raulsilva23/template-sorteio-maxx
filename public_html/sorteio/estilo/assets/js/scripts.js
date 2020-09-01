$(document).ready(function () {

    const load = $(".ajax_load");
    const flash = $(".ajax_response");

    $.ajax({
        url: `${api}/get_all_concurso`,
        type: "GET",
        dataType: "json",

        beforeSend: function (h) {
            load.fadeIn(200).css("display", "flex");
            //h.setRequestHeader('X-API-KEY', '40b7466e8d493d9d563aab8bf4f0ff163632ae5d')
        },
        success: function (response) {

            console.log(response)

            //message
            if (response.success) {
                if (response.data) {
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

                   

                } else {
                    
                }
            } else {
                flash.fadeOut(100);
            }
        },
        complete: function () {
            load.fadeOut(200);
        }
    })
})

$(function () {




    // mobile menu open
    $(".j_menu_mobile_open").click(function (e) {
        e.preventDefault();

        $(".j_menu_mobile_tab").css("left", "auto").fadeIn(1).animate({ "right": "0" }, 200);
    });

    // mobile menu close
    $(".j_menu_mobile_close").click(function (e) {
        e.preventDefault();

        $(".j_menu_mobile_tab").animate({ "left": "100%" }, 200, function () {
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
        $("html, body").animate({ scrollTop: goto }, goto / 2, "easeOutBounce");
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
        var flashClass = "ajax_response";
        var flash = $("." + flashClass);

        form.ajaxSubmit({
            url: `${api}/saldo_detalhado`,
            type: "POST",
            dataType: "json",
            data: {
                recaptcha: $("#g-recaptcha-response").val()
            },

            beforeSend: function (h) {
                load.fadeIn(200).css("display", "flex");
                h.setRequestHeader('X-API-KEY', '40b7466e8d493d9d563aab8bf4f0ff163632ae5d')
            },
            success: function (response) {
                //redirect
                if (response.redirect) {
                    window.location.href = response.redirect;
                }

                //message
                if (response.message) {
                    if (flash.length) {
                        flash.html(response.message).fadeIn(100).effect("bounce", 300);
                    } else {
                        form.prepend("<div class='" + flashClass + "'>" + response.message + "</div>")
                            .find("." + flashClass).effect("bounce", 300);
                    }
                } else {
                    flash.fadeOut(100);
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