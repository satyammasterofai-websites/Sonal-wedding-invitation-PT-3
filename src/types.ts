export interface TextElement {
  id: string;
  text: string;
  top: number;
  left: number;
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
}

export interface EventDetail {
  id: string;
  heading: string;
  detailsColor?: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  imageUrl: string;
  directionUrl?: string;
  caricatureUrl?: string;
  showCaricature?: boolean;
  caricatureSize?: number;
  caricatureBottom?: number;
  caricatureLeft?: number;
  showDescription?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  showVenue?: boolean;
}

export interface ECardSettings {
  remixOf?: string;
  openingBgColor: string;
  embeddedImageUrl: string;
  embeddedImageTop: number;
  embeddedImageLeft: number;
  embeddedImageWidth: number;
  textElements: TextElement[];
  heroImageUrl: string;
  ogImageUrl?: string;
  ganeshaIconUrl?: string;
  musicUrl: string;
  targetDate: string;
  eventDetails: EventDetail[];
  eventsBgColor: string;
  eventsSectionHeadingColor?: string;
  eventsSectionHeadingFont?: string;
  eventsImageHeadingColor?: string;
  eventsHeadingColor?: string; // keeping for backward compatibility
  sectionsBgColor?: string;
  mapHeading?: string;
  mapSubHeading?: string;
  mapAddress?: string;
  showMap?: boolean;
  
  // New section options
  invitationMessageHeading?: string;
  invitationMessageBody?: string;

  familyInviteHeading?: string;
  familyInviteSubHeading1?: string;
  familyInviteSubHeading2?: string;
  familyInviteSubHeading3?: string;
  familyNames?: string;
  familyInviteBgColor?: string;
  
  contactHeading?: string;
  contactName?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactBgColor?: string;
  
  // Legacy openingText properties for backward compatibility
  openingText?: string;
  openingTextFontSize?: number;
  openingTextTop?: number;
  openingTextLeft?: number;
  openingTextAlign?: string;
  openingTextColor?: string;
  openingTextFontFamily?: string;
  thumbnailUrl?: string;
  footerInviteHeading?: string;
  footerInviteNames?: string;
  footerInviteDate?: string;
  footerHashtag?: string;
  footerInviteFamilies?: string;
  footerInviteBgColor?: string;
  
  // New section option for holding page
  paymentPending?: boolean;
  paymentPendingText?: string;
  adminPassword?: string;
  heroTopText?: string;
  heroFontFamily?: string;
  heroBrideName?: string;
  heroBrideParents?: string;
  heroMiddleText?: string;
  heroGroomName?: string;
  heroGroomParents?: string;
  customFields?: Record<string, string>;
}

export const defaultSettings: ECardSettings = {
  heroTopText: 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of',
  heroBrideName: 'Sonal',
  heroBrideParents: 'D/o Mrs. Archana & Mr. Rajeev Makin\nGranddaughter of Late Smt. Kamlesh & Late Shri Joginder Makin',
  heroMiddleText: 'with',
  heroGroomName: 'Bharat',
  heroGroomParents: 'S/o Mrs. Renu & Tilak Raj Sharma',
  heroFontFamily: 'Great Vibes',
  ganeshaIconUrl: 'https://i.ibb.co/3mCLv4Zf/ganesh-idol-Tuby-Yj-SJ.png',
  openingBgColor: '#DCE8D3',
  openingText: 'You are invited!',
  openingTextFontSize: 9,
  openingTextTop: 20,
  openingTextLeft: 50,
  openingTextAlign: 'center',
  openingTextColor: '#831843',
  openingTextFontFamily: 'Playfair Display',
  embeddedImageUrl: 'https://i.ibb.co/qY2S0Wfm/file-0000000038a882088dd609cbd193300b.png',
  embeddedImageTop: 46,
  embeddedImageLeft: 50,
  embeddedImageWidth: 84,
  textElements: [
    {
      id: 'migrated-1',
      text: 'You are invited!',
      top: 63,
      left: 14,
      color: '#000000',
      fontFamily: 'Cinzel',
      fontSize: 2,
      textAlign: 'center',
    },
    {
      id: 'text-1785678639587',
      text: 'Tap envelop to reveal Invitation ',
      top: 69,
      left: 23,
      color: '#000000',
      fontFamily: 'Great Vibes',
      fontSize: 1.3,
      textAlign: 'center',
    }
  ],
  heroImageUrl: 'https://i.ibb.co/PzwNNBD6/file-00000000ae748211873325400fc9bd40.png',
  ogImageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
  thumbnailUrl: 'https://i.supaimg.com/ab32c815-d15d-464b-a3e2-a87e043ec5a8/fc261cdd-adb6-4472-804a-054380b9f0db.png',
  musicUrl: 'https://www.image2url.com/r2/default/audio/1785770108745-a5a46950-d478-470f-a009-e4114ad223f9.mp3',
  targetDate: '2026-11-02',
  eventDetails: [
    {
      id: 'event-1785691683471',
      heading: 'Ring Ceremony & Cocktail  ',
      description: 'Get ready for a magical evening of music, dance, performances, and unforgettable memories as both families come together.',
      date: '1 November 2026, Sunday',
      time: '7:00 PM onwards',
      venue: 'Vone Pride, Premnagar, Dehradun',
      imageUrl: 'https://www.image2url.com/r2/default/images/1790355373034-32c3fcc9-4ec2-4e77-98df-3d80d6574a3c.png',
      caricatureUrl: 'https://www.image2url.com/r2/default/images/1790355414400-6a00e86d-b615-449b-974e-36ac2573a1c7.png',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureSize: 55,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-1785691714818',
      heading: 'Wedding Ceremony',
      detailsColor: '#FF69B4',
      description: 'With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together.',
      date: '2 November 2026, Monday',
      time: '8:00 PM onwards',
      venue: 'Vone Pride, Premnagar, Dehradun',
      imageUrl: 'https://i.ibb.co/prLDW5Sk/wedding-bg.png',
      caricatureUrl: 'https://www.image2url.com/r2/default/images/1790355414400-6a00e86d-b615-449b-974e-36ac2573a1c7.png',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureSize: 55,
      caricatureBottom: 0,
      caricatureLeft: 50
    }
  ],
  eventsBgColor: '#f7ebeb',
  eventsSectionHeadingColor: '#be185d',
  eventsSectionHeadingFont: 'Montserrat',
  eventsImageHeadingColor: '#000000',
  eventsHeadingColor: '#000000',
  sectionsBgColor: '#fdf2f8',
  mapHeading: 'Where we will Celebrate?',
  mapSubHeading: 'Grand Vone Pride, Premnagar',
  mapAddress: 'Dehradun ',
  showMap: true,
  invitationMessageHeading: 'Awaiting Your Noble Presence',
  invitationMessageBody: 'Because meeting two souls requires twice the joy — and you!',
  familyInviteHeading: 'WITH LOVE',
  familyInviteSubHeading1: 'The Families',
  familyInviteSubHeading2: 'AWAITING YOUR GRACIOUS PRESENCE',
  familyInviteSubHeading3: 'The Namdev & Mehta Kapadia',
  familyNames: 'Makins, Narulas &  Kapoors',
  familyInviteBgColor: '#f7ebeb',
  contactHeading: 'CONTACT DETAILS:',
  contactName: 'RAKESH KAPADIA',
  contactPhone: '+91 9456411569',
  contactAddress: 'Address: 42 Lotus Heights, Bandra West, Mumbai 400050',
  contactBgColor: '',
  footerInviteHeading: 'WITH LOVE',
  footerInviteNames: 'Sonal & Bharat',
  footerInviteDate: '2th November 2026',
  footerHashtag: '#SONALWEDSBHARAT',
  footerInviteFamilies: 'NAMDEV & KAPADIA FAMILIES',
  footerInviteBgColor: '#f7ebeb',
  paymentPending: false,
  paymentPendingText: "'Sonal weds Bharat' wedding Invitation website didn't purchase yet",
};
