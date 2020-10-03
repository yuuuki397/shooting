enchant.ObjWrapper = enchant.Class.create(enchant.Group, {
  /**
   * オブジェクトを包むクラス
   * 一括管理することで削除などを容易にする
   * 敵を作るするのもこのクラスが担うことで特殊な作り方でも簡単にできるようにする
   *
   * @example
   * let objWrapper = new ObjWrapper();
   * objWrapper.create.boss();
   * objWrapper.delete.all();
   */
  initialize: function() {
    enchant.Group.call(this);

    core.currentScene.addChild(this);
  },
  /**
   * オブジェクトを作るメソッドを提供する
   * @type {Object}
   *
   * @example
   * objWrapper.create.boss();
   * objWrapper.create.item();
   */
  create: {
    get: function() {
      let _this = this;
      return {
        /**
         * ボスを作る
         * @return {enchant.Boss} 作ったボス
         */
        boss: function() {
          let boss = new Boss();
          _this.addChild(boss);
          return boss;
        },
        /**
         * ボスのビームを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.Group} 作ったボスのビームのグループ
         */
        bossBeam: function(x, y) {
          let beams = new Group();
          _this.addChild(beams);
          beams.addChild(new BossBeam(x, y, -100));
          beams.addChild(new BossBeam(x, y, 0));
          beams.addChild(new BossBeam(x, y, 100));
          return beams;
        },
        /**
         * ボスのレーザーを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.Group} 作ったボスのレーザーのグループ
         */
        bossLaser: function(x, y) {
          let lasers = new Group();
          _this.addChild(lasers);
          lasers.addChild(new BossLaser(x, y, -1));
          lasers.addChild(new BossLaser(x, y, 1));
          return lasers;
        },
        /**
         * アイテム入りのアステロイドを作る
         * @return {enchant.ItemAsteroid} 作ったアイテム入りのアステロイド
         */
        itemAsteroid: function() {
          let itemAsteroid = new ItemAsteroid();
          _this.addChild(itemAsteroid);
          return itemAsteroid;
        },
        /**
         * 爆発するアステロイドを作る
         * @return {enchant.ItemAsteroid} 作った爆発するアステロイド
         */
        bombAsteroid: function() {
          let bombAsteroid = new BombAsteroid();
          _this.addChild(bombAsteroid);
          return bombAsteroid;
        },
        /**
         * アイテムを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.Item} 作ったアイテム
         */
        item: function(x, y) {
          let item = new Item(x, y);
          _this.addChild(item);
          return item;
        },
        /**
         * 戦闘機を作る
         * @return {enchant.Soldier} 作った戦闘機
         */
        soldier: function() {
          let soldier = new Soldier();
          _this.addChild(soldier);
          return soldier;
        },
        /**
         * 右へ向かうバタフライを作る
         * @param  {Number} [n=1] 作るキャラ数
         * @return {enchant.Group} 作ったバタフライのグループ
         */
        rightButterfly: function(n = 1) {
          let butterflys = new Group();
          _this.addChild(butterflys);
          let timer = _this.create.timer();

          for (let i = 0; i < n; i++) {
            timer.tl
              .delay(16 * 1.5)
              .then(function() {
                let butterfly = new Butterfly("toright");
                butterflys.addChild(butterfly);
              });
          }

          return butterflys;
        },
        /**
         * 左へ向かうバタフライを作る
         * @param  {Number} [n=1] 作るキャラ数
         * @return {enchant.Group} 作ったバタフライのグループ
         */
        leftButterfly: function(n = 1) {
          let butterflys = new Group();
          _this.addChild(butterflys);

          for (let i = 0; i < n; i++) {
            butterflys.tl
              .delay(16 * 1.5)
              .then(function() {
                let butterfly = new Butterfly("toleft");
                butterflys.addChild(butterfly);
              });
          }

          return butterflys;
        },
        /**
         * バタフライのビームを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.ButterflyBeam} 作ったバタフライのビーム
         */
        butterflyBeam: function(x, y) {
          let ball = new ButterflyBeam(x, y);
          _this.addChild(ball);
          return ball;
        },
        /**
         * ストーンを作る
         * @param  {Number} h 水平方向の作るキャラ数
         * @param  {Number} v 垂直方向の作るキャラ数
         * @return {enchant.Group} 作ったストーンのグループ
         */
        stone: function(h, v) {

          let stones = new Group();
          _this.addChild(stones);

          for (let i = 0; i < h; i++) {
            for (let j = 0; j < v; j++) {
              stones.addChild(new Stone(i, j));
            }
          }

          return stones;
        },
        /**
         * 爆発を作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.Bomb} 作った爆発
         */
        bomb: function(x, y) {
          let bomb = new Bomb(x, y);
          _this.addChild(bomb);
          return bomb;
        },
        /**
         * プレイヤーのビームを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.PlayerBeam} 作ったプレイヤーのビーム
         */
        playerBeam: function(x, y) {
          let beam = new PlayerBeam(x, y);
          _this.addChild(beam);
          return beam;
        },
        /**
         * アステロイドのビームを作る
         * @param  {Number} x x座標
         * @param  {Number} y y座標
         * @return {enchant.Group} 作ったアステロイドのビームのグループ
         */
        asteroidBeam: function(x, y) {
          let beams = new Group();
          _this.addChild(beams);
          for (let i = 0; i < 360; i += 45) {
            beams.addChild(new AsteroidBeam(x, y, i));
          }

          return beams;
        },
        /**
         * ゲームクリア画面を作る
         * @return {enchant.Result} 作ったゲームクリア画面
         */
        gameclearResult: function() {
          let result = new Result("STAGE CLEAR", "restart");
          _this.addChild(result);
          return result;
        },
        /**
         * ゲームオーバー画面を作る
         * @return {enchant.Result} 作ったゲームオーバー画面
         */
        gameoverResult: function() {
          let result = new Result("GAME OVER", "retry");
          _this.addChild(result);
          return result;
        },
        /**
         * タイマーを作る
         * @return {enchant.Timer} 作ったタイマー
         */
        timer: function() {
          let timer = new Timer();
          _this.addChild(timer);
          return timer;
        }
      };
    }
  },
  /**
   * このクラスで作ったものを削除するメソッドを提供する
   * @type {Object}
   *
   * @example
   * objWrapper.delete.byTag("Enemy", "Item");
   * objWrapper.delete.all();
   */
  delete: {
    get: function() {
      let _this = this;
      return {
        /**
         * タグに一致したものを削除する
         * @param  {String[]} tags タグの配列
         *
         * @example
         * const tags = ["Enemy", "Item"];
         * objWrapper.delete.tags(tags);
         */
        byTag: function(...tags) {
          _this._childDeepAccess(function(node) {
            if (tags.includes(node.tag)) {
              node.remove();
            }
          });
        },
        /**
         * すべて削除する
         */
        all: function() {
          _this._childDeepAccess(function(node) {
            node.remove();
          });
        },
        /**
         * instanceofで一致するものを削除する
         * @param  {Function[]} constructors constructorの配列
         *
         * @example
         * const constructors = [enchant.Enemy, enchant.Item];
         * objWrapper.delete.byInstanceof(constructors);
         */
        byInstanceof: function(...constructors) {
          if (constructors == undefined) return;
          _this._childDeepAccess(function(node) {
            constructors.forEach(constructor => {
              if (node instanceof constructor) {
                node.remove();
              }
            });
          });
        },
        /**
         * 条件に一致したものを削除する
         * @param  {Function} conditions 条件の関数
         *
         * @example
         * function myFunc(node) {
         *   if (node.hp <= 0) {
         *     return true;
         *   }
         *   return false;
         * }
         * objWrapper.delete.byConditions(myFunc);
         */
        byConditions: function(conditions) {
          if (typeof(conditions) != "function") return;
          _this._childDeepAccess(function(node) {
            if (conditions(node)) {
              node.remove();
            }
          });
        }
      };
    }
  },
  /**
   * このクラスの直属の子ノードにアクセスをする
   * @param  {Function} func アクセスしたノードに実行させる関数
   */
  _childShallowAccess: function(func) {
    this._nodeShallowAccess(this, func);
  },
  /**
   * このクラスの全ての子ノードにアクセスする
   * @param  {Function} func アクセスしたノードに実行させる関数
   */
  _childDeepAccess: function(func) {
    this._nodeChildDeepAccess(this, func);
  },
  /**
   * nodeの直属の子ノードにアクセスをする
   * @param  {enchant.Group} node アクセスしていくもの
   * @param  {Function} func アクセスしたノードに実行させる関数
   */
  _nodeChildShallowAccess: function(node, func) {
    if (node == undefined) return;
    if (typeof(func) != "function") return;
    if (node.childNodes == undefined) return;
    // 昇順にすると子要素が削除された際に不具合が生じるため降順にしている
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      func(node.childNodes[i]);
    }
  },
  /**
   * nodeの全ての子ノードにアクセスをする
   * 再帰的に実行している
   * @param  {enchant.Group} node アクセスしていくもの
   * @param  {Function} func アクセスしたノードに実行させる関数
   */
  _nodeChildDeepAccess: function(node, func) {
    if (node == undefined) return;
    if (typeof(func) != "function") return;
    if (node.childNodes == undefined) return;
    // 昇順にすると子要素が削除された際に不具合が生じるため降順にしている
    for (let i = node.childNodes.length - 1; i >= 0; i--) {
      this._nodeChildDeepAccess(node.childNodes[i], func);
      func(node.childNodes[i]);
    }
  }
});

enchant.ScoreManager = enchant.Class.create(enchant.EventTarget, {
  /**
   * Scoreを管理するクラス
   * スコアの値を変更した際に表示もしてくれる
   * ハイスコアの更新もこのクラスが管理する
   */
  initialize: function() {
    enchant.EventTarget.call(this);

    this._score = 0;
    this._highScore = 0;
    this.highScoreUpdate();
  },
  /**
   * スコア表示用
   * @type {enchant.Score}
   */
  scoreText: {
    set: function(scoreText) {
      this._scoreText = scoreText;
    },
    get: function() {
      return this._scoreText;
    }
  },
  /**
   * ハイスコア表示用
   * @type {enchant.Score}
   */
  highScoreText: {
    set: function(highScoreText) {
      this._highScoreText = highScoreText;
    },
    get: function() {
      return this._highScoreText;
    }
  },
  /**
   * スコアの値
   * @type {Number}
   */
  score: {
    set: function(score) {
      this._score = score;
      this.scoreText.value = score;
    },
    get: function() {
      if (this.scoreText != null) {
        this._score = this.scoreText.value;
      }
      return Number(this._score);
    }
  },
  /**
   * ハイスコアの値
   * @type {Number}
   */
  highScore: {
    set: function(score) {
      this._highScore = score;
      this.highScoreText.value = score;
    },
    get: function() {
      if (this.highScoreText != null) {
        this._highScore = this.highScoreText.value;
      }
      return Number(this._highScore);
    }
  },
  /**
   * ハイスコアの更新をする
   */
  highScoreUpdate: function() {
    if (this.highScore < this.score) {
      this.highScore = this.score;
      localStorage.setItem("HighScore", this.highScore);
    }
  }
});

enchant.Score = enchant.Class.create(enchant.Group, {
  /**
   * Scoreの表示用クラス
   * どのようなスコアかのタイトルとスコアの値が表示される
   * @param  {Number} title スコアのタイトル（"ハイスコア"など）
   * @param  {Number} score スコアの初期値
   */
  initialize: function(title, score) {
    enchant.Group.call(this);

    core.currentScene.addChild(this);

    this.scoreText = new Label(title);
    this.scoreText.color = "white";
    this.scoreText.font = "24px 'PixelMplus10'";
    this.addChild(this.scoreText);
    this.scoreText.x = 5;
    this.scoreText.y = 0;
    this.scoreText.width = this.scene.width - 10;

    this.scoreValue = new Label();
    this.scoreValue.color = "white";
    this.scoreValue.font = "24px 'PixelMplus10'";
    this.addChild(this.scoreValue);
    this.scoreValue.x = 5;
    this.scoreValue.y = 24;
    this.scoreValue.text = score || 0;
    this.scoreValue.width = this.scene.width - 10;
  },
  /**
   * 水平位置の指定（CSSの'text-align'プロパティと同様の形式で指定できる）
   * @type {String}
   */
  textAlign: {
    set: function(str) {
      this.scoreText.textAlign = str;
      this.scoreValue.textAlign = str;
    }
  },
  /**
   * スコアの値
   * @type {Number}
   */
  value: {
    set: function(value) {
      this.scoreValue.text = value;
    },
    get: function() {
      return this.scoreValue.text;
    }
  }
});

enchant.Player = enchant.Class.create(enchant.Sprite, {
  /**
   * プレイヤーのクラス
   * 画像の表示や操縦、弾の発射などを内部でやってくれる
   */
  initialize: function() {
    enchant.Sprite.call(this, 32, 32);

    this.scene = core.currentScene;
    let _this = this;
    let positionX;
    let positionY;

    this.image = core.assets["images/soldier.png"];
    this.centerX = this.scene.width / 2;
    this.y = 400;
    this.mode = 0;
    this.scene.addChild(this);

    // 自機の操縦
    this.scene.addEventListener(Event.TOUCH_START, function(e) {
      positionX = _this.x - e.x;
      positionY = _this.y - e.y;
    });
    this.scene.addEventListener(Event.TOUCH_MOVE, function(e) {
      _this.x = positionX + e.x;
      _this.y = positionY + e.y;
    });
    // 弾の発射
    this.tl.delay(10)
      .then(function() {
        this.shot();
      })
      .loop();

    // 衝突処理
    this.addCollision(this.scene);
    this.addEventListener(Event.COLLISION, function(e) {
      if (e.collision.target.tag == "Item") {
        e.collision.target.remove();
        let sound = core.assets["sounds/coin.mp3"].clone();
        sound.play();
        this.powerUp();
      }

      if (e.collision.target.tag == "Enemy") {
        this.damage();
      }
    });

    // やられたときの処理
    this.addEventListener("KILL", function() {
      objWrapper.create.bomb(this.centerX, this.centerY);
      this.remove();
      objWrapper.delete.byTag("Enemy", "Item", "Timer");
      objWrapper.create.gameoverResult();
    });
  },
  /**
   * プレイヤーのモードの選択
   * @type {Number}
   */
  mode: {
    set: function(mode) {
      this._mode = mode;
      this.frame = [mode];
    },
    get: function() {
      return this._mode;
    }
  },
  /**
   * プレイヤーのパワーアップ
   */
  powerUp: function() {
    if (this.mode < 3) {
      this.mode++;
    }
  },
  /**
   * プレイヤーのパワーダウン
   */
  powerDown: function() {
    if (this.mode > 0) {
      this.mode--;
    }
  },
  /**
   * プレイヤーがダメージを受けたときの処理
   * 透明にして、一時的に衝突判定を消したりする
   */
  damage: function() {
    let _this = this;
    if (this.mode > 0) {
      let sound = core.assets["sounds/no.mp3"].clone();
      sound.play();
      this.powerDown();
      this.removeCollision(this.scene);
      this.opacity = 0.5;

      let timer = objWrapper.create.timer();
      timer.tl.delay(16 * 3)
        .then(function() {
          _this.opacity = 1;
          _this.addCollision(_this.scene)
        });
    } else {
      this.dispatchEvent(new enchant.Event("KILL"));
    }
  },
  /**
   * プレイヤーの弾を発射する処理
   * プレイヤーのモードによって発射する弾を変える
   */
  shot: function() {
    let sound = core.assets["sounds/shot.mp3"].clone();
    switch (this.mode) {
      case 0:
        sound.play();
        objWrapper.create.playerBeam(this.centerX, this.y);
        break;
      case 1:
        sound.play();
        objWrapper.create.playerBeam(this.centerX - 8, this.y);
        objWrapper.create.playerBeam(this.centerX + 8, this.y);
        break;
      case 2:
        sound.play();
        objWrapper.create.playerBeam(this.centerX - 8, this.y);
        objWrapper.create.playerBeam(this.centerX, this.y);
        objWrapper.create.playerBeam(this.centerX + 8, this.y);
        break;
      case 3:
        sound.play();
        objWrapper.create.playerBeam(this.centerX - 14, this.y);
        objWrapper.create.playerBeam(this.centerX - 7, this.y);
        objWrapper.create.playerBeam(this.centerX, this.y);
        objWrapper.create.playerBeam(this.centerX + 7, this.y);
        objWrapper.create.playerBeam(this.centerX + 14, this.y);
        break;
      default:
        break;
    }
  }
});

enchant.PlayerBeam = enchant.Class.create(enchant.Sprite, {
  /**
   * プレイヤーのビームクラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   */
  initialize: function(x, y) {
    enchant.Sprite.call(this, 4, 16);

    this.image = core.assets["images/beam.png"];
    this.centerX = x;
    this.y = y;
    this.tag = "PlayerAttack";
    core.currentScene.addChild(this);
    this.tl.moveBy(0, -core.currentScene.height, 20);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.Background = enchant.Class.create(enchant.Sprite, {
  /**
   * 背景クラス
   * 自動的にスクロールしてくれる
   */
  initialize: function() {
    enchant.Sprite.call(this, 320, 2400);

    this.scene = core.currentScene;

    this.image = core.assets["images/back_space.png"];
    this.x = 0;
    this.y = -this.height + this.scene.height;
    this.scene.addChild(this);
    this.tl.moveBy(0, this.height - this.scene.height, 16 * 60 /*960F*/ );
  }
});

enchant.Enemy = enchant.Class.create(enchant.Sprite, {
  /**
   * 敵の基底クラス
   * ダメージを食らったり、やられたときのイベントを発行してくれる
   * 直接使用することはない
   * @param  {Number} width  横幅
   * @param  {Number} height 縦幅
   */
  initialize: function(width, height) {
    enchant.Sprite.call(this, width, height);

    this.hp = 1;
    this.scene = core.currentScene;
    this.tag = "Enemy";
    this.isKilled = false;
    this.addCollision(this.scene);
    this.addEventListener(Event.COLLISION, function(e) {
      if (this.isKilled == true) return;
      if (e.collision.target.tag == "PlayerAttack") {
        this.hp--;
        if (this.hp > 0) {
          this.dispatchEvent(new enchant.Event("DAMAGE"));
        } else {
          this.isKilled = true;
          this.dispatchEvent(new enchant.Event("KILL"));
        }
      }
    });
  }
});

enchant.Bomb = enchant.Class.create(enchant.Sprite, {
  /**
   * 爆発クラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   */
  initialize: function(x, y) {
    enchant.Sprite.call(this, 32, 32);

    let sound_bomb = core.assets["sounds/bomb.mp3"].clone();
    sound_bomb.play();

    this.image = core.assets["images/bomb.png"];
    this.centerX = x;
    this.centerY = y;
    this.tag = "Bomb";
    this.frame = [0, 1, 2, 3, 4, null];
    core.currentScene.addChild(this);
    this.scale(3, 3);

    this.addEventListener(Event.ANIMATION_END, function() {
      this.remove();
    });
  }
});

enchant.Result = enchant.Class.create(enchant.Group, {
  /**
   * 結果画面表示クラス
   * @param  {String} resultStr  結果の文字列（"ゲームオーバー"など）
   * @param  {String} restartStr リスタートボタンの文字列（"リトライ"など）
   */
  initialize: function(resultStr, restartStr) {
    enchant.Group.call(this);

    core.currentScene.addChild(this);

    scoreManager.highScoreUpdate();

    // 結果表示
    let resultText = new Label(resultStr);
    resultText.color = 'white';
    resultText.font = "32px 'PixelMplus10'";
    resultText.y = 140;
    resultText.width = this.scene.width;
    resultText.textAlign = "center";
    this.addChild(resultText);

    // スコア表示
    let scoreLabel = new Label();
    scoreLabel.color = "white";
    scoreLabel.font = "32px 'PixelMplus10'";
    this.addChild(scoreLabel);
    scoreLabel.text = scoreManager.score;
    scoreLabel.y = 200;
    scoreLabel.width = this.scene.width;
    scoreLabel.textAlign = "center";

    // リスタート
    let restart = new Label(restartStr);
    restart.color = "white";
    restart.font = "32px 'PixelMplus10'";
    this.addChild(restart);
    restart.x = 40;
    restart.y = 300;
    restart.addEventListener(Event.TOUCH_START, function() {
      scenes.mainScene();
    });

    // タイトル
    let title = new Label("title");
    title.color = "white";
    title.font = "32px 'PixelMplus10'";
    this.addChild(title);
    title.x = 200;
    title.y = 300;
    title.addEventListener(Event.TOUCH_START, function() {
      scenes.titleScene();
    });
  }
});

enchant.Boss = enchant.Class.create(enchant.Enemy, {
  /**
   * ボスのクラス
   * このキャラがやられたときにゲームクリアーとなる
   */
  initialize: function() {
    enchant.Enemy.call(this, 172, 72);

    this.image = core.assets["images/xe_boss.png"];
    this.centerX = this.scene.width / 2;
    this.y = -this.height;
    this.hp = 200;
    this.scene.addChild(this);

    // 登場
    this.tl.moveBy(0, this.height + 50, 50);

    this.tl.then(function() {
      let _this = this;
      this.tl.then(function() {
        this.tl.moveBy(-25, 0, 25, enchant.Easing.SIN_EASEIN)
          .moveBy(-25, 0, 25, enchant.Easing.SIN_EASEOUT)
          .moveBy(25, 0, 25, enchant.Easing.SIN_EASEIN)
          .moveBy(25, 0, 25, enchant.Easing.SIN_EASEOUT)
          .moveBy(25, 0, 25, enchant.Easing.SIN_EASEIN)
          .moveBy(25, 0, 25, enchant.Easing.SIN_EASEOUT)
          .moveBy(-25, 0, 25, enchant.Easing.SIN_EASEIN)
          .moveBy(-25, 0, 25, enchant.Easing.SIN_EASEOUT);
      });
      this.tl.then(function() {
        this.tl.loop();
      });

      let laserTimer = objWrapper.create.timer();
      laserTimer.tl
        .delay(50)
        .then(function() {
          _this.laser();
        })
        .loop();

      let beamTimer = objWrapper.create.timer();
      beamTimer.tl
        .delay(25)
        .then(function() {
          _this.beam();
        })
        .delay(25)
        .loop();

      let bombAsteroidTimer = objWrapper.create.timer();
      bombAsteroidTimer.tl
        .delay(25)
        .then(function() {
          _this.bombAsteroid();
        })
        .delay(75)
        .loop();

      let butterflyTimer = objWrapper.create.timer();
      butterflyTimer.tl
        .delay(175)
        .then(function() {
          _this.butterfly();
        })
        .delay(25)
        .loop();

      let soldierTimer = objWrapper.create.timer();
      soldierTimer.tl
        .delay(200)
        .then(function() {
          _this.soldier();
        })
        .loop();

      let itemAsteroidTimer = objWrapper.create.timer();
      itemAsteroidTimer.tl
        .delay(50)
        .then(function() {
          _this.itemAsteroid();
        })
        .delay(150)
        .loop();
    });

    this.addEventListener("KILL", function() {
      objWrapper.create.bomb(this.centerX, this.centerY);
      scoreManager.score += 1000;
      this.scene.clearEventListener();
      player.removeCollision(player.scene);
      objWrapper.delete.byTag("Enemy", "Item", "Timer");

      player.tl.unloop();

      player.tl.delay(20);
      player.tl.moveTo(player.x, -100, 30, enchant.Easing.BACK_EASEIN);
      player.tl.then(function() {
        scoreManager.score += 500 * player.mode;
      });
      player.tl.delay(10);
      player.tl.then(function() {
        player.remove();
        objWrapper.create.gameclearResult();
      });

      this.remove();
    });
  },
  /**
   * レーザーを放つ
   */
  laser: function() {
    objWrapper.create.bossLaser(this.centerX, this.centerY);
  },
  /**
   * ビームを放つ
   */
  beam: function() {
    objWrapper.create.bossBeam(this.centerX, this.y + this.height);
  },
  /**
   * バタフライを召喚する
   * 3分の1の確率で召喚しない
   */
  butterfly: function() {
    let r = getRandom(0, 2);  // 0:toleft 1:toright 2:none
    if (r == 0) objWrapper.create.leftButterfly();
    else if (r == 1) objWrapper.create.rightButterfly();
  },
  /**
   * 戦闘機を召喚する
   * 10分の7の確率で召喚しない
   */
  soldier: function() {
    let r = getRandom(1, 10); // 1~3:召喚 4~10:none
    if (r <= 3) objWrapper.create.soldier();
  },
  /**
   * アイテムアステロイドを召喚する
   * 10分の1で召喚しない
   */
  itemAsteroid: function() {
    let r = getRandom(1, 10); // 1~9:召喚 10:none
    if (r <= 9) objWrapper.create.itemAsteroid();
  },
  /**
   * ボムアステロイドを召喚する
   */
  bombAsteroid: function() {
    objWrapper.create.bombAsteroid();
  }

});

enchant.BossLaser = enchant.Class.create(enchant.Enemy, {
  /**
   * ボスのレーザークラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   * @param  {Number} side どっち側のビームか side<0:左側 side>=0:右側
   */
  initialize: function(x, y, side) {
    enchant.Enemy.call(this, 24, 64);

    this.image = core.assets["images/laser.png"];
    if (side < 0) {
      this.centerX = x - 68;
    } else {
      this.centerX = x + 68;
    }
    this.y = y;
    this.scene.addChild(this);
    this.tl.moveBy(0, this.scene.height, 50);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.BossBeam = enchant.Class.create(enchant.Enemy, {
  /**
   * ボスのビームクラス
   * @param  {Number} x  x座標
   * @param  {Number} y  y座標
   * @param  {Number} dx 移動するx座標
   */
  initialize: function(x, y, dx) {
    enchant.Enemy.call(this, 9, 9);

    this.image = core.assets["images/xe_bullet_p.png"];
    this.centerX = x;
    this.centerY = y;
    this.scene.addChild(this);
    this.tl.moveBy(dx, this.scene.height, 100);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.Asteroid = enchant.Class.create(enchant.Enemy, {
  /**
   * アステロイドの基底クラス
   * 降ってくる動作とやられたときの爆発をしてくれる
   * 直接使用することはない
   */
  initialize: function() {
    enchant.Enemy.call(this, 64, 64);

    this.image = core.assets["images/asteroid.png"];
    this.scene.addChild(this);
    this.x = getRandom(0, this.scene.width - this.width);
    this.y = -100;
    this.tl.scaleTo(0.75, 0.75, 0);
    this.tl.moveBy(0, 600, 16 * 4)
      .and()
      .rotateBy(360 * 2, 16 * 6);
    this.addCollision(this.scene);
    this.addEventListener("KILL", function(e) {
      objWrapper.create.bomb(this.centerX, this.centerY);

      this.remove();
      scoreManager.score += 10;
    });
  }
});

enchant.BombAsteroid = enchant.Class.create(enchant.Asteroid, {
  /**
   * ボムアステロイドのクラス
   */
  initialize: function() {
    enchant.Asteroid.call(this);

    this.addEventListener("KILL", function() {
      objWrapper.create.asteroidBeam(this.centerX, this.centerY);
    });
  }
});

enchant.AsteroidBeam = enchant.Class.create(enchant.Enemy, {
  /**
   * アステロイドのビームクラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   * @param  {Number} d 角度（度数法）
   */
  initialize: function(x, y, d) {
    enchant.Enemy.call(this, 9, 9);

    this.image = core.assets["images/xe_bullet_r.png"];
    this.centerX = x;
    this.centerY = y;
    this.scene.addChild(this);

    let moveZ = 500;
    let moveX = moveZ * Math.cos(Math.PI * d / 180);
    let moveY = moveZ * Math.sin(Math.PI * d / 180);

    this.tl.moveBy(moveX, moveY, 16 * 5);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.ItemAsteroid = enchant.Class.create(enchant.Asteroid, {
  /**
   * アイテムアステロイドのクラス
   */
  initialize: function() {
    enchant.Asteroid.call(this);

    this.addEventListener("KILL", function() {
      objWrapper.create.item(this.centerX, this.centerY);
    });
  }
});

enchant.Item = enchant.Class.create(enchant.Sprite, {
  /**
   * アイテムのクラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   */
  initialize: function(x, y) {
    enchant.Sprite.call(this, 32, 32);

    this.image = core.assets["images/item.png"];
    this.centerX = x;
    this.centerY = y;
    this.tag = "Item";
    core.currentScene.addChild(this);
    this.tl.moveBy(0, 640, 16 * 10)
      .and()
      .rotateBy(360 * 10, 16 * 10);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.Soldier = enchant.Class.create(enchant.Enemy, {
  /**
   * 戦闘機のクラス
   */
  initialize: function() {
    enchant.Enemy.call(this, 32, 32);

    let _this = this;

    this.image = core.assets["images/soldier1.png"];
    this.scene.addChild(this);
    this.rotation = 180;
    this.addEventListener("KILL", function() {
      objWrapper.create.bomb(this.centerX, this.centerY);
      this.remove();
      scoreManager.score += 30;
    });
    this.x = getRandom(0, this.scene.width - this.width);
    this.y = -32;
    this.tl.moveBy(0, this.scene.height + 32 * 3, 16);
    this.tl.moveTo(getRandom(0, this.scene.width - this.width), 480 + 32 * 3, 16);

    this.tl.then(function() {
      let timer = objWrapper.create.timer();
      timer.tl.delay(16)
        .then(function() {
          _this.tl.moveTo(player.x, player.y, 8);
        })
        .loop();
    });
  }
});

enchant.Butterfly = enchant.Class.create(enchant.Enemy, {
  /**
   * バタフライのクラス
   * @param  {String} [direction="toright"] 向かっていく方向
   */
  initialize: function(direction = "toright") {
    enchant.Enemy.call(this, 32, 32);

    let d = 1;
    if (direction == "toleft") {
      d = -1;
    }

    this.image = core.assets["images/butterfly.png"];
    this.scene.addChild(this);
    this.frame = [0, 1, 2];
    this.addEventListener("KILL", function() {
      objWrapper.create.bomb(this.centerX, this.centerY);
      this.remove();
      scoreManager.score += 50;
    });
    // 移動
    if (d == 1) {
      this.x = -this.width;
    } else {
      this.x = this.scene.width + this.width;
    }
    this.y = this.scene.height / 10;

    this.tl.moveBy(32 * d, 32, 16);
    this.tl.then(function() {
      this.shot();
    });
    this.tl.moveBy(32 * d, -32, 16);
    this.tl.then(function() {
      this.shot();
    });
    this.tl.loop();

    if (d == 1) {
      this.addEventListener(Event.ENTER_FRAME, function() {
        if (this.x > this.scene.width + this.width) {
          this.tl.clear();
          this.remove();
        }
      });
    } else {
      this.addEventListener(Event.ENTER_FRAME, function() {
        if (this.x < -this.width) {
          this.tl.clear();
          this.remove();
        }
      });
    }
  },
  /**
   * 弾を発射する
   */
  shot: function() {
    objWrapper.create.butterflyBeam(this.centerX, this.centerY);
  }
});

enchant.ButterflyBeam = enchant.Class.create(enchant.Enemy, {
  /**
   * バタフライのビームクラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   */
  initialize: function(x, y) {
    enchant.Enemy.call(this, 9, 9);

    this.image = core.assets["images/xe_bullet_r.png"];
    this.centerX = x;
    this.centerY = y;
    this.scene.addChild(this);
    this.tl.moveTo(player.centerX, player.centerY, 16);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.Stone = enchant.Class.create(enchant.Enemy, {
  /**
   * ストーンのクラス
   * @param  {Number} x x座標
   * @param  {Number} y y座標
   */
  initialize: function(x, y) {
    enchant.Enemy.call(this, 16, 16);

    this.x = -64 + x * 8;
    this.y = 32 + y * 8;
    this.scale(0.5, 0.5);
    this.image = core.assets["images/stone.png"];
    this.scene.addChild(this);
    this.addEventListener("KILL", function() {
      objWrapper.create.bomb(this.centerX, this.centerY);
      this.remove();
      scoreManager.score += 10;
    });

    this.tl.moveBy(this.scene.width + 64, 0, 16 * 2);
    this.tl.then(function() {
      this.x = getRandom(0, this.scene.width - this.width);
      this.y = getRandom(-64, 0);
    });
    this.tl.delay(16);
    this.tl.moveBy(0, this.scene.height + 128, 16 * 2);
    this.tl.then(function() {
      this.remove();
    });
  }
});

enchant.Timer = enchant.Class.create(enchant.Node, {
  /**
   * タイマーのクラス
   * Timelineを手軽に使いたい時に使う
   * インスタンスを作ったらすぐにTimelineを使えるようになる
   *
   * @example
   * let timer = new Timer();
   * timer.tl
   *   .delay(16)
   *   .then(function() {
   *     console.log("hello");
   *   });
   */
  initialize: function() {
    enchant.Node.call(this);

    core.currentScene.addChild(this);
    this.tag = "Timer";
  }
})
