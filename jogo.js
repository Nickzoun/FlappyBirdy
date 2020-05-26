const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

let frames =0;
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if (flappyBirdY >= chaoY) {
        return true;
    };

    return false;
};

function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 34,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
    
        pula() {
            flappyBird.velocidade = - flappyBird.pulo;
        },
    
        gravidade: 0.25,
        velocidade: 0,
    
        atualiza() {
            if (fazColisao(flappyBird, globais.chao)) {
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(telas.INICIO)
                }, 500);
                return;
            };
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },

        movimentos: [
            {spriteX: 0, spriteY: 0, }, //asa pra cima
            {spriteX: 0, spriteY: 26,}, //asa no meio
            {spriteX: 0, spriteY: 52,}, //asa pra baixo
            {spriteX: 0, spriteY: 26,}, //asa no meio
        ],

        frameAtual: 0,
        
        atualizaFrame() {
            const intervaloFrames = 10;
            const passouIntervalo = frames % intervaloFrames === 0;

            if(passouIntervalo) {
            const baseIncremento = 1;
            const incremento = baseIncremento + flappyBird.frameAtual;
            const baseRepeticao = flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;
            };
        },

        desenha() {
            flappyBird.atualizaFrame();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];

            contexto.drawImage(
    
                sprites,
                spriteX, spriteY, //sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, //tamanho do recorte
                flappyBird.x, flappyBird.y, //posição dentro do canvas 
                flappyBird.largura, flappyBird.altura  //tamanho dentro do canvas
            );
        },
    };

    return flappyBird;
};

function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
    
        atualiza() {
            const movimentoChao = 1;
            const repeteChao = chao.largura / 2;
            const movimentacao = chao.x - movimentoChao;

            chao.x = movimentacao % repeteChao;
        },
    
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };

    return chao;
};

const planoFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY,
            planoFundo.largura, planoFundo.altura,
            planoFundo.x, planoFundo.y,
            planoFundo.largura, planoFundo.altura,
        );

        contexto.drawImage(
            sprites,
            planoFundo.spriteX, planoFundo.spriteY,
            planoFundo.largura, planoFundo.altura,
            (planoFundo.x + planoFundo.largura), planoFundo.y,
            planoFundo.largura, planoFundo.altura,
        );
    },
};

const telaInicio = {
    sX: 134,
    sY: 0,
    larg: 174,
    alt: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            telaInicio.sX, telaInicio.sY,
            telaInicio.larg, telaInicio.alt,
            telaInicio.x, telaInicio.y,
            telaInicio.larg, telaInicio.alt,
        );
    },
};

//
// [Telas]
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    };
};

const telas = {
    INICIO: {
        inicializa() {
           globais.flappyBird = criaFlappyBird();
           globais.chao = criaChao();
        },

        desenha() {
            planoFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            telaInicio.desenha();
        },

        click() {
            mudaParaTela(telas.JOGO);
        },

        atualiza() {
            globais.chao.atualiza();
        },
    },
};

telas.JOGO = {
    desenha() {
        planoFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },

    click() {
        globais.flappyBird.pula();
    },

    atualiza() {
        globais.flappyBird.atualiza();
    },
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames = frames + 1;
    requestAnimationFrame(loop);
};

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    };
});

mudaParaTela(telas.INICIO);
loop();