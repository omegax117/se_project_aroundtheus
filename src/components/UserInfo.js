export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._displayedName = profileName;
    this._displayedDescription = profileDescription;
  }

  getUserInfo() {
    return {
      name: this._displayedName.textContent,
      description: this._displayedDescription.textContent,
    };
  }

  setUserInfo(userData) {
    this._displayedName.textContent = userData.name;
    this._displayedDescription.textContent = userData.description;
  }
}
