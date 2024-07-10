export default class UserInfo {
  constructor(profileName, profileDescription, pfpSelector) {
    this._displayedName = profileName;
    this._displayedDescription = profileDescription;
    this._pfpElement = pfpSelector;
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

  setUserPfp(userData) {
    this._pfpElement.src = userData.avatar;
  }
}
