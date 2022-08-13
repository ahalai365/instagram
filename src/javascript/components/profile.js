export class Profile {
  constructor({ config }) {
    this.nameElement = document.querySelector(config.nameSelector);
    this.descriptionElement = document.querySelector(config.descriptionSelector);
    this.avatarElement = document.querySelector(config.avatarSelector);
    this.authElement = document.querySelector(config.authSelector);

    this.onsubmitCb = () => this.onSubmit;
  }

  setupProfileData(result) {
    this.nameElement.textContent = result.name;
    this.descriptionElement.textContent = result.description;
    this.avatarElement.setAttribute('src', result.avatar);
    this.authElement.textContent = result.email;
  }
}