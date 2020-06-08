import React, { Component } from 'react';
import OrgDropdown from './org-dropdown';
import styles from './index.module.css';

export default class Profile extends Component {
  constructor() {
    super();
    this.onToggleDropdown = this.onToggleDropdown.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);
    this.state = {
      orgDropdownVisible: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onToggleDropdown(e) {
    e.stopPropagation();
    const { orgDropdownVisible } = this.state;
    if (orgDropdownVisible) {
      window.removeEventListener('click', this.onWindowClick);
    } else {
      window.addEventListener('click', this.onWindowClick);
    }
    this.setState({ orgDropdownVisible: !orgDropdownVisible });
  }

  onWindowClick() {
    this.setState({ orgDropdownVisible: false });
  }

  render() {
    const { orgDropdownVisible } = this.state;

    let orgDropdown;
    if (orgDropdownVisible) {
      orgDropdown = (
        <div className={styles.orgDropdown}>
          <OrgDropdown />
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <div className={styles.clickable}>
          <div className={styles.photoBorder}>
            <div className={styles.photo} />
          </div>
          <div className={styles.nameAndOrg}>
            <div className={styles.name}>David Chassin</div>
            <div className={styles.organization}>SLAC</div>
          </div>
          <div className={styles.manageSettings} onClick={this.onToggleDropdown}>
            Manage Settings
          </div>
        </div>
        {orgDropdown}
      </div>
    );
  }
}
