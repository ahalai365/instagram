export class Profile {
  constructor({ config }) {
    this.nameElement = document.querySelector(config.nameSelector);
    this.discriptionElement = document.querySelector(config.discriptionSelector);
    this.avatarElement = document.querySelector(config.avatarSelector);
    this.authElement = document.querySelector(config.authSelector);

    this.onsubmitCb = () => this.onSubmit;
  }

  setupProfileData(result) {
    this.nameElement.textContent = result.name;
    this.discriptionElement.textContent = result.discription;
    this.avatarElement.setAttribute('src', result.avatar);
    this.authElement.textContent = result.email;
  }
}