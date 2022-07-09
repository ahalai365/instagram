export class Profile {
  constructor({ profile, config }) {
    this.name = profile.name;
    this.discription = profile.discription;
    this.avatar = profile.avatar;

    this.nameElement = document.querySelector(config.nameSelector);
    this.discriptionElement = document.querySelector(config.discriptionSelector);
    this.avatarElement = document.querySelector(config.avatarSelector);

    this.nameElement.textContent = this.name;
    this.discriptionElement.textContent = this.discription;
    this.avatarElement.setAttribute('src', this.avatar);
  }

  onSubmit(result) {
    this.nameElement.textContent = result.name;
    this.discriptionElement.textContent = result.discription;
    // this.avatarElement.setAttribute('src', result.avatar);
  }
}