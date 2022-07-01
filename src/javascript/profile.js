export class Profile {
  constructor({ profile, config }) {
    this.name = profile.name;
    this.subtitle = profile.subtitle;
    this.avatar = profile.avatar;

    this.nameElement = document.querySelector(config.nameSelector);
    this.subtitleElement = document.querySelector(config.subtitleSelector);
    this.avatarElement = document.querySelector(config.avatarSelector);

    this.nameElement.textContent = this.name;
    this.subtitleElement.textContent = this.subtitle;
    this.avatarElement.setAttribute('src', this.avatar);
  }
}