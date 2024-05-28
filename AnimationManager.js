import TWEEN from "https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.6.4/dist/tween.esm.js";
var SlideSide;
(function (SlideSide) {
  SlideSide[(SlideSide["LEFT"] = -5)] = "LEFT";
  SlideSide[(SlideSide["RIGHT"] = 5)] = "RIGHT";
})(SlideSide || (SlideSide = {}));
class AnimationManager {
  constructor() {
    this.initialStates = new Map();
  }
  // Method to add an object and store its initial state
  addObject(object) {
    var _a;
    const material = object.material;
    this.initialStates.set(object, {
      position: object.position.clone(),
      scale: object.scale.clone(),
      opacity: (_a = material.opacity) !== null && _a !== void 0 ? _a : 1,
      rotation: object.rotation.clone(),
    });
  }
  // Method to reset an object's state to its initial state
  resetObject(object) {
    const initialState = this.initialStates.get(object);
    if (initialState) {
      object.position.copy(initialState.position);
      object.scale.copy(initialState.scale);
      object.material.opacity = initialState.opacity;
      object.rotation.copy(initialState.rotation);
    }
  }
  // Method to animate sliding from initial position to target position
  animateSlide(
    object,
    targetPosition,
    duration,
    initialPosition = null,
    slide = SlideSide.RIGHT
  ) {
    var _a;
    this.addObject(object);
    const originalPosition =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.position;
    if (!originalPosition) return;
    const startPosition =
      initialPosition !== null ? initialPosition : originalPosition.x - slide;
    const finalPosition =
      targetPosition !== null ? targetPosition : originalPosition.x;
    object.position.x = startPosition;
    new TWEEN.Tween(object.position)
      .to({ x: finalPosition }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  // Method to animate scaling up
  animateScaleUp(object, scaleFactor, duration, initialScale = null) {
    var _a;
    this.addObject(object);
    const originalScale =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.scale;
    if (!originalScale) return;
    const startScale =
      initialScale !== null ? initialScale : originalScale.x / scaleFactor;
    const finalScale = originalScale.x;
    object.scale.set(startScale, startScale, startScale);
    new TWEEN.Tween(object.scale)
      .to({ x: finalScale, y: finalScale, z: finalScale }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  // Method to animate scaling down
  animateScaleDown(object, scaleFactor, duration, initialScale = null) {
    var _a;
    this.addObject(object);
    const originalScale =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.scale;
    if (!originalScale) return;
    const startScale =
      initialScale !== null ? initialScale : originalScale.x * scaleFactor;
    const finalScale = originalScale.x;
    object.scale.set(startScale, startScale, startScale);
    new TWEEN.Tween(object.scale)
      .to({ x: finalScale, y: finalScale, z: finalScale }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  // Method to animate fading in
  animateFadeIn(object, duration) {
    this.addObject(object);
    const material = object.material;
    material.transparent = true;
    material.opacity = 0;
    new TWEEN.Tween(material)
      .to({ opacity: 1 }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  // Method to animate fading out
  animateFadeOut(object, duration) {
    this.addObject(object);
    const material = object.material;
    material.transparent = true;
    material.opacity = 1;
    new TWEEN.Tween(material)
      .to({ opacity: 0 }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  animateBounce(object, axis = "z", distance, duration) {
    var _a;
    this.addObject(object);
    const originalPosition =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.position;
    if (!originalPosition) return;
    const bounceUp1 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] + distance }, duration / 4)
      .easing(TWEEN.Easing.Quadratic.Out);
    const bounceDown1 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] - distance * 0.1 }, duration / 8)
      .easing(TWEEN.Easing.Quadratic.In);
    const bounceUp2 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] + distance * 0.8 }, duration / 8)
      .easing(TWEEN.Easing.Quadratic.Out);
    const bounceDown2 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] - distance * 0.1 }, duration / 8)
      .easing(TWEEN.Easing.Quadratic.In);
    const bounceUp3 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] + distance * 0.6 }, duration / 8)
      .easing(TWEEN.Easing.Quadratic.Out);
    const bounceDown3 = new TWEEN.Tween(object.position)
      .to({ [axis]: originalPosition[axis] }, duration / 8)
      .easing(TWEEN.Easing.Quadratic.In);
    bounceUp1.chain(bounceDown1);
    bounceDown1.chain(bounceUp2);
    bounceUp2.chain(bounceDown2);
    bounceDown2.chain(bounceUp3);
    bounceUp3.chain(bounceDown3);
    bounceUp1.start();
  }
  // Method to animate sliding up from below the screen to the original position
  animateSlideUp(object, duration, initialPositionY = null) {
    var _a;
    this.addObject(object);
    const originalPosition =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.position;
    if (!originalPosition) return;
    const startPositionY =
      initialPositionY !== null ? initialPositionY : originalPosition.y - 5;
    const finalPositionY = originalPosition.y;
    object.position.y = startPositionY;
    new TWEEN.Tween(object.position)
      .to({ y: finalPositionY }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
  // Method to animate sliding down from above the screen to the original position
  animateSlideDown(object, duration, initialPositionY = null) {
    var _a;
    this.addObject(object);
    const originalPosition =
      (_a = this.initialStates.get(object)) === null || _a === void 0
        ? void 0
        : _a.position;
    if (!originalPosition) return;
    const startPositionY =
      initialPositionY !== null ? initialPositionY : originalPosition.y + 5;
    const finalPositionY = originalPosition.y;
    object.position.y = startPositionY;
    new TWEEN.Tween(object.position)
      .to({ y: finalPositionY }, duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
}
window.AnimationManager = AnimationManager;
// // Create the animation manager and add objects to it
// const animationManager = new AnimationManager();
// animationManager.resetObject(muteIconMesh);
// animationManager.resetObject(logoMesh);
// // Apply animations using the AnimationManager class
// animationManager.animateSlide(logoMesh, null, 1000); // Slide to original position in 1 second
// animationManager.animateScaleUp(muteIconMesh, 1.5, 1000); // Scale up by 1.5 times in 1 second
// animationManager.animateFadeIn(logoMesh, 1000); // Fade in over 1 second
// animationManager.animateRotate(
//   muteIconMesh,
//   new THREE.Euler(0, Math.PI, 0),
//   1000
// ); // Rotate 180 degrees over 1 second
// animationManager.animateBounce(logoMesh, 1, 1000);
//# sourceMappingURL=AnimationScript.js.map
