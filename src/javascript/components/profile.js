export class Profile {
  constructor({ config }) {
    this.nameElement = document.querySelector(config.nameSelector);
    this.descriptionElement = document.querySelector(config.descriptionSelector);
    this.avatarElement = document.querySelector(config.avatarSelector);
    this.authElement = document.querySelector(config.authSelector);
  }

  setupProfileData(result) {
    this.nameElement.textContent = result.name;
    this.descriptionElement.textContent = result.description;
    this.avatarElement.setAttribute('src', result.avatar);
    this.authElement.textContent = result.email;
  }

  onSubmit(values) {
    this.nameElement.textContent = values.name;
    this.descriptionElement.textContent = values.description;
  }

  updateUser(userData, newUserData) {
    userData.name = newUserData.name;
    userData.description = newUserData.description;

    //в будущем может пригодиться
    // userData.avatar = newUserData.avatar;
    
    return userData
  }
}