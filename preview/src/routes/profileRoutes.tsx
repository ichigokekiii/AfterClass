import type { RouteObject } from 'react-router-dom';

import { ProfileArchetypePage } from '@/pages/profile/ProfileArchetypePage';
import { ProfileAvailableDaysPage } from '@/pages/profile/ProfileAvailableDaysPage';
import { ProfileBirthdayPage } from '@/pages/profile/ProfileBirthdayPage';
import { ProfileChooserPage } from '@/pages/profile/ProfileChooserPage';
import { ProfileCoursePage } from '@/pages/profile/ProfileCoursePage';
import { ProfileFavoriteSpotsPage } from '@/pages/profile/ProfileFavoriteSpotsPage';
import { ProfileFreeTimesPage } from '@/pages/profile/ProfileFreeTimesPage';
import { ProfileGenderPage } from '@/pages/profile/ProfileGenderPage';
import { ProfileInterestedInPage } from '@/pages/profile/ProfileInterestedInPage';
import { ProfileInterestsPage } from '@/pages/profile/ProfileInterestsPage';
import { ProfileMeetupLocationsPage } from '@/pages/profile/ProfileMeetupLocationsPage';
import { ProfileNamePage } from '@/pages/profile/ProfileNamePage';
import { ProfileOpeningMovePage } from '@/pages/profile/ProfileOpeningMovePage';
import { ProfileOrganizationsPage } from '@/pages/profile/ProfileOrganizationsPage';
import { ProfilePhotoPage } from '@/pages/profile/ProfilePhotoPage';
import { ProfilePromptsPage } from '@/pages/profile/ProfilePromptsPage';
import { ProfileResidenceMapPage } from '@/pages/profile/ProfileResidenceMapPage';
import { ProfileResidencePage } from '@/pages/profile/ProfileResidencePage';
import { ProfileSchoolIdPage } from '@/pages/profile/ProfileSchoolIdPage';
import { ProfileSchoolEditPage } from '@/pages/profile/ProfileSchoolEditPage';
import { ProfileSchoolPage } from '@/pages/profile/ProfileSchoolPage';
import { ProfileSocialMediaPage } from '@/pages/profile/ProfileSocialMediaPage';
import { ReviewFriendPage } from '@/pages/profile/ReviewFriendPage';

export const profileRoutes: RouteObject[] = [
  { path: '/profile-chooser', element: <ProfileChooserPage /> },
  { path: '/review-friend', element: <ReviewFriendPage /> },
  { path: '/profile-name', element: <ProfileNamePage /> },
  { path: '/profile-school', element: <ProfileSchoolPage /> },
  { path: '/profile-school-edit', element: <ProfileSchoolEditPage /> },
  { path: '/profile-course', element: <ProfileCoursePage /> },
  { path: '/profile-school-id', element: <ProfileSchoolIdPage /> },
  { path: '/profile-birthday', element: <ProfileBirthdayPage /> },
  { path: '/profile-gender', element: <ProfileGenderPage /> },
  { path: '/profile-interested-in', element: <ProfileInterestedInPage /> },
  { path: '/profile-residence', element: <ProfileResidencePage /> },
  { path: '/profile-residence-map', element: <ProfileResidenceMapPage /> },
  { path: '/profile-meetup-locations', element: <ProfileMeetupLocationsPage /> },
  { path: '/profile-available-days', element: <ProfileAvailableDaysPage /> },
  { path: '/profile-free-times', element: <ProfileFreeTimesPage /> },
  { path: '/profile-interests', element: <ProfileInterestsPage /> },
  { path: '/profile-social-media', element: <ProfileSocialMediaPage /> },
  { path: '/profile-prompts', element: <ProfilePromptsPage /> },
  { path: '/profile-photo', element: <ProfilePhotoPage /> },
  { path: '/profile-organizations', element: <ProfileOrganizationsPage /> },
  { path: '/profile-archetype', element: <ProfileArchetypePage /> },
  { path: '/profile-opening-move', element: <ProfileOpeningMovePage /> },
  { path: '/profile-favorite-spots', element: <ProfileFavoriteSpotsPage /> },
];
