function Content() {
    "use strict";

    this.getText = function () {
        var text =  [
            "jjj fff jjj fff jjf ffj jfj fjf\nfjj jff jjf ffj jfj fjf fjj jff jff",
            "kkk ddd kkk ddd kkd ddk kdk dkd\ndkk kdd kkd ddk kdk dkd dkk kdd\nffk jjd kkj ddf fjk kjd dfj kjf dkfj",
            "lll sss lll sss lls ssl lsl sls\nsll lss lls ssl lsl sls sll lss\nflk jsd ksj dlf fsk kld dsj klf dlfj",
            "ñññ aaa ñññ aaa ñña aañ ñañ aña\naññ ñaa ñña aañ ñañ aña aññ ñaa\nla sala da kada faja daña jada da",
            "hhh ggg hhh ggg hhg ggh hgh ghg\nghh hgg hhg ggh hgh ghg ghh hgg\nla daga daña la faja kada ha sal",
            "la daga daña las alas a las hadas\nla gala da la salada sal a ada\nfallas al dañar las fajas a las hadas",
            "sada faga haja kala ñasa dafa\ngaha jaka laña asdf ñlkj asdfg\nhjklñ gfdas añsldkfjgh ghfjdkslañ",

            "yyy ttt yyy ttt yyt tty yty tyt\ntyy ytt yyt tty yty tyt tyy ytt\nla gata tala y talla la atalaya",
            "uuu rrr uuu rrr uur rru uru rur\nruu urr uur rru uru rur ruu urr\nla hada usa la daga y raja la faja",
            "iii eee iii eee iie eei iei eie\neii iee iie eei iei eie eii iee\nda risa freir tus fresas y salarlas",
            "ooo www ooo www oow wwo owo wow\nwoo oww oow wwo owo wow woo oww\na los osos les da risa freir kiwis",
            "ppp qqq ppp qqq ppq qqp pqp qpq\nqpp pqq ppq qqp pqp qpq qpp pqq\nrio porque puedo tipear hartas frases",
            "ahora se que puedo freir fresas\ny kiwis y puedo tipear rapido\npor eso rio y yo digo jaja y waja",
            "el gusto de tipear lo sigo y rio\nque la fresa se fria y el queso\nlas frases ",

            "mmm vvv mmm vvv mmv vvm mvm vmv\nvmm mvv mmv vvm mvm vmv vmm mvv\ntipear rapido es lo mejor ya veras",
            "nnn bbb nnn bbb nnb bbn nbn bnb\nbnn nbb nnb bbn nbn bnb bnn nbb\nla trompeta resuena y el bombo tambien",
            ",,, ccc ,,, ccc ,,c cc, ,c, c,c\nc,, ,cc ,,c cc, ,c, c,c c,, ,cc\nno te comas las comas porque sirven mucho",
            "... xxx ... xxx ..x xx. .x. x.x\nx.. .xx ..x xx. .x. x.x x.. .xx\nlos puntos son extremos.\npermiten separar ideas.",
            "--- zzz --- zzz --z zz- -z- z-z\nz-- -zz --z zz- -z- z-z z-- -zz\nya sabemos desde la a hasta la z,\nincluso el -.",
            "ahora podemos escribir con todas\nlas letras, pero todavia nos falta mucho.\nvamos a practicar un poco antes de continuar",
            "notaras que todavia no tenemos tildes.\ntampoco tenemos mayusculas.\npero por mientras podemos practicar sin ellas.",
            "hay varios gatos en los tejados,\nmiran hacia abajo con expectacion\npues abajo alguien esta cocinando pescados",
            "es mejor lavar la lechuga antes de comer\npues pueden contener bacterias y tierra\nrecuerda que es mejor prevenir que curar.",
            "recuerda practicar todos los dias.\nmientras escribes un correo electronico,\no mientrasestas en el chat.",
            "suficiente de practica por ahora.\ntenemos que seguir avanzando.\nlo siguiente que vamos a ver son las tildes",

            "la tilde se hace con el dedo\npequeño de la mano derecha y\nluego se presiona la vocal.",
            "frágil, lunático, asiático, fábrica.\npráctico, obstáculo, cadáver, carácter.\nacuático, fantástico, hectárea.",
            "hélice, héroe, déficit, éxtasis.\nocéano, término, acérrimo, bélgica.\nibérico, arsénico, intérprete, bélico.",
            "magnífico, antídoto, monosílaba.\nfrívolo, vehículo, antígona.\nídolo, etíope, fatídico, hígado, insípido.",
            "irónico, campeón, canción, mansión.\npólvora, evaporación, bastón.\ninformación, ópalo, órdenes, endócrino",
            "betún, brújula, esdrújula, común.\nnúmero, músico, atún, cúpula.\nacústico, algún, asegúrese, cúspide.",
            "la opción más válida es legítima. el\nmagnífico árbol es una fábrica de oxígeno\nla tarántula es fantástica y terrorífica.",
            "ahora podemos escribir todas las\npalabras en el castellano. nos faltan las\nmayúsculas, y estaremos listos con las letras",
            "Si la letra se escribe con la mano derecha,\nentonces se presiona mayúscula con la\nmano izquierda.",
            "Presiona Mayúscula con la Mano\nIzquierda. Ye U I O Pe Hache.\nJota Ka eLe eÑe eNe eMe.",
            "Presiona Mayúscula con la Mano\nDerecha. Qu W E eRe Te A Ese De.\neFe Ge Zeta X Ce uVe Be.",
            "QqQq WwWw EeEe RrRr TtTt\nAaAa SsSs DdDd FfFf GgGg\nZzZz XxXx CcCc VvVv BbBb",
            "PpPp OoOo IiIi UuUu YyYy\nÑñÑñ LlLl KkKk JjJj HhHh\nMmMm NnNn",
            "Ahora ya conocemos las mayúsculas\ny las tildes. Nos faltan todavía los\nsímbolos de pregunta y exclamación.",
            "Mayúscula con la derecha\nLuego apretar 1 con la izquierda!\n!!!! !!!! !!!! !!!!",
            "Mayúscula con la izquierda\nLuego apretar símbolo con la derecha\n¡¡¡ ¡¡¡¡ ¡¡¡¡ ¡¡¡¡",
            "Dedo pequeño mano izquierda\n¿¿¿¿ ¿¿¿¿ ¿¿¿¿ ¿¿¿¿",
            "Mayúscula con la izquierda\nLuego apretar símbolo con la derecha\n???? ???? ???? ????",
            "¿Te das cuenta que ya puedes\nescribir todo el español? ¡Felicidades!\n¡Ahora debes practicar por tu cuenta!",
            "¡Terminaste!\n¡Muchas gracias por utilizar este programa!"
        ];
        return text;
    };
}
