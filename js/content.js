function Content() {
    "use strict";

    this.getText = function () {
        var i, text =  [
            // jf
            ["jjj fff jjj fff jjf ffj jfj fjf",
                "fjj jff jjf ffj jfj fjf fjj jff jff"],
            // jf kd
            ["kkk ddd kkk ddd kkd ddk kdk dkd",
                "dkk kdd kkd ddk kdk dkd dkk kdd",
                "ffk jjd kkj ddf fjk kjd dfj kjf dkfj"],
            // jf kd ls
            ["lll sss lll sss lls ssl lsl sls",
                "sll lss lls ssl lsl sls sll lss",
                "flk jsd ksj dlf fsk kld dsj klf dlfj"],
            // jf kd ls ña
            ["ñññ aaa ñññ aaa ñña aañ ñañ aña",
                "aññ ñaa ñña aañ ñañ aña aññ ñaa",
                "la sala da kada faja daña jada da"],
            // jf kd ls ña hg
            ["hhh ggg hhh ggg hhg ggh hgh ghg",
                "ghh hgg hhg ggh hgh ghg ghh hgg",
                "la daga daña la faja kada ha sal"],
            ["la daga daña las alas a las hadas",
                "das la salada sal a la lasaña",
                "fallas al dañar las fajas a las hadas"],
            ["sada faga haja kala ñasa dafa",
                "gaha jaka laña asdf ñlkj asdfg",
                "hjklñ gfdas añsldkfjgh ghfjdkslañ"],

            // jf kd ls ña hg ty
            ["yyy ttt yyy ttt yyt tty yty tyt",
                "tyy ytt yyt tty yty tyt tyy ytt",
                "la gata tala y talla la atalaya"],
            ["ata gata tala hasta tal fatal",
                "y ya hay haya atalaya yak",
                "hay gatas hasta la lasaña"],

            // jf kd ls ña hg ty ur
            ["uuu rrr uuu rrr uur rru uru rur",
                "ruu urr uur rru uru rur ruu urr",
                "la hada usa la daga y raja la faja"],
            [
                "rata raya araña ruda rala arar",
                "usa hurta ayuda guadaña uña gula",
                "ayuda a la araña a salar la lasaña" ],

            // jf kd ls ña hg ty ur ei
            [
                "iii eee iii eee iie eei iei eie",
                "eii iee iie eei iei eie eii iee",
                "da risa freir tus fresas y salarlas"],
            [
                "seda helar falle gatee jale eñe esta",
                "salir di fila gatita guia riña lista",
                "ya esta lista la fruta frita"],

            // jf kd ls ña hg ty ur ei ow
            ["ooo www ooo www oow wwo owo wow",
                "woo oww oow wwo owo wow woo oww",
                "a los osos les da risa freir kiwis"],
            [
                "kilo oso dedo hueso gato jalo sueño",
                "waldo wario waluigi waka wally kiwi",
                "wally esta ahi o era waldo"],

            // jf kd ls ña hg ty ur ei ow pq
            ["ppp qqq ppp qqq ppq qqp pqp qpq",
                "qpp pqq ppq qqp pqp qpq qpp pqq",
                "rio porque puedo tipear hartas frases"],
            [
                "por para pasa pido felpa golpe pata",
                "quitasol quiero queja pequeño queda",
                "porque quiero queso para ti"],
            [
                "el gusto de tipear frases rapido",
                "falta estudiar las tildes y otras",
                "letras y luego repasar repasar"],

            ["ahora ya se que puedo freir fresas",
                "y kiwis y puedo tipear rapido",
                "por eso rio y yo digo jaja y waja"],

            // jf kd ls ña hg ty ur ei ow pq mv
            ["mmm vvv mmm vvv mmv vvm mvm vmv",
                "vmm mvv mmv vvm mvm vmv vmm mvv",
                "tipear rapido es lo mejor ya veras"],
            [
                "medio malla moto quema rima timo muy",
                "vaya vaga salva java viña oveja voy",
                "ya llevamos mas de la mitad"],

            // jf kd ls ña hg ty ur ei ow pq mv nb
            ["nnn bbb nnn bbb nnb bbn nbn bnb",
                "bnn nbb nnb bbn nbn bnb bnn nbb",
                "la trompeta resuena y el bombo tambien"],
            [
                "nada nose freno mina vino niño lana",
                "balon barata bis bello fiebre baña",
                "el es muy bueno jugando al balon"],

            // jf kd ls ña hg ty ur ei ow pq mv mb ,c
            [",,, ccc ,,, ccc ,,c cc, ,c, c,c",
                "c,, ,cc ,,c cc, ,c, c,c c,, ,cc",
                "no te comas las comas porque sirven mucho"],
            [
                "casa, cafe, crater, copa, cama, cordura,",
                "puedes aumentar la dificultad, aumentando",
                "la precision, o disminuyendo el tiempo,"],

            // jf kd ls ña hg ty ur ei ow pq mv mb ,c .x
            ["... xxx ... xxx ..x xx. .x. x.x",
                "x.. .xx ..x xx. .x. x.x x.. .xx",
                "los puntos son extremos.",
                "permiten separar ideas."],
            [
                "extraño. xilofono. saxofon. fax. nexo. taxi.",
                "sexto. oxigeno. oxido. texto. extra. latex.",
                "ya casi podemos escribir cualquier texto."],

            // jf kd ls ña hg ty ur ei ow pq mv mb ,c .x -z
            ["--- zzz --- zzz --z zz- -z- z-z",
                "z-- -zz --z zz- -z- z-z z-- -zz",
                "ya sabemos desde la a hasta la z,",
                "incluso el -."],
            [
                "pez-tez-lapiz-voraz-rapaz-feliz-fugaz",
                "oz-faz-caliz-abraza-tiza-zaqueo-zapato",
                "que felicidad, ya tenemos todoas las letras"],

            ["ahora podemos escribir con todas",
                "las letras, pero todavia nos falta mucho.",
                "vamos a practicar un poco antes de continuar"],
            ["notaras que todavia no tenemos tildes.",
                "tampoco tenemos mayusculas.",
                "pero por mientras podemos practicar sin ellas."],
            [
                "recuerda practicar siempre escribiendo con",
                "todos los dedos, ya que la practica hace al",
                "maestro. practica cuando escribes correos"],
            ["hay varios gatos en los tejados,",
                "miran hacia abajo con expectacion",
                "pues abajo alguien esta cocinando pescados"],
            ["es mejor lavar la lechuga antes de comer",
                "pues pueden contener bacterias y tierra",
                "recuerda que es mejor prevenir que curar."],
            ["recuerda practicar todos los dias.",
                "mientras escribes un correo electronico,",
                "o mientrasestas en el chat."],
            ["suficiente de practica por ahora.",
                "tenemos que seguir avanzando.",
                "lo siguiente que vamos a ver son las tildes"],

            ["la tilde se hace con el dedo",
                "pequeño de la mano derecha y",
                "luego se presiona la vocal."],
            ["frágil, lunático, asiático, fábrica.",
                "práctico, obstáculo, cadáver, carácter.",
                "acuático, fantástico, hectárea."],
            ["hélice, héroe, déficit, éxtasis.",
                "océano, término, acérrimo, bélgica.",
                "ibérico, arsénico, intérprete, bélico."],
            ["magnífico, antídoto, monosílaba.",
                "frívolo, vehículo, antígona.",
                "ídolo, etíope, fatídico, hígado, insípido."],
            ["irónico, campeón, canción, mansión.",
                "pólvora, evaporación, bastón.",
                "información, ópalo, órdenes, endócrino"],
            ["betún, brújula, esdrújula, común.",
                "número, músico, atún, cúpula.",
                "acústico, algún, asegúrese, cúspide."],
            ["la opción más válida es legítima. el",
                "magnífico árbol es una fábrica de oxígeno",
                "la tarántula es fantástica y terrorífica."],
            ["ahora podemos escribir todas las",
                "palabras en el castellano. nos faltan las",
                "mayúsculas, y estaremos listos con las letras"],
            ["Si la letra se escribe con la mano derecha,",
                "entonces se presiona mayúscula con la",
                "mano izquierda."],
            ["Presiona Mayúscula con la Mano",
                "Izquierda. Ye U I O Pe Hache.",
                "Jota Ka eLe eÑe eNe eMe."],
            ["Presiona Mayúscula con la Mano",
                "Derecha. Qu W E eRe Te A Ese De.",
                "eFe Ge Zeta X Ce uVe Be."],
            ["QqQq WwWw EeEe RrRr TtTt",
                "AaAa SsSs DdDd FfFf GgGg",
                "ZzZz XxXx CcCc VvVv BbBb"],
            ["PpPp OoOo IiIi UuUu YyYy",
                "ÑñÑñ LlLl KkKk JjJj HhHh",
                "MmMm NnNn"],
            ["Ahora ya conocemos las mayúsculas",
                "y las tildes. Nos faltan todavía los",
                "símbolos de pregunta y exclamación."],
            ["Mayúscula con la mano derecha",
                "Luego apretar 1 con la izquierda!",
                "!!!! !!!! !!!! !!!!"],
            ["Mayúscula con la mano izquierda, y luego",
                "apretar el símbolo de exclamación con",
                "la mano derecha ¡¡¡ ¡¡¡¡ ¡¡¡¡ ¡¡¡¡"],
            ["Para hacer el símbolo de interrogación de",
                "apertura, se debe utilizar el dedo pequeño",
                "de la mano izquierda ¿¿¿¿ ¿¿¿¿ ¿¿¿¿ ¿¿¿¿"],
            ["Mayúscula con la mano izquierda. Luego",
                "apretar el signo de interrogación con la",
                "mano derecha ???? ???? ???? ????"],
            ["¿Te das cuenta que ya puedes",
                "escribir todo el español? ¡Felicidades!",
                "Ahora debes practicar por tu cuenta."],
            ["¡Terminaste!",
                "¡Muchas gracias por utilizar este programa!"]
        ];

        for (i = 0; i < text.length; i += 1) {
            text[i] = text[i].join("\n");
        }
        return text;
    };
}
