import React from 'react';
import styled from 'styled-components';

import colors from 'styles/colors';
import SettingsDropdown from './SettingsDropdown';
import PhotoImg from './images/dchassin-profile.jpeg';

const StyledProfileContainer = styled.div`
  position: relative;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 10px;
  margin: 34px 20px 0 16px;
`;

const StyledPhotoContainer = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 22px;
  border: 2px solid ${colors.black};
  padding: 1px;
  margin: 0 auto;
`;

const StyledPhoto = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${PhotoImg});
  background-size: 40px;
  border-radius: 20px;
`;

const StyledNameAndOrg = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  margin-top: 10px;
`;

const StyledName = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  margin-top: 10px;
`;

const StyledOrganization = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const Profile = () => (
  <StyledProfileContainer>
    <StyledPhotoContainer>
      <StyledPhoto />
    </StyledPhotoContainer>
    <StyledNameAndOrg>
      <StyledName>David Chassin</StyledName>
      <StyledOrganization>SLAC</StyledOrganization>
    </StyledNameAndOrg>
    <SettingsDropdown />
  </StyledProfileContainer>
);

export default Profile;
