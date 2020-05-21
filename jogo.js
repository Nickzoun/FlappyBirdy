const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

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
        sptriteY: 0,
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
            if (fazColisao(flappyBird, chao)) {
                console.log("fez colisão");
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(telas.INICIO)
                }, 500);
                return;
            };
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
        },
    
        desenha() {
            contexto.drawImage(
    
                sprites,
                flappyBird.spriteX, flappyBird.sptriteY, //sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, //tamanho do recorte
                flappyBird.x, flappyBird.y, //posição dentro do canvas 
                flappyBird.largura, flappyBird.altura  //tamanho dentro do canvas
            );
        },
    };

    return flappyBird;
};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

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
        },

        desenha() {
            planoFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            telaInicio.desenha();
        },

        click() {
            mudaParaTela(telas.JOGO);
        },

        atualiza() {

        },
    },
};

telas.JOGO = {
    desenha() {
        planoFundo.desenha();
        chao.desenha();
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

    requestAnimationFrame(loop);

};

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    };
});

mudaParaTela(telas.INICIO);
loop();