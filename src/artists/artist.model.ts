export interface Artist {
  id: string;
  artistName: string;
  work: Work[];
  biography: string;
  profilePicture?: string;
  artistCoverImage?: string;
}

export interface Work {
  // Artist work
  title: string;
  type: string;
  mediaType: string;
  size: string;
  artistWorkImage?: string;
  decription?: string;
  year?: string;
  workImage?: string;

  // Gallery extra info
  artistName?: string;
  imageOne?: string;
  imageTwo?: string;
  imageThree?: string;
}

// interface Biography {
//   paragraphOne: string;
//   paragraphTwo?: string;
//   paragraphThree?: string;
//   paragraphFour?: string;
//   paragraphFive?: string;
//   paragraphSix?: string;
// }
