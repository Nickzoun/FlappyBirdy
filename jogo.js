console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
    spriteX: 0,
    sptriteY: 0,
    largura: 34,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,

    atualiza (){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;

    },

    desenha (){
        contexto.drawImage(

            sprites, 
            flappyBird.spriteX, flappyBird.sptriteY, //sprite X, Sprite Y
            flappyBird.largura, flappyBird.altura, //tamanho do recorte
            flappyBird.x, flappyBird.y, //posição dentro do canvas 
            flappyBird.largura, flappyBird.altura  //tamanho dentro do canvas
        );
    },
};

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,

    desenha (){
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
        contexto.fillRect(0,0, canvas.width, canvas.height);

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

const TelaDeInicio = {
    spriteX: 134,
    spriteY: 0,
    largura: 175,
    altura: 152,
    x: (canvas.width / 2) - 175 / 2,
    y: 50,

    desenha() {
        contexto.drawImage(
            sprites,
            TelaDeInicio.spriteX, TelaDeInicio.spriteY,
            TelaDeInicio.largura, TelaDeInicio.altura,
            TelaDeInicio.x, TelaDeInicio.y,
            TelaDeInicio.largura, TelaDeInicio.altura,
        );
    },
};

function loop() {
    flappyBird.atualiza();

    TelaDeInicio.desenha();
    planoFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop);

};

loop();