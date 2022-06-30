export class Profile {
  constructor({ profile }) {
    this.name = profile.name;
    this.subtitle = profile.subtitle;
    this.avatar = profile.avatar

    let profileName = document.querySelector('.profile__name');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    let profileAvatar = document.querySelector('.profile__avatar');

    profileName.textContent = this.name;
    profileSubtitle.textContent = this.subtitle;
    profileAvatar.setAttribute('src', this.avatar);
  }
}