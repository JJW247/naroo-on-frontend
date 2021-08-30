export interface IResourceContent {
  content: string;
}

export interface ICommonEntity {
  id: number;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
}

export interface IUserEntity extends ICommonEntity {
  email: string;
  nickname: string;
  password: string;
  role: string;
  introduce?: string;
}

export interface ILectureEntity extends ICommonEntity {
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  expiredAt: string;
  teacherId: number;
}

export interface IVideoEntity extends ICommonEntity {
  userId: number;
  lectureId: number;
}

export interface IUserLectureEntity extends ICommonEntity {
  userId: number;
  lectureId: number;
}

export interface ILectureStatusEntity extends ICommonEntity {
  status: string;
  userId: number;
  lectureId: number;
}

export interface IReviewEntity extends ICommonEntity {
  userId: number;
  lectureId: number;
  rating: number;
  review: string;
}

export interface IQuestionEntity extends ICommonEntity {
  lectureId: number;
  studentId: number;
  questionTitle: string;
  questionDescription: string;
  teacherId: number;
  answerTitle: string;
  answerDescription: string;
}

export interface INoticeEntity extends ICommonEntity {
  lectureId: number;
  title: string;
  description: string;
}

export interface ITagEntity extends ICommonEntity {
  name: string;
}

export interface ILectureTagEntity extends ICommonEntity {
  lectureId: number;
  tagId: number;
}

export interface ITeacherEditInAdmin {
  nickname: string | null;
  introduce: string | null;
}

export interface IStudentEditInAdmin {
  email: string | null;
  nickname: string | null;
}

export interface ILectureInList {
  id: string;
  title: string;
  thumbnail: string;
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  tags: string[];
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

export const CONST_RATING_TYPE = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const;

export type RATING_TYPE =
  typeof CONST_RATING_TYPE[keyof typeof CONST_RATING_TYPE];

export interface ITags {
  name: string | null;
}

export interface ILectureDetail {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  nickname: string;
  type: string;
  status: string | null;
  expired: string | null;
  videos: string[];
  notices: any;
  tags: string[];
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
