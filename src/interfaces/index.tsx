export interface IResourceContent {
  content: string;
}

export interface IResources {
  type: string;
  content_id: string;
  content: string;
}

export interface ITeacherEditInAdmin {
  id: string | null;
  email: string | null;
  nickname: string | null;
  phone: string | null;
  introduce: string | null;
}

export interface IStudentEditInAdmin {
  id: string;
  email: string;
  nickname: string;
  phone: string;
}

export interface ILectureInList {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher_id: string;
  teacher_nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  tags: ITags[] | [] | null;
  average_rating: string;
  reviews:
    | {
        created_at: string;
        id: string;
        nickname: string;
        review: string;
        rating: number;
      }[]
    | [];
}

export interface ILectureInListAdmin {
  student_id: string;
  lecture_id: string;
  title: string;
  thumbnail: string;
  teacher_id: string;
  teacher_nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
}

export const CONST_RATING_TYPE = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export type RATING_TYPE =
  typeof CONST_RATING_TYPE[keyof typeof CONST_RATING_TYPE];

export interface IRecentReviews {
  created_at: string;
  student_id: string;
  student_nickname: string;
  lecture_id: string;
  lecture_title: string;
  review: string;
  rating: string;
}

export interface ITags {
  id: string;
  name: string;
}

export interface ILectureDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  teacher_id: string;
  teacher_nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  videos:
    | {
        id: string;
      }[]
    | []
    | null;
  notices: INoticesInLecture[];
  tags: ITags[] | [] | null;
  average_rating: string;
  reviews:
    | {
        created_at: string;
        id: string;
        nickname: string;
        review: string;
        rating: number;
      }[]
    | [];
  users: string;
}

export interface ILectureVideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  teacher_id: string;
  teacher_nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  videos:
    | {
        id: string;
        title: string;
        url: string;
      }[]
    | []
    | null;
  tags: ITags[] | [] | null;
  users: string;
}

export interface INoticesInLecture {
  id: string;
  created_at: string;
  creator_id: string;
  creator_nickname: string;
  title: string;
  description: string;
}
