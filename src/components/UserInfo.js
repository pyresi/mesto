export class UserInfo {
  constructor({ nameSelector, bioSelector }) {
    this.nameSelector = nameSelector;
    this.bioSelector = bioSelector;
  }

  getUserInfo() {
    return {
      name: this.nameSelector.textContent,
      bio: this.bioSelector.textContent,
    };
  }

  setUserInfo(name, bio) {
    this.nameSelector.textContent = name;
    this.bioSelector.textContent = bio;
  }
}
