import "../bin/libs/min/laya.core.min";
import "../bin/libs/min/laya.ui.min";
import "../bin/libs/min/laya.webgl.min";
import "../bin/libs/min/laya.wxmini.min";
import Sprite = Laya.Sprite
import Box = Laya.Box;
import Image = Laya.Image;
import Event = Laya.Event;
import WebGL = Laya.WebGL;
import Handler = Laya.Handler;
import Stage = Laya.Stage;
import Text = Laya.Text;
import Tween = Laya.Tween;
import Stat = Laya.Stat;
import Utils = Laya.Utils;
import MiniAdpter = Laya.MiniAdpter;
import Texture = Laya.Texture;
import Browser = Laya.Browser;
const wx = (window as any)["wx"];
export { Sprite, Event, WebGL, Handler, Stage, Text, Tween, Stat, Utils, MiniAdpter, Box, Image, wx, Texture, Browser }