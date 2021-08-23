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
