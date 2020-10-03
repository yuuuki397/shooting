/**
 * メインのゲーム画面
 */
scenes.mainScene = function() {
  // ゲーム画面の置き換え
  let scene = new Scene();
  core.replaceScene(scene);

  // ゲームオブジェクトの宣言
  let background = new Background();
  scoreManager = new ScoreManager();
  objWrapper = new ObjWrapper();
  player = new Player();

  // スコアの設定
  let highScore = localStorage.getItem("HighScore");
  scoreManager.scoreText = new Score("SCORE", 0);
  scoreManager.scoreText.textAlign = "left";
  scoreManager.highScoreText = new Score("HIGHSCORE", highScore);
  scoreManager.highScoreText.textAlign = "right";

  // ステージの構成
  let stageTimer = objWrapper.create.timer();
  stageTimer.tl.cue({
    48: function() {
      objWrapper.create.bombAsteroid();
    },
    64: function() {
      objWrapper.create.bombAsteroid();
      objWrapper.create.rightButterfly(3);
    },
    96: function() {
      objWrapper.create.soldier();
    },
    144: function() {
      objWrapper.create.itemAsteroid();
    },
    160: function() {
      objWrapper.create.bombAsteroid();
    },
    192: function() {
      objWrapper.create.soldier();
    },
    208: function() {
      objWrapper.create.stone(5, 5);
    },
    288: function() {
      objWrapper.create.rightButterfly(5);
    },
    320: function() {
      objWrapper.create.leftButterfly(5);
    },
    400: function() {
      objWrapper.create.bombAsteroid();
    },
    416: function() {
      objWrapper.create.itemAsteroid();
    },
    480: function() {
      objWrapper.create.soldier();
    },
    504: function() {
      objWrapper.create.bombAsteroid();
    },
    508: function() {
      objWrapper.create.bombAsteroid();
    },
    544: function() {
      objWrapper.create.soldier();
    },
    576: function() {
      objWrapper.create.soldier();
      objWrapper.create.bombAsteroid();
      objWrapper.create.itemAsteroid();
    },
    608: function() {
      objWrapper.create.stone(5, 5);
    },
    672: function() {
      objWrapper.create.rightButterfly(3);
    },
    704: function() {
      objWrapper.create.soldier();
    },
    736: function() {
      objWrapper.create.bombAsteroid();
    },
    768: function() {
      objWrapper.create.bombAsteroid();
      objWrapper.create.bombAsteroid();
      objWrapper.create.bombAsteroid();
      objWrapper.create.bombAsteroid();
    },
    800: function() {
      objWrapper.create.stone(5, 5);
    },
    864: function() {
      objWrapper.create.leftButterfly(3);
    },
    960: function() {
      objWrapper.create.boss();
    }
  });
}

/**
 * タイトル画面
 */
scenes.titleScene = function() {
  let scene = new Scene();
  core.replaceScene(scene);
  core.resume();

  // ゲームオブジェクトの宣言
  let background = new Background();
  objWrapper = new ObjWrapper();
  let player = new Player();

  // 主人公の移動デモ
  player.tl.clear();
  player.tl
    .moveBy(100, 0, 32)
    .moveBy(-100, 0, 32)
    .loop();

  // ビームの発射デモ
  objWrapper.create.timer().tl
    .delay(64)
    .then(function() {
      objWrapper.create.timer().tl
        .delay(10)
        .then(function() {
          player.shot();
        })
        .loop();
    });

  //ゲームタイトル
  let title = new Label("シューティング！");
  title.color = "white";
  title.font = "32px 'PixelMplus10'";
  title.x = 16;
  title.y = 0;
  title.textAlign = "center";
  scene.addChild(title);

  //矢印
  let arrow = new ExSprite(32, 32);
  arrow.image = core.assets["images/yazirusi.png"];
  arrow.x = scene.width / 2 - arrow.width / 2;
  arrow.y = scene.height / 2 - arrow.height / 2;
  scene.addChild(arrow);
  arrow.tl
    .moveBy(100, 0, 32)
    .moveBy(-100, 0, 32)
    .loop();

  // 説明1
  let explanation1 = new Label("画面をドラッグすると");
  explanation1.color = "white";
  explanation1.font = "24px 'PixelMplus10'";
  explanation1.x = 8;
  explanation1.y = 38;
  scene.addChild(explanation1);

  // 説明2
  let explanation2 = new Label("戦闘機が動きます");
  explanation2.color = "white";
  explanation2.font = "24px 'PixelMplus10'";
  explanation2.x = 8;
  explanation2.y = 66;
  scene.addChild(explanation2);

  // 説明3
  objWrapper.create.timer().tl
    .delay(64)
    .then(function() {
      let explanation3 = new Label("弾は自動で発射されます");
      explanation3.color = "white";
      explanation3.font = "24px 'PixelMplus10'";
      explanation3.x = 8;
      explanation3.y = 94;
      scene.addChild(explanation3);
    });

  // 画面タッチでゲームスタート
  scene.on(enchant.Event.TOUCH_START, function() {
    scenes.mainScene();
  });
}

//==========
//EnchantJS
enchant();
window.onload = function() {
  core = new Core(320, 480);
  core.fps = 16;
  core.preload(assets);
  core.onload = function() {
    scenes.titleScene();
  };
  core.start();
  core.pause();
};
