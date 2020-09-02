<html lang="pt-br">

<head>
    <script>
        const api = 'https://servicos.maxxcard.com.br:2707/api/premiacao'
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">


    <title>Premiação - Maxxcard</title>

    <link rel="icon" type="image/png" href="../estilo/assets/images/favicon.png"/>
    <link rel="stylesheet" href="../estilo/assets/style.css"/>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

    <style>
        tbody, tr, td, th {
            border: 1px solid #949494;
        }

        tbody tr:hover {
            background: #9fd4ea;
            cursor: pointer;
        }

        .sorteio_header h2 {
            padding-top: 10px;
        }

        .sorteio_bilhetes {
            padding-top: 10px;
        }

        .btn-sair {
            position: relative;
        }

        .btn-sair button {
            position: absolute;
            right: 0;
            width: 100px;
        }

        #error-bilhetes div {
            color: #ff0000;
            font-weight: bold;
            background: rgba(255, 0, 0, 0.06);
            padding: 5px;
            border-radius: 2px;
            margin: 2px;
        }
    </style>

</head>

<body>

<div class="ajax_load">
    <div class="ajax_load_box">
        <div class="ajax_load_box_circle"></div>
        <p class="ajax_load_box_title">Aguarde, carregando...</p>
    </div>
</div>


<!--CONTENT-->
<main class="main_content">

    <article class="auth">


        <div class="home_features">
            <section class="container content">
                <header class="home_features_header">
                    <h2>Veja os ultimos sorteios</h2>
                    <p>Veja os ultimos sorteios que estão em aberto. É muito fácil participar, veja:</p>
                </header>

                <div class="home_features_content" id="news-concursos">
                    <!-- <article class="radius">
                        <header>
                            <img alt="" title="" src="../estilo/assets/images/home_control.jpg" />
                            <h3>Sorteio Virada do Ano</h3>
                            <p>It is a long established fact that a reader will be distracted by
                                the readable content of a page when looking at its layout.</p>
                        </header>
                    </article> -->
                </div>
            </section>
        </div>

        <div id="auth_content" class="auth_content container content" hidden>
            <header class="auth_header">
                <h1>Consulte seus cupons</h1>

            </header>

            <form class="auth_form" action="#" method="post" enctype="multipart/form-data">
                <div class="ajax_response"></div>
                <label>
                    <div>
                        <span><i class="fa fa-credit-card"></i>&nbsp;Número do cartão</span>
                        <i style="font-size: 12px;">Inform um de seus cartões válidos.</i>
                    </div>
                    <input type="tel" value="6059440073787008" name="cartao" maxlength="16" value="" placeholder=""
                           required/>
                </label>


                <label class="check">
                    <input type="checkbox" name="save"/>
                    <span>Lembrar dados?</span>
                </label>

                <div class="g-recaptcha" data-sitekey="6LcY7dgUAAAAAMSi2RpHShIeIs1hRSBsHGb5ceNj"></div>

                <button class="auth_form_btn transition gradient gradient-green gradient-hover">Entrar</button>
            </form>
        </div>


        <section class="sorteios" id="sorteio_content" hidden>
            <div class="sorteios_content container content">
                <div class="btn-sair">
                    <button id="log-out" class="auth_form_btn transition gradient gradient-green gradient-hover">Sair
                    </button>
                </div>
                <header class="sorteio_header">
                    <h3 id="user-name"></h3>
                    <hr>
                    <h2>Últimos sorteios</h2>
                    <p><i style="color:lightskyblue" class="fa fa-info-circle"></i>&nbsp;Selecione o concurso na lista abaixo para detalhar seus cupons.</p>

                </header>

                <head>
                    <style>
                        table {
                            font-family: arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                        }

                        td,
                        th {
                            text-align: left;
                            padding: 8px;
                        }

                        tr:nth-child(even) {
                            background-color: #dddddd;
                        }
                    </style>
                </head>

                <body>
                <div id="error-bilhetes">

                </div>
                <table id="table-cncurso">
                    <thead>
                    <tr>
                        <th>Concurso</th>
                        <th>Data do sorteio</th>
                        <th>Descrição do premio</th>
                        <th>Nº do cupom sorteado</th>
                        <th>Status do concurso</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <span><a title="regras" href="#">Regras do Sorteio</a></span>
                </body>
            </div>
            </div>


            <div class="sorteios_content container content sorteio_bilhetes">
                <header class="sorteio_header">
                    <h2 style="display: inline-block">Seus cupons </h2>&nbsp;<b style="display: inline-block" id="count-bilhete"></b>
                </header>

                <body>

                <table id="table-bilhetes">
                    <thead>
                    <tr>
                        <th>Concurso</th>
                        <th>Seu número da sorte</th>
                        <th>Valor do cupom</th>
                        <th>Cupom premiado?</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                </body>
            </div>
            </div>
        </section>

    </article>
</main>


<script src="../estilo/assets/scripts.js"></script>
<script src="../estilo/assets/js/scripts.js"></script>
<script src="../estilo/assets/js/jquery.maskMoney.min.js"></script>
<script src="../estilo/assets/js/jquery-dateformat.js"></script>
<link rel="stylesheet" href="../estilo/assets/css/font-awesome.min.css">

</body>

</html>
