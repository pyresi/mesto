export class UserInfo {
  constructor({ nameSelector, bioSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._bioElement = document.querySelector(bioSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      bio: this._bioElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(name, bio) {
    this._nameElement.textContent = name;
    this._bioElement.textContent = bio;
  }

  setAvatar(avatarSrc) {
    // this._avatarElement.src = avatarSrc;
    this._avatarElement.style.backgroundImage = `url('${avatarSrc}')`;
  }

  setId(id) {
    this._id = id;
  }

  getId() {
    return this._id;
  }
}
