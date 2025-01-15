/**
 * WorldSounds: A utility object for managing game sounds.
 * It handles muting, unmuting, stopping, and resuming sounds based on the game state.
 */
const WorldSounds = {
  /**
   * Manages the playback state of a given sound based on the world's mute status.
   *
   * @param {Object} world - The world object containing game state and properties.
   * @param {HTMLAudioElement} sound - The sound element to manage.
   * @returns {void}
   */
  manageSounds(sound) {
    if (!sound || typeof sound.pause !== "function" || typeof sound.play !== "function") {
      return;
    }
    sound.muted = isMuted;
    if (isMuted) {
      sound.wasPlaying = !sound.paused;

      sound.currentTime = 0;
    } else if (sound.wasPlaying) {
      sound.play();
    }
  },

  /**
   * Stops all sounds in the game by pausing and resetting their playback position.
   *
   * @param {Object} world - The world object containing game sounds and properties.
   * @returns {void}
   */
  stopAllSounds(world) {
    const sounds = world.getAllGameSounds();
    sounds.forEach((sound, index) => {
      if (sound && typeof sound.pause === "function") {
        sound.currentTime = 0;
        sound.removeEventListener("ended", sound.onended);
      }
    });
  },

  /**
   * Toggles the mute status of all game sounds and updates their playback accordingly.
   *
   * @param {Object} world - The world object containing game sounds and properties.
   * @returns {void}
   */
  toggleMute(world) {
    isMuted = !isMuted;
    const sounds = world.getAllGameSounds();
    if (!Array.isArray(sounds)) {
      return;
    }
    sounds.forEach((sound) => this.manageSounds(sound));
  },
};
