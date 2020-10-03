let core; // ゲームのコアオブジェクト
// 画像や音声データ
let assets = [
  "images/yazirusi.png",
  // 背景
  "images/back_space.png",
  // 自機
  "images/soldier.png",
  // 敵機
  "images/butterfly.png",
  "images/soldier1.png",
  "images/asteroid.png",
  "images/stone.png",
  // アイテム
  "images/item.png",
  // ボス
  "images/xe_boss.png",
  "images/laser.png",
  // 弾
  "images/beam.png",
  "images/xe_bullet_p.png",
  "images/xe_bullet_r.png",
  // 爆発
  "images/bomb.png",
  // 音
  "sounds/shot.mp3",
  "sounds/coin.mp3",
  "sounds/bomb.mp3",
  "sounds/no.mp3"
];

let scenes = {};  // シーンをまとめるためのオブジェクト
let scoreManager; // スコアを管理するオブジェクト
let objWrapper; // ゲームオブジェクトを包むためのもの
let player; // 主人公
